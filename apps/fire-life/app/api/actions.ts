'use server';

// 导出所有资产相关 Server Actions
export {
  getAssets,
  getAssetsByType,
  getAssetDistribution,
  createAsset,
  updateAsset,
  deleteAsset,
} from './assets/actions';

// 导出所有计划相关 Server Actions
export { getPlans, getPlan, createPlan, updatePlan, deletePlan } from './plans/actions';

// 导出所有预测相关 Server Actions
export { getForecasts, getForecast, createForecast, calculateRetirement } from './forecasts/actions';
