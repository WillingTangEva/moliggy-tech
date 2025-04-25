// 用户类型
export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  avatar_url?: string;
}

// API会话状态类型
export interface ApiSessionStatus {
  status: 'authenticated' | 'unauthenticated';
  userId?: string;
  email?: string;
  lastUpdated?: number;
}

// 资产类型
export type AssetType = 'cash' | 'stock' | 'bond' | 'property' | 'insurance' | 'other';

// 货币类型
export type Currency = 'CNY' | 'USD' | 'EUR' | 'GBP' | 'JPY';

// 目标类型
export type GoalType = 'retirement' | 'education' | 'housing' | 'travel' | 'emergency' | 'debt' | 'other';

// 目标状态
export type GoalStatus = 'active' | 'completed' | 'abandoned';

// 目标实体
export interface Goal {
  id: string;
  user_id: string;
  plan_id?: string;
  name: string;
  description?: string;
  type: GoalType;
  status: GoalStatus;
  target_amount: number;
  current_amount: number;
  target_date: string;
  priority: number; // 1-10，1最低，10最高
  currency: Currency;
  created_at?: string;
  updated_at?: string;
}

// 资产实体
export interface Asset {
  id: string;
  user_id: string;
  name: string;
  type: AssetType;
  value: number;
  currency: Currency;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// 财务规划
export interface FinancialPlan {
  id?: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
  name?: string;
  description?: string;

  // 基本信息
  current_age: number;
  target_retirement_age: number;
  retirement_target_amount?: number;

  // 财务数据
  annual_income: number; // 年收入
  annual_expenses: number; // 年支出
  retirement_income: number; // 退休后年收入
  retirement_expenses: number; // 退休后年支出

  // 投资相关
  expected_return_rate: number; // 预期投资回报率
  inflation_rate: number; // 通胀率
  risk_tolerance: number; // 1-10，1最保守，10最激进
}

// 预测结果
export interface Forecast {
  id: string;
  user_id: string;
  plan_id: string;
  created_at?: string;

  // 核心预测结果
  retirement_age: number;
  retirement_year: number;
  retirement_assets: number;

  // 预测设置和结果
  initial_assets: number;
  final_assets: number;
  years_forecasted: number;

  // 兼容旧版属性
  monthly_income?: number;
  readiness_score?: number;
}

// 预测详情 - 按年份的财务状况
export interface ForecastDetail {
  id: string;
  forecast_id: string;
  year: number;
  age: number;
  income: number;
  expenses: number;
  savings: number;
  investment_return: number;
  total_assets: number;
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
  UserSettings = 'user_settings',
  Goals = 'goals',
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
