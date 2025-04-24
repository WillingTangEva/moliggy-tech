import { FinancialPlan, Forecast, ForecastDetail } from './types';

/**
 * 计算可持续的年度提取率，基于规划的风险偏好
 */
function getSafeWithdrawalRate(riskTolerance: number): number {
    // 标准4%提取率
    const baseRate = 0.04;

    // 根据风险偏好调整提取率
    // 风险偏好1-10，1最保守，10最激进
    if (riskTolerance <= 3) {
        return baseRate - 0.01; // 保守型投资者采用3%提取率
    } else if (riskTolerance >= 8) {
        return baseRate + 0.01; // 激进型投资者采用5%提取率
    }

    return baseRate; // 中等风险偏好采用4%提取率
}

/**
 * 计算退休准备指数（0-100分）
 * @param targetRetirementAssets 退休目标资产
 * @param currentAssets 当前资产
 * @param yearsToRetirement 距离退休的年数
 * @param annualSavings 年度储蓄金额
 */
function calculateReadinessScore(
    targetRetirementAssets: number,
    currentAssets: number,
    yearsToRetirement: number,
    annualSavings: number
): number {
    // 如果已有足够资产，得分100分
    if (currentAssets >= targetRetirementAssets) {
        return 100;
    }

    // 预计退休时的资产（基于当前储蓄率）
    const projectedAssets = calculateProjectedAssets(
        currentAssets,
        annualSavings,
        yearsToRetirement
    );

    // 计算得分（0-100）
    const score = Math.round((projectedAssets / targetRetirementAssets) * 100);

    // 限制得分范围
    return Math.min(99, Math.max(0, score));
}

/**
 * 计算未来资产预测值
 */
function calculateProjectedAssets(
    currentAssets: number,
    annualSavings: number,
    years: number,
    returnRate: number = 0.07
): number {
    let totalAssets = currentAssets;

    for (let i = 0; i < years; i++) {
        // 应用投资回报
        totalAssets = totalAssets * (1 + returnRate);
        // 添加年度储蓄
        totalAssets += annualSavings;
    }

    return totalAssets;
}

/**
 * 计算退休所需资产
 */
function calculateRequiredRetirementAssets(
    annualExpenses: number,
    withdrawalRate: number
): number {
    // 应用25倍法则或其变种（基于提取率）
    return annualExpenses / withdrawalRate;
}

/**
 * 生成年度财务详情预测
 */
function generateAnnualProjections(
    currentAge: number,
    retirementAge: number,
    currentAssets: number,
    annualSavings: number,
    annualExpenses: number,
    investmentReturnRate: number,
    inflationRate: number
): ForecastDetail[] {
    const projections: Omit<ForecastDetail, 'id' | 'forecast_id'>[] = [];
    const maxAge = 100; // 预测到100岁

    let assets = currentAssets;
    let yearlyExpenses = annualExpenses;
    let yearlyIncome = annualSavings * 12; // 简化，假设年收入就是年储蓄的12倍

    for (let age = currentAge; age <= maxAge; age++) {
        const year = new Date().getFullYear() + (age - currentAge);

        // 调整年度支出（考虑通货膨胀）
        yearlyExpenses *= 1 + inflationRate;

        // 根据是否退休调整资产变化
        if (age < retirementAge) {
            // 工作期：资产增长 = 投资回报 + 年度储蓄
            assets = assets * (1 + investmentReturnRate) + annualSavings;

            projections.push({
                year,
                age,
                total_assets: Math.round(assets),
                annual_income: Math.round(yearlyIncome),
                annual_expenses: Math.round(yearlyExpenses),
                savings_rate: Math.round((annualSavings / yearlyIncome) * 100),
            });
        } else {
            // 退休期：资产变化 = 投资回报 - 年度支出
            const withdrawalAmount = yearlyExpenses;
            yearlyIncome = 0; // 退休后无工作收入

            assets = assets * (1 + investmentReturnRate) - withdrawalAmount;

            projections.push({
                year,
                age,
                total_assets: Math.round(assets),
                annual_income: 0,
                annual_expenses: Math.round(yearlyExpenses),
                savings_rate: 0,
            });

            // 如果资产耗尽，结束预测
            if (assets <= 0) {
                break;
            }
        }
    }

    return projections;
}

/**
 * 计算退休预测
 * @param plan 财务计划
 * @param initialAssets 初始资产
 * @returns 预测结果和详情
 */
export function calculateForecast(
    plan: FinancialPlan,
    initialAssets: number
): { forecast: Omit<Forecast, 'id' | 'created_at'>; details: Omit<ForecastDetail, 'id' | 'forecast_id'>[]; } {
    const maxYears = 50; // 最多预测50年
    const targetRetirementAge = plan.target_retirement_age || 60;
    const currentAge = plan.current_age;
    const yearsToRetirement = targetRetirementAge - currentAge;
    
    // 初始化预测详情
    const details: Omit<ForecastDetail, 'id' | 'forecast_id'>[] = [];
    
    let totalAssets = initialAssets;
    let retirementAssets = 0;
    let retirementYear = 0;
    let retirementAchieved = false;
    
    // 计算年度资产增长
    for (let year = 0; year < maxYears; year++) {
        const currentYear = new Date().getFullYear() + year;
        const age = currentAge + year;
        const isRetirementYear = age >= targetRetirementAge && !retirementAchieved;
        
        // 收入和支出
        let annualIncome = plan.annual_income || 0;
        let annualExpenses = plan.annual_expenses || 0;
        
        // 如果已退休，调整收入和支出
        if (age >= targetRetirementAge) {
            annualIncome = plan.retirement_income || 0;
            annualExpenses = plan.retirement_expenses || 0;
        }
        
        // 净存款
        const netSavings = annualIncome - annualExpenses;
        
        // 资产增长（考虑投资回报）
        const investmentReturn = totalAssets * (plan.expected_return_rate || 0.05);
        
        // 更新总资产
        totalAssets = totalAssets + netSavings + investmentReturn;
        
        // 如果达到退休年龄且尚未标记为退休，记录退休资产
        if (isRetirementYear) {
            retirementAssets = totalAssets;
            retirementYear = currentYear;
            retirementAchieved = true;
        }
        
        // 添加到详情
        details.push({
            year: currentYear,
            age,
            income: annualIncome,
            expenses: annualExpenses,
            savings: netSavings,
            investment_return: investmentReturn,
            total_assets: totalAssets,
        });
    }
    
    // 预测结果
    const forecast: Omit<Forecast, 'id' | 'created_at'> = {
        user_id: plan.user_id,
        plan_id: plan.id!,
        retirement_age: targetRetirementAge,
        retirement_year: retirementYear,
        retirement_assets: retirementAssets,
        initial_assets: initialAssets,
        final_assets: totalAssets,
        years_forecasted: maxYears,
    };
    
    return { forecast, details };
}
