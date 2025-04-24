'use client';

import { Forecast, ForecastDetail, RetirementResult } from '../../lib/types';
import { fetchAPI } from './fetch';

/**
 * 预测相关接口
 */
export const forecastAPI = {
  // 获取用户所有预测
  getForecasts: () => fetchAPI<Forecast[]>('/forecasts'),

  // 获取单个预测详情
  getForecast: (id: string) =>
    fetchAPI<{ forecast: Forecast; details: ForecastDetail[] }>(
      `/forecasts/${id}`
    ),

  // 创建新预测
  createForecast: (planId: string, currentAssets: number) =>
    fetchAPI<{ forecast: Forecast; details: ForecastDetail[] }>(
      '/forecasts',
      {
        method: 'POST',
        body: JSON.stringify({ planId, currentAssets }),
      }
    ),

  // 计算退休结果（不保存）
  calculateRetirement: (planId: string, currentAssets: number) =>
    fetchAPI<RetirementResult>('/retirement/calculate', {
      method: 'POST',
      body: JSON.stringify({ planId, currentAssets }),
    }),
}; 