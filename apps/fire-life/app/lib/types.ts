// 用户类型
export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  avatar_url?: string;
}

// 资产类型
export type AssetType = 'cash' | 'stock' | 'bond' | 'property' | 'insurance' | 'other';

// 货币类型
export type Currency = 'CNY' | 'USD' | 'EUR' | 'GBP' | 'JPY';

// 资产实体
export interface Asset {
  id: string;
  user_id: string;
  name: string;
  type: 'cash' | 'stock' | 'bond' | 'real_estate' | 'crypto' | 'other';
  value: number;
  currency: Currency;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// 财务规划
export interface FinancialPlan {
  id: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
  current_age: number;
  target_retirement_age: number;
  monthly_expenses: number;
  investment_return_rate: number;
  inflation_rate: number;
  risk_tolerance: number; // 1-10，1最保守，10最激进
  name?: string;
  description?: string;
}

// 预测结果
export interface Forecast {
  id: string;
  user_id: string;
  plan_id: string;
  created_at: string;
  retirement_age: number;
  retirement_assets: number;
  monthly_income: number;
  readiness_score: number;
}

// 预测详情 - 按年份的财务状况
export interface ForecastDetail {
  id: string;
  forecast_id: string;
  year: number;
  age: number;
  total_assets: number;
  annual_income: number;
  annual_expenses: number;
  savings_rate: number;
}

// 用户设置
export interface UserSettings {
  id: string;
  user_id: string;
  language: 'zh-CN' | 'zh-TW' | 'en-US';
  currency: Currency;
  dark_mode: boolean;
  notification_email: boolean;
  notification_sms: boolean;
  report_frequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly';
}

// 数据库表名
export enum Tables {
  Users = 'users',
  Assets = 'assets',
  FinancialPlans = 'financial_plans',
  Forecasts = 'forecasts',
  ForecastDetails = 'forecast_details',
  UserSettings = 'user_settings'
}

export interface RetirementResult {
  targetRetirementAge: number;
  actualRetirementAge: number;
  retirementAssets: number;
  monthlyRetirementIncome: number;
  yearlyDetails: ForecastDetail[];
  readinessScore: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
} 