import { getServerSupabaseClient } from './base-service';
import { Forecast, ForecastDetail, Tables, FinancialPlan } from '../types';
import { planService } from './plan-service';
import { assetService } from './asset-service';
import { calculateForecast } from '../calculations';

export const forecastService = {
    /**
     * 获取预测结果
     */
    async getForecastById(forecastId: string): Promise<Forecast | null> {
        const supabase = await getServerSupabaseClient();
        const { data, error } = await supabase
            .from(Tables.Forecasts)
            .select('*')
            .eq('id', forecastId)
            .single();

        if (error) {
            console.error('Error fetching forecast:', error);
            return null;
        }

        return data as Forecast;
    },

    /**
     * 获取用户所有预测结果
     */
    async getUserForecasts(userId: string): Promise<Forecast[]> {
        const supabase = await getServerSupabaseClient();
        const { data, error } = await supabase
            .from(Tables.Forecasts)
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching forecasts:', error);
            return [];
        }

        return data as Forecast[];
    },

    /**
     * 获取特定规划的预测结果
     */
    async getForecastByPlanId(planId: string): Promise<Forecast | null> {
        const supabase = await getServerSupabaseClient();
        const { data, error } = await supabase
            .from(Tables.Forecasts)
            .select('*')
            .eq('plan_id', planId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            console.error('Error fetching forecast by plan:', error);
            return null;
        }

        return data as Forecast;
    },

    /**
     * 获取预测详情（按年份的财务状况）
     */
    async getForecastDetails(forecastId: string): Promise<ForecastDetail[]> {
        const supabase = await getServerSupabaseClient();
        const { data, error } = await supabase
            .from(Tables.ForecastDetails)
            .select('*')
            .eq('forecast_id', forecastId)
            .order('year', { ascending: true });

        if (error) {
            console.error('Error fetching forecast details:', error);
            return [];
        }

        return data as ForecastDetail[];
    },

    /**
     * 创建新预测
     */
    async createForecast(
        forecast: Omit<Forecast, 'id' | 'created_at'>,
        details: Omit<ForecastDetail, 'id' | 'forecast_id'>[]
    ): Promise<Forecast | null> {
        const supabase = await getServerSupabaseClient();
        // 1. 创建预测主记录
        const { data, error } = await supabase
            .from(Tables.Forecasts)
            .insert({
                ...forecast,
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating forecast:', error);
            return null;
        }

        const createdForecast = data as Forecast;

        // 2. 创建预测详情记录
        const forecastDetails = details.map((detail) => ({
            ...detail,
            forecast_id: createdForecast.id,
        }));

        const { error: detailsError } = await supabase
            .from(Tables.ForecastDetails)
            .insert(forecastDetails);

        if (detailsError) {
            console.error('Error creating forecast details:', detailsError);
            // 考虑回滚主记录
            await supabase
                .from(Tables.Forecasts)
                .delete()
                .eq('id', createdForecast.id);
            return null;
        }

        return createdForecast;
    },

    /**
     * 生成财务预测（基于规划和资产数据）
     */
    async generateForecast(
        userId: string,
        planId: string
    ): Promise<Forecast | null> {
        // 1. 获取规划数据
        const plan = await planService.getPlanById(planId);
        if (!plan || plan.user_id !== userId) {
            console.error('Plan not found or not owned by user');
            return null;
        }

        // 2. 获取用户资产
        const assets = await assetService.getUserAssets(userId);
        const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);

        // 3. 执行计算
        const { forecast, details } = calculateForecast(plan, totalAssets);

        // 4. 存储结果
        return this.createForecast(
            {
                ...forecast,
                user_id: userId,
                plan_id: planId,
            },
            details
        );
    },

    /**
     * 获取最新的预测结果
     */
    async getLatestForecast(userId: string): Promise<Forecast | null> {
        const supabase = await getServerSupabaseClient();
        const { data, error } = await supabase
            .from(Tables.Forecasts)
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            console.error('Error fetching latest forecast:', error);
            return null;
        }

        return data as Forecast;
    },

    /**
     * 删除预测及其详情
     */
    async deleteForecast(forecastId: string): Promise<boolean> {
        const supabase = await getServerSupabaseClient();
        // 1. 删除预测详情
        const { error: detailsError } = await supabase
            .from(Tables.ForecastDetails)
            .delete()
            .eq('forecast_id', forecastId);

        if (detailsError) {
            console.error('Error deleting forecast details:', detailsError);
            return false;
        }

        // 2. 删除预测主记录
        const { error } = await supabase
            .from(Tables.Forecasts)
            .delete()
            .eq('id', forecastId);

        if (error) {
            console.error('Error deleting forecast:', error);
            return false;
        }

        return true;
    },
};
