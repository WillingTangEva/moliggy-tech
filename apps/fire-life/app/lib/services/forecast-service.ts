'use server';

import { Forecast, ForecastDetail, Tables, FinancialPlan } from '../types';
import { getPlanById } from './plan-service';
import * as assetService from './asset-service';
import { calculateForecast } from '../calculations';
import { createClient } from '../../utils/supabase/server';

/**
 * 获取预测结果
 */
export async function getForecastById(forecastId: string): Promise<Forecast | null> {
    const supabase = await createClient();
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
}

/**
 * 获取用户所有预测结果
 */
export async function getUserForecasts(userId: string): Promise<Forecast[]> {
    const supabase = await createClient();
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
}

/**
 * 获取特定规划的预测结果
 */
export async function getForecastByPlanId(planId: string): Promise<Forecast | null> {
    const supabase = await createClient();
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
}

/**
 * 获取预测详情（按年份的财务状况）
 */
export async function getForecastDetails(forecastId: string): Promise<ForecastDetail[]> {
    const supabase = await createClient();
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
}

/**
 * 创建新预测
 */
export async function createForecast(
    forecast: Omit<Forecast, 'id' | 'created_at'>,
    details: Omit<ForecastDetail, 'id' | 'forecast_id'>[]
): Promise<Forecast | null> {
    const supabase = await createClient();
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
}

/**
 * 生成财务预测（基于规划和资产数据）
 */
export async function generateForecast(
    userId: string,
    planId: string
): Promise<Forecast | null> {
    // 1. 获取规划数据
    const plan = await getPlanById(planId);
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
    return createForecast(
        {
            ...forecast,
            user_id: userId,
            plan_id: planId,
        },
        details
    );
}

/**
 * 获取最新的预测结果
 */
export async function getLatestForecast(userId: string): Promise<Forecast | null> {
    const supabase = await createClient();
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
}

/**
 * 删除预测及其详情
 */
export async function deleteForecast(forecastId: string): Promise<boolean> {
    const supabase = await createClient();
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
}

/**
 * 获取预测完整信息（包括主记录和详情）
 */
export async function getFullForecast(forecastId: string): Promise<{
    forecast: Forecast | null;
    details: ForecastDetail[];
}> {
    const forecast = await getForecastById(forecastId);
    if (!forecast) {
        return { forecast: null, details: [] };
    }

    const details = await getForecastDetails(forecastId);
    return { forecast, details };
}

/**
 * 计算退休时间和财务自由
 */
export async function calculateRetirement(
    userId: string,
    planId: string,
    currentAssets: number
): Promise<{
    targetRetirementAge: number;
    actualRetirementAge: number;
    retirementAssets: number;
    monthlyRetirementIncome: number;
    yearlyDetails: Array<{
        year: number;
        age: number;
        income: number;
        expenses: number;
        savings: number;
        investment_return: number;
        total_assets: number;
    }>;
    readinessScore: number;
}> {
    // 1. 获取规划数据
    const plan = await getPlanById(planId);
    if (!plan || plan.user_id !== userId) {
        throw new Error('计划未找到或不属于当前用户');
    }

    // 2. 执行计算
    const { forecast, details } = calculateForecast(plan, currentAssets);

    // 3. 计算退休准备度分数
    const targetAge = plan.target_retirement_age;
    const actualAge = forecast.retirement_age;

    // 分数计算：如果提前达到目标则100分，否则基于接近程度计算
    let readinessScore = 100;
    if (actualAge > targetAge) {
        // 每晚5年扣10分，最低0分
        readinessScore = Math.max(
            0,
            100 - Math.floor((actualAge - targetAge) / 5) * 10
        );
    }

    // 4. 返回结果
    return {
        targetRetirementAge: plan.target_retirement_age,
        actualRetirementAge: forecast.retirement_age,
        retirementAssets: forecast.retirement_assets,
        monthlyRetirementIncome: plan.retirement_income / 12,
        yearlyDetails: details,
        readinessScore,
    };
}
