'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card';
import { Label } from '@workspace/ui/components/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@workspace/ui/components/select';
import { ArrowLeft, ArrowRight, Loader2, Save } from 'lucide-react';
import { planAPI } from '../../api/plans';
import { assetAPI } from '../../api';

const steps = [
    { id: 1, name: '基本信息' },
    { id: 2, name: '资产概览' },
    { id: 3, name: '保险设置' },
    { id: 4, name: '支出设置' },
];

// 风险承受能力映射到数值
const riskToleranceMap: Record<string, number> = {
    conservative: 3,
    moderate: 5,
    aggressive: 8,
};

// 表单数据类型定义
interface ExpenseItem {
    name: string;
    amount: string;
    year: string;
}

interface FormDataType {
    // 基本信息
    current_age: string;
    target_retirement_age: string;
    life_expectancy: string;
    monthly_income: string;
    risk_profile: string;

    // 保险信息
    social_insurance_base: string;
    social_insurance_years: string;
    annuity_premium: string;
    annuity_payout_age: string;
    annuity_monthly_payment: string;
    commercial_pension_premium: string;
    commercial_pension_years: string;
    commercial_pension_monthly: string;

    // 支出信息
    current_monthly_expenses: string;
    retirement_monthly_expenses: string;
    major_expenses: ExpenseItem[];
}

// 表单错误类型定义
interface FormErrorsType {
    current_age?: string;
    target_retirement_age?: string;
    monthly_income?: string;
    risk_profile?: string;
    [key: string]: string | undefined;
}

function PlanForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('editId');
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [pageTitle, setPageTitle] = useState('创建退休规划');
    const [totalAssets, setTotalAssets] = useState<number>(0);
    const [assetLoading, setAssetLoading] = useState<boolean>(true);
    const [assetError, setAssetError] = useState<string | null>(null);

    // 表单状态，设置默认值
    const [formData, setFormData] = useState<FormDataType>({
        // 基本信息
        current_age: '35',
        target_retirement_age: '60',
        life_expectancy: '85',
        monthly_income: '20000',
        risk_profile: 'moderate',

        // 保险信息
        social_insurance_base: '10000',
        social_insurance_years: '10',
        annuity_premium: '20000',
        annuity_payout_age: '60',
        annuity_monthly_payment: '3000',
        commercial_pension_premium: '12000',
        commercial_pension_years: '15',
        commercial_pension_monthly: '2500',

        // 支出信息
        current_monthly_expenses: '15000',
        retirement_monthly_expenses: '12000',
        major_expenses: [
            { name: '子女教育', amount: '500000', year: '2030' },
            { name: '环球旅行', amount: '200000', year: '2035' },
        ],
    });

    // 表单验证错误
    const [errors, setErrors] = useState<FormErrorsType>({});

    // 加载用户资产数据
    useEffect(() => {
        async function fetchAssetData() {
            try {
                setAssetLoading(true);
                setAssetError(null);
                const assets = await assetAPI.getAssets();
                
                // 计算总资产价值
                const total = assets.reduce((sum, asset) => sum + asset.value, 0);
                setTotalAssets(total);
                
                console.log('加载资产数据成功，总资产:', total);
            } catch (error) {
                console.error('获取资产数据失败:', error);
                setAssetError('无法获取您的资产数据，请先在资产管理页面添加您的资产');
            } finally {
                setAssetLoading(false);
            }
        }
        
        fetchAssetData();
    }, []);

    // 加载现有计划数据进行编辑
    useEffect(() => {
        async function fetchPlanData() {
            if (!editId) return;
            
            try {
                setIsEditing(true);
                setPageTitle('编辑退休规划');
                
                const planData = await planAPI.getPlan(editId);
                
                if (planData) {
                    console.log('加载计划数据进行编辑:', planData);
                    
                    // 转换计划数据为表单数据格式
                    setFormData({
                        // 基本信息
                        current_age: String(planData.current_age || '35'),
                        target_retirement_age: String(planData.target_retirement_age || '60'),
                        life_expectancy: '85', // 默认值
                        monthly_income: String(Math.round((planData.annual_income || 0) / 12)),
                        risk_profile: planData.risk_tolerance <= 3 ? 'conservative' : 
                                     planData.risk_tolerance <= 7 ? 'moderate' : 'aggressive',
                        
                        // 保险信息 - 使用默认值
                        social_insurance_base: '10000',
                        social_insurance_years: '10',
                        annuity_premium: '20000',
                        annuity_payout_age: '60',
                        annuity_monthly_payment: '3000',
                        commercial_pension_premium: '12000',
                        commercial_pension_years: '15',
                        commercial_pension_monthly: '2500',
                        
                        // 支出信息
                        current_monthly_expenses: String(Math.round((planData.annual_expenses || 0) / 12)),
                        retirement_monthly_expenses: String(Math.round((planData.retirement_expenses || 0) / 12)),
                        major_expenses: [
                            { name: '子女教育', amount: '500000', year: '2030' },
                            { name: '环球旅行', amount: '200000', year: '2035' },
                        ],
                    });
                }
            } catch (error) {
                console.error('获取计划数据失败:', error);
                alert('获取计划数据失败，将以新建模式继续');
            }
        }
        
        fetchPlanData();
    }, [editId]);

    // 处理输入变化
    const handleChange = (field: keyof FormDataType, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // 处理大额支出变化
    const handleMajorExpenseChange = (index: number, field: keyof ExpenseItem, value: string) => {
        const updatedExpenses = [...formData.major_expenses];
        if (!updatedExpenses[index]) {
            updatedExpenses[index] = { name: '', amount: '', year: '' };
        }
        
        updatedExpenses[index] = {
            ...updatedExpenses[index],
            [field]: value
        };
        
        setFormData(prev => ({
            ...prev,
            major_expenses: updatedExpenses
        }));
    };

    // 添加更多支出项
    const addMajorExpense = () => {
        setFormData(prev => ({
            ...prev,
            major_expenses: [...prev.major_expenses, { name: '', amount: '', year: '' }]
        }));
    };

    // 验证当前步骤
    const validateCurrentStep = () => {
        const newErrors: FormErrorsType = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!formData.current_age) {
                newErrors.current_age = '请输入当前年龄';
                isValid = false;
            }
            if (!formData.target_retirement_age) {
                newErrors.target_retirement_age = '请输入目标退休年龄';
                isValid = false;
            }
            if (!formData.monthly_income) {
                newErrors.monthly_income = '请输入月收入';
                isValid = false;
            }
            if (!formData.risk_profile) {
                newErrors.risk_profile = '请选择风险承受能力';
                isValid = false;
            }
        }

        // 其他步骤的验证可以根据需要添加
        
        setErrors(newErrors);
        return isValid;
    };

    const nextStep = () => {
        if (validateCurrentStep()) {
            if (currentStep < steps.length) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // 提交表单
    const handleSubmit = async () => {
        if (validateCurrentStep()) {
            try {
                setIsSubmitting(true);
                
                // 计算年收入和支出
                const annualIncome = parseFloat(formData.monthly_income) * 12;
                const annualExpenses = parseFloat(formData.current_monthly_expenses) * 12 || annualIncome * 0.7; // 如果未填写，假设为收入的70%
                const retirementExpenses = parseFloat(formData.retirement_monthly_expenses) * 12 || annualExpenses * 0.8; // 如果未填写，假设为当前支出的80%
                
                // 转换为FinancialPlan类型
                const planData = {
                    // 添加user_id但使用空字符串，由服务器端根据认证状态覆盖
                    user_id: '', 
                    name: isEditing ? `退休计划 (编辑于${new Date().toLocaleDateString('zh-CN')})` : `退休计划 ${new Date().toLocaleDateString('zh-CN')}`,
                    description: `目标退休年龄: ${formData.target_retirement_age}岁`,
                    
                    // 基本信息
                    current_age: parseInt(formData.current_age),
                    target_retirement_age: parseInt(formData.target_retirement_age),
                    retirement_target_amount: totalAssets * 2, // 简单设置目标为当前资产的2倍
                    
                    // 财务数据
                    annual_income: annualIncome,
                    annual_expenses: annualExpenses,
                    retirement_income: annualIncome * 0.5, // 简单假设退休收入为当前收入的50%
                    retirement_expenses: retirementExpenses,
                    
                    // 投资相关
                    expected_return_rate: formData.risk_profile === 'conservative' ? 0.05 : 
                                        formData.risk_profile === 'moderate' ? 0.08 : 0.12,
                    inflation_rate: 0.03, // 假设通胀率为3%
                    risk_tolerance: riskToleranceMap[formData.risk_profile] || 5,
                };
                
                console.log('发送计划数据:', planData);
                
                let result;
                try {
                    // 根据是否编辑调用不同的API
                    if (isEditing && editId) {
                        result = await planAPI.updatePlan(editId, planData);
                        console.log('退休计划更新成功！', result);
                    } else {
                        result = await planAPI.createPlan(planData);
                        console.log('退休计划创建成功！', result);
                    }
                    
                    // 重定向到计划详情页
                    router.push(`/plan/${result.id}`);
                } catch (apiError: any) { // 使用any类型
                    console.error('API调用失败:', apiError);
                    alert(`保存计划失败: ${apiError.message || '未知错误'}`);
                }
                
            } catch (error) {
                console.error('保存计划失败:', error);
                alert('保存计划失败，请重试');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-24 md:px-6 md:py-28">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">{pageTitle}</h1>
                    <p className="text-muted-foreground mt-1">
                        填写必要信息，获取您的退休财务分析
                    </p>
                </div>

                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`flex-1 text-center ${
                                    currentStep === step.id
                                        ? 'text-primary'
                                        : currentStep > step.id
                                          ? 'text-muted-foreground'
                                          : 'text-muted-foreground/50'
                                }`}
                            >
                                <div className="relative">
                                    <div
                                        className={`absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 transform ${
                                            currentStep > step.id
                                                ? 'bg-primary'
                                                : 'bg-muted'
                                        }`}
                                        style={{
                                            left: step.id === 1 ? '50%' : '0',
                                            right:
                                                step.id === steps.length
                                                    ? '50%'
                                                    : '0',
                                        }}
                                    />
                                    <div
                                        className={`relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full ${
                                            currentStep === step.id
                                                ? 'bg-primary text-white'
                                                : currentStep > step.id
                                                  ? 'bg-primary text-white'
                                                  : 'bg-muted text-muted-foreground'
                                        }`}
                                    >
                                        {currentStep > step.id ? '✓' : step.id}
                                    </div>
                                </div>
                                <div className="mt-2 text-sm font-medium">
                                    {step.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {currentStep === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>基本信息</CardTitle>
                            <CardDescription>
                                填写您的基本信息和目标
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="current-age">
                                        当前年龄
                                    </Label>
                                    <Input
                                        id="current-age"
                                        type="number"
                                        placeholder="35"
                                        value={formData.current_age}
                                        onChange={(e) => handleChange('current_age', e.target.value)}
                                        className={errors.current_age ? 'border-red-500' : ''}
                                    />
                                    {errors.current_age && (
                                        <p className="text-red-500 text-sm">{errors.current_age}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="retirement-age">
                                        目标退休年龄
                                    </Label>
                                    <Input
                                        id="retirement-age"
                                        type="number"
                                        placeholder="55"
                                        value={formData.target_retirement_age}
                                        onChange={(e) => handleChange('target_retirement_age', e.target.value)}
                                        className={errors.target_retirement_age ? 'border-red-500' : ''}
                                    />
                                    {errors.target_retirement_age && (
                                        <p className="text-red-500 text-sm">{errors.target_retirement_age}</p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="life-expectancy">
                                        预期寿命
                                    </Label>
                                    <Input
                                        id="life-expectancy"
                                        type="number"
                                        placeholder="85"
                                        value={formData.life_expectancy}
                                        onChange={(e) => handleChange('life_expectancy', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="income">
                                        当前月收入 (¥)
                                    </Label>
                                    <Input
                                        id="income"
                                        type="number"
                                        placeholder="25000"
                                        value={formData.monthly_income}
                                        onChange={(e) => handleChange('monthly_income', e.target.value)}
                                        className={errors.monthly_income ? 'border-red-500' : ''}
                                    />
                                    {errors.monthly_income && (
                                        <p className="text-red-500 text-sm">{errors.monthly_income}</p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="risk-profile">
                                    风险承受能力
                                </Label>
                                <Select 
                                    value={formData.risk_profile}
                                    onValueChange={(value) => handleChange('risk_profile', value)}
                                >
                                    <SelectTrigger id="risk-profile" className={errors.risk_profile ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="选择风险承受能力" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="conservative">
                                            保守型 - 低风险低回报
                                        </SelectItem>
                                        <SelectItem value="moderate">
                                            稳健型 - 中等风险中等回报
                                        </SelectItem>
                                        <SelectItem value="aggressive">
                                            进取型 - 高风险高回报
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.risk_profile && (
                                    <p className="text-red-500 text-sm">{errors.risk_profile}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button onClick={nextStep}>
                                下一步 <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                )}

                {currentStep === 2 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>资产概览</CardTitle>
                            <CardDescription>
                                查看您的当前资产情况
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {assetLoading ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
                                    <p className="text-muted-foreground">加载资产数据中...</p>
                                </div>
                            ) : assetError ? (
                                <div className="rounded-md border border-red-200 bg-red-50 p-4 space-y-3">
                                    <p className="text-red-800">{assetError}</p>
                                    <div className="flex justify-center">
                                        <Button 
                                            variant="outline" 
                                            onClick={() => router.push('/assets')}
                                        >
                                            前往资产管理
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="rounded-md bg-green-50 border border-green-200 p-6 text-center">
                                        <p className="text-sm font-medium text-green-800 mb-1">当前总资产</p>
                                        <p className="text-3xl font-bold text-green-700">¥ {totalAssets.toLocaleString()}</p>
                                        <p className="text-sm text-green-600 mt-2">
                                            这些资产数据来自您的资产管理页面
                                        </p>
                                    </div>
                                    
                                    <div className="text-center pt-2 pb-4">
                                        <Button
                                            variant="outline"
                                            onClick={() => router.push('/assets')}
                                            className="mb-6"
                                        >
                                            管理我的资产
                                        </Button>
                                        
                                        <div className="text-muted-foreground text-sm">
                                            <p>您可以在资产管理页面添加、编辑和删除您的资产。</p>
                                            <p>更新后的资产数据将自动反映在您的退休计划中。</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={prevStep}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> 上一步
                            </Button>
                            <Button onClick={nextStep}>
                                下一步 <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                )}

                {currentStep === 3 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>保险设置</CardTitle>
                            <CardDescription>添加您的保险信息</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>社会保险</Label>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="social-insurance-base">
                                            缴费基数 (¥/月)
                                        </Label>
                                        <Input
                                            id="social-insurance-base"
                                            type="number"
                                            placeholder="10000"
                                            value={formData.social_insurance_base}
                                            onChange={(e) => handleChange('social_insurance_base', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="social-insurance-years">
                                            已缴费年限
                                        </Label>
                                        <Input
                                            id="social-insurance-years"
                                            type="number"
                                            placeholder="10"
                                            value={formData.social_insurance_years}
                                            onChange={(e) => handleChange('social_insurance_years', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>年金保险</Label>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="annuity-premium">
                                            年保费 (¥)
                                        </Label>
                                        <Input
                                            id="annuity-premium"
                                            type="number"
                                            placeholder="20000"
                                            value={formData.annuity_premium}
                                            onChange={(e) => handleChange('annuity_premium', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="annuity-payout-age">
                                            领取年龄
                                        </Label>
                                        <Input
                                            id="annuity-payout-age"
                                            type="number"
                                            placeholder="60"
                                            value={formData.annuity_payout_age}
                                            onChange={(e) => handleChange('annuity_payout_age', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 space-y-2">
                                    <Label htmlFor="annuity-monthly-payment">
                                        估计月领取金额 (¥)
                                    </Label>
                                    <Input
                                        id="annuity-monthly-payment"
                                        type="number"
                                        placeholder="3000"
                                        value={formData.annuity_monthly_payment}
                                        onChange={(e) => handleChange('annuity_monthly_payment', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>商业养老保险</Label>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="commercial-pension-premium">
                                            年保费 (¥)
                                        </Label>
                                        <Input
                                            id="commercial-pension-premium"
                                            type="number"
                                            placeholder="12000"
                                            value={formData.commercial_pension_premium}
                                            onChange={(e) => handleChange('commercial_pension_premium', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="commercial-pension-years">
                                            缴费年限
                                        </Label>
                                        <Input
                                            id="commercial-pension-years"
                                            type="number"
                                            placeholder="15"
                                            value={formData.commercial_pension_years}
                                            onChange={(e) => handleChange('commercial_pension_years', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 space-y-2">
                                    <Label htmlFor="commercial-pension-monthly">
                                        估计月领取金额 (¥)
                                    </Label>
                                    <Input
                                        id="commercial-pension-monthly"
                                        type="number"
                                        placeholder="2500"
                                        value={formData.commercial_pension_monthly}
                                        onChange={(e) => handleChange('commercial_pension_monthly', e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={prevStep}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> 上一步
                            </Button>
                            <Button onClick={nextStep}>
                                下一步 <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                )}

                {currentStep === 4 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>支出设置</CardTitle>
                            <CardDescription>
                                预估您当前和退休后的支出
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-monthly-expenses">
                                    当前月度支出 (¥)
                                </Label>
                                <Input
                                    id="current-monthly-expenses"
                                    type="number"
                                    placeholder="15000"
                                    value={formData.current_monthly_expenses}
                                    onChange={(e) => handleChange('current_monthly_expenses', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="retirement-monthly-expenses">
                                    预期退休后月度支出 (¥)
                                </Label>
                                <Input
                                    id="retirement-monthly-expenses"
                                    type="number"
                                    placeholder="12000"
                                    value={formData.retirement_monthly_expenses}
                                    onChange={(e) => handleChange('retirement_monthly_expenses', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>大额支出计划</Label>
                                <div className="grid grid-cols-1 gap-4">
                                    {formData.major_expenses.map((expense, index) => (
                                        <div key={index} className="grid grid-cols-3 gap-2">
                                            <div>
                                                <Label htmlFor={`major-expense-${index+1}-name`}>
                                                    支出名称
                                                </Label>
                                                <Input
                                                    id={`major-expense-${index+1}-name`}
                                                    placeholder="子女教育"
                                                    value={expense.name}
                                                    onChange={(e) => handleMajorExpenseChange(index, 'name', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`major-expense-${index+1}-amount`}>
                                                    金额 (¥)
                                                </Label>
                                                <Input
                                                    id={`major-expense-${index+1}-amount`}
                                                    type="number"
                                                    placeholder="500000"
                                                    value={expense.amount}
                                                    onChange={(e) => handleMajorExpenseChange(index, 'amount', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`major-expense-${index+1}-year`}>
                                                    预计年份
                                                </Label>
                                                <Input
                                                    id={`major-expense-${index+1}-year`}
                                                    type="number"
                                                    placeholder="2030"
                                                    value={expense.year}
                                                    onChange={(e) => handleMajorExpenseChange(index, 'year', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={addMajorExpense}
                                    >
                                        + 添加更多支出
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> 上一步
                            </Button>
                            <Button 
                                className="bg-primary hover:bg-primary/90"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 保存中...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" /> 保存并生成报告
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default function NewPlan() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center w-full py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
            <PlanForm />
        </Suspense>
    );
}
