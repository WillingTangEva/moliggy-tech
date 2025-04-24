import { getServerSupabase } from '../supabase';
import { Forecast, ForecastDetail, RetirementResult, Tables } from '../types';
import { calculateForecast } from '../calculations';
import { generateId } from '../utils';

/**
 * 创建或更新预测
 */
export async function createForecast(
  userId: string,
  planId: string,
  currentAssets: number
): Promise<{ forecast: Forecast; details: ForecastDetail[] }> {
  try {
    const supabase = getServerSupabase();
    
    // 获取财务计划
    const { data: plan, error: planError } = await supabase
      .from(Tables.FinancialPlans)
      .select('*')
      .eq('id', planId)
      .eq('user_id', userId)
      .single();

    if (planError || !plan) {
      throw new Error('找不到财务计划');
    }

    // 计算预测结果
    const { forecast: forecastData, details: detailsData } = calculateForecast(plan, currentAssets);

    // 创建预测记录
    const now = new Date().toISOString();
    
    // 检查是否已存在该用户和计划的预测
    const { data: existingForecast } = await supabase
      .from(Tables.Forecasts)
      .select('id')
      .eq('user_id', userId)
      .eq('plan_id', planId)
      .single();
    
    let forecastId: string;
    let forecast: Forecast;
    
    if (existingForecast) {
      // 更新现有预测
      forecastId = existingForecast.id;
      
      const { data: updatedForecast, error: updateError } = await supabase
        .from(Tables.Forecasts)
        .update({
          ...forecastData,
          updated_at: now
        })
        .eq('id', forecastId)
        .select()
        .single();
      
      if (updateError || !updatedForecast) {
        throw new Error('更新预测失败');
      }
      
      forecast = updatedForecast as Forecast;
      
      // 删除旧详情记录
      await supabase
        .from(Tables.ForecastDetails)
        .delete()
        .eq('forecast_id', forecastId);
    } else {
      // 创建新预测
      const { data: newForecast, error: createError } = await supabase
        .from(Tables.Forecasts)
        .insert({
          ...forecastData,
          user_id: userId,
          plan_id: planId,
          created_at: now
        })
        .select()
        .single();
      
      if (createError || !newForecast) {
        throw new Error('创建预测失败');
      }
      
      forecast = newForecast as Forecast;
      forecastId = forecast.id;
    }
    
    // 为每个年度预测创建详情记录
    const details: ForecastDetail[] = [];
    
    if (detailsData.length > 0) {
      const detailsToInsert = detailsData.map(detail => ({
        ...detail,
        forecast_id: forecastId
      }));
      
      const { data: insertedDetails, error: detailsError } = await supabase
        .from(Tables.ForecastDetails)
        .insert(detailsToInsert)
        .select();
      
      if (detailsError) {
        console.error('创建预测详情失败:', detailsError);
      } else if (insertedDetails) {
        details.push(...insertedDetails as ForecastDetail[]);
      }
    }

    return { forecast, details };
  } catch (error) {
    console.error('创建预测失败:', error);
    throw error;
  }
}

/**
 * 获取用户的所有预测
 */
export async function getForecastsByUser(userId: string): Promise<Forecast[]> {
  try {
    const supabase = getServerSupabase();
    
    const { data, error } = await supabase
      .from(Tables.Forecasts)
      .select('*, plan:plan_id(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    // 确保返回的数据格式与前端期望的一致
    return (data || []).map((forecast: any) => ({
      ...forecast,
      // 如果结果字段存储为JSON字符串，解析它
      readiness_score: typeof forecast.readiness_score === 'string' 
        ? parseInt(forecast.readiness_score, 10) 
        : forecast.readiness_score
    })) as Forecast[];
  } catch (error) {
    console.error('获取预测失败:', error);
    throw error;
  }
}

/**
 * 获取单个预测及其详情
 */
export async function getForecastById(
  forecastId: string,
  userId: string
): Promise<{ forecast: Forecast; details: ForecastDetail[] } | null> {
  try {
    const supabase = getServerSupabase();
    
    // 获取预测记录
    const { data: forecast, error: forecastError } = await supabase
      .from(Tables.Forecasts)
      .select('*')
      .eq('id', forecastId)
      .eq('user_id', userId)
      .single();
    
    if (forecastError || !forecast) {
      return null;
    }
    
    // 获取预测详情
    const { data: details, error: detailsError } = await supabase
      .from(Tables.ForecastDetails)
      .select('*')
      .eq('forecast_id', forecastId)
      .order('year', { ascending: true });
    
    if (detailsError) {
      console.error('获取预测详情失败:', detailsError);
      return { forecast: forecast as Forecast, details: [] };
    }
    
    return { 
      forecast: forecast as Forecast, 
      details: details as ForecastDetail[] 
    };
  } catch (error) {
    console.error('获取预测失败:', error);
    throw error;
  }
}

/**
 * 计算退休结果（不保存）
 */
export async function getRetirementResult(
  userId: string,
  planId: string,
  currentAssets: number
): Promise<RetirementResult> {
  try {
    const supabase = getServerSupabase();
    
    // 获取财务计划
    const { data: plan, error: planError } = await supabase
      .from(Tables.FinancialPlans)
      .select('*')
      .eq('id', planId)
      .eq('user_id', userId)
      .single();
    
    if (planError || !plan) {
      throw new Error('找不到财务计划');
    }
    
    // 计算预测结果
    const { forecast, details } = calculateForecast(plan, currentAssets);
    
    // 转换为RetirementResult格式
    const result: RetirementResult = {
      targetRetirementAge: plan.target_retirement_age,
      actualRetirementAge: forecast.retirement_age,
      retirementAssets: forecast.retirement_assets,
      monthlyRetirementIncome: forecast.monthly_income,
      yearlyDetails: details.map(detail => ({
        id: generateId(),
        forecast_id: '', // 临时ID，实际保存时会设置
        ...detail
      })),
      readinessScore: forecast.readiness_score
    };
    
    return result;
  } catch (error) {
    console.error('计算退休结果失败:', error);
    throw error;
  }
} 