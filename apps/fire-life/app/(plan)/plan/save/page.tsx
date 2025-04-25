'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Label } from '@workspace/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
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
  const planId = searchParams.get('id');
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
      if (!planId) return;

      try {
        setIsEditing(true);
        setPageTitle('编辑退休规划');

        const planData = await planAPI.getPlan(planId);

        if (planData) {
          console.log('加载计划数据进行编辑:', planData);

          // 转换计划数据为表单数据格式
          setFormData({
            // 基本信息
            current_age: String(planData.current_age || '35'),
            target_retirement_age: String(planData.target_retirement_age || '60'),
            life_expectancy: '85', // 默认值
            monthly_income: String(Math.round((planData.annual_income || 0) / 12)),
            risk_profile:
              planData.risk_tolerance <= 3 ? 'conservative' : planData.risk_tolerance <= 7 ? 'moderate' : 'aggressive',

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
              {
                name: '子女教育',
                amount: '500000',
                year: '2030',
              },
              {
                name: '环球旅行',
                amount: '200000',
                year: '2035',
              },
            ],
          });
        }
      } catch (error) {
        console.error('获取计划数据失败:', error);
        alert('获取计划数据失败，将以新建模式继续');
      }
    }

    fetchPlanData();
  }, [planId]);

  // 处理输入变化
  const handleChange = (field: keyof FormDataType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      major_expenses: updatedExpenses,
    }));
  };

  // 添加更多支出项
  const addMajorExpense = () => {
    setFormData((prev) => ({
      ...prev,
      major_expenses: [...prev.major_expenses, { name: '', amount: '', year: '' }],
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
    }

    setErrors(newErrors);
    return isValid;
  };

  // 下一步
  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  // 上一步
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log('提交表单数据');

      // 准备数据
      const annualIncome = parseFloat(formData.monthly_income) * 12;
      const annualExpenses = parseFloat(formData.current_monthly_expenses) * 12;
      const retirementExpenses = parseFloat(formData.retirement_monthly_expenses) * 12;

      // 创建计划数据对象
      const planData = {
        name: `退休计划 (${formData.target_retirement_age}岁退休)`,
        description: `${formData.current_age}岁到${formData.target_retirement_age}岁的退休规划`,
        current_age: parseInt(formData.current_age),
        target_retirement_age: parseInt(formData.target_retirement_age),
        retirement_target_amount: retirementExpenses / 0.04, // 简单计算: 25倍年支出
        annual_income: annualIncome,
        annual_expenses: annualExpenses,
        retirement_income: retirementExpenses * 0.7, // 默认退休收入是退休支出的70%
        retirement_expenses: retirementExpenses,
        expected_return_rate:
          formData.risk_profile === 'conservative' ? 0.05 : formData.risk_profile === 'moderate' ? 0.07 : 0.1,
        inflation_rate: 0.03,
        risk_tolerance: riskToleranceMap[formData.risk_profile],
        created_at: new Date().toISOString(),
      };

      let response;
      if (isEditing && planId) {
        // 更新现有计划
        response = await planAPI.updatePlan(planId, planData);
        console.log('计划更新成功:', response);
      } else {
        // 创建新计划
        response = await planAPI.createPlan(planData);
        console.log('计划创建成功:', response);
      }

      // 成功后跳转到计划详情页
      if (response && response.id) {
        router.push(`/plan/${response.id}`);
      } else {
        throw new Error('服务器返回的数据缺少ID');
      }
    } catch (error) {
      console.error('保存计划失败:', error);
      alert(`保存计划失败: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 计算是否已经到了最后一步
  const isLastStep = currentStep === steps.length;

  // 渲染步骤内容
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current_age">当前年龄</Label>
              <Input
                id="current_age"
                type="number"
                placeholder="35"
                value={formData.current_age}
                onChange={(e) => handleChange('current_age', e.target.value)}
              />
              {errors.current_age && <p className="text-sm text-red-500">{errors.current_age}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_retirement_age">目标退休年龄</Label>
              <Input
                id="target_retirement_age"
                type="number"
                placeholder="60"
                value={formData.target_retirement_age}
                onChange={(e) => handleChange('target_retirement_age', e.target.value)}
              />
              {errors.target_retirement_age && <p className="text-sm text-red-500">{errors.target_retirement_age}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="life_expectancy">预期寿命</Label>
              <Input
                id="life_expectancy"
                type="number"
                placeholder="85"
                value={formData.life_expectancy}
                onChange={(e) => handleChange('life_expectancy', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly_income">月收入 (元)</Label>
              <Input
                id="monthly_income"
                type="number"
                placeholder="20000"
                value={formData.monthly_income}
                onChange={(e) => handleChange('monthly_income', e.target.value)}
              />
              {errors.monthly_income && <p className="text-sm text-red-500">{errors.monthly_income}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="risk_profile">风险承受能力</Label>
              <Select value={formData.risk_profile} onValueChange={(value) => handleChange('risk_profile', value)}>
                <SelectTrigger id="risk_profile">
                  <SelectValue placeholder="请选择风险承受能力" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">保守型 (低风险，低收益)</SelectItem>
                  <SelectItem value="moderate">稳健型 (中等风险，中等收益)</SelectItem>
                  <SelectItem value="aggressive">进取型 (高风险，高收益)</SelectItem>
                </SelectContent>
              </Select>
              {errors.risk_profile && <p className="text-sm text-red-500">{errors.risk_profile}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">资产概览</h3>

              {assetLoading ? (
                <div className="my-8 text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                  <p className="text-muted-foreground mt-2">加载资产数据...</p>
                </div>
              ) : assetError ? (
                <div className="my-8 text-center">
                  <p className="text-red-500">{assetError}</p>
                  <Button variant="outline" className="mt-4" onClick={() => router.push('/assets')}>
                    前往管理资产
                  </Button>
                </div>
              ) : (
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <p className="text-2xl font-bold">¥ {totalAssets.toLocaleString()}</p>
                  <p className="text-muted-foreground">总资产价值</p>

                  <Button variant="outline" className="mt-4" onClick={() => router.push('/assets')}>
                    查看详细资产
                  </Button>
                </div>
              )}

              <p className="text-muted-foreground mt-4 text-sm">
                您的资产配置将根据您的风险偏好和财务目标进行调整。 更多资产信息，请前往资产管理页面。
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">社保</h3>

              <div className="space-y-2">
                <Label htmlFor="social_insurance_base">社保缴费基数 (元/月)</Label>
                <Input
                  id="social_insurance_base"
                  type="number"
                  placeholder="10000"
                  value={formData.social_insurance_base}
                  onChange={(e) => handleChange('social_insurance_base', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_insurance_years">已缴纳社保年限 (年)</Label>
                <Input
                  id="social_insurance_years"
                  type="number"
                  placeholder="10"
                  value={formData.social_insurance_years}
                  onChange={(e) => handleChange('social_insurance_years', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">企业年金</h3>

              <div className="space-y-2">
                <Label htmlFor="annuity_premium">年缴费金额 (元/年)</Label>
                <Input
                  id="annuity_premium"
                  type="number"
                  placeholder="20000"
                  value={formData.annuity_premium}
                  onChange={(e) => handleChange('annuity_premium', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annuity_payout_age">开始领取年龄</Label>
                <Input
                  id="annuity_payout_age"
                  type="number"
                  placeholder="60"
                  value={formData.annuity_payout_age}
                  onChange={(e) => handleChange('annuity_payout_age', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annuity_monthly_payment">预估月领取金额 (元/月)</Label>
                <Input
                  id="annuity_monthly_payment"
                  type="number"
                  placeholder="3000"
                  value={formData.annuity_monthly_payment}
                  onChange={(e) => handleChange('annuity_monthly_payment', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">商业养老保险</h3>

              <div className="space-y-2">
                <Label htmlFor="commercial_pension_premium">年缴费金额 (元/年)</Label>
                <Input
                  id="commercial_pension_premium"
                  type="number"
                  placeholder="12000"
                  value={formData.commercial_pension_premium}
                  onChange={(e) => handleChange('commercial_pension_premium', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="commercial_pension_years">计划缴费年限</Label>
                <Input
                  id="commercial_pension_years"
                  type="number"
                  placeholder="15"
                  value={formData.commercial_pension_years}
                  onChange={(e) => handleChange('commercial_pension_years', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="commercial_pension_monthly">估计月领取金额 (元/月)</Label>
                <Input
                  id="commercial_pension_monthly"
                  type="number"
                  placeholder="2500"
                  value={formData.commercial_pension_monthly}
                  onChange={(e) => handleChange('commercial_pension_monthly', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current_monthly_expenses">当前月支出 (元/月)</Label>
              <Input
                id="current_monthly_expenses"
                type="number"
                placeholder="15000"
                value={formData.current_monthly_expenses}
                onChange={(e) => handleChange('current_monthly_expenses', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retirement_monthly_expenses">退休后月支出 (元/月)</Label>
              <Input
                id="retirement_monthly_expenses"
                type="number"
                placeholder="12000"
                value={formData.retirement_monthly_expenses}
                onChange={(e) => handleChange('retirement_monthly_expenses', e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <Label>预期大额支出</Label>

              {formData.major_expenses.map((expense, index) => (
                <div key={index} className="grid grid-cols-3 gap-2">
                  <div>
                    <Input
                      placeholder="支出名称"
                      value={expense.name}
                      onChange={(e) => handleMajorExpenseChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="金额"
                      value={expense.amount}
                      onChange={(e) => handleMajorExpenseChange(index, 'amount', e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="年份"
                      value={expense.year}
                      onChange={(e) => handleMajorExpenseChange(index, 'year', e.target.value)}
                    />
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addMajorExpense} className="w-full">
                添加更多支出
              </Button>
            </div>
          </div>
        );

      default:
        return <div>未知步骤</div>;
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">{pageTitle}</h1>
        <p className="text-muted-foreground">{isEditing ? '更新您的退休计划信息' : '创建一个新的退休财务规划'}</p>
      </div>

      {/* 步骤指示器 */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-1 flex-col items-center space-y-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                  currentStep === step.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : currentStep > step.id
                      ? 'bg-primary/20 border-primary/40'
                      : 'bg-background border-muted-foreground/30'
                } `}
              >
                {step.id}
              </div>
              <span className={`text-sm ${currentStep === step.id ? 'font-medium' : 'text-muted-foreground'}`}>
                {step.name}
              </span>

              {index < steps.length - 1 && (
                <div
                  className="bg-muted-foreground/30 absolute left-0 right-0 h-[1px]"
                  style={{
                    width: `calc(100% - 2rem)`,
                    left: `calc(${(index * 100) / (steps.length - 1)}% + 1rem)`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 表单内容 */}
      <Card className="border-muted/40">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">{steps.find((s) => s.id === currentStep)?.name}</CardTitle>
          <CardDescription>
            {currentStep === 1 && '请填写您的基本财务信息'}
            {currentStep === 2 && '您当前的资产概况'}
            {currentStep === 3 && '您的保险和养老金情况'}
            {currentStep === 4 && '现在和未来的支出计划'}
          </CardDescription>
        </CardHeader>

        <CardContent>{renderStepContent()}</CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" /> 上一步
          </Button>

          {isLastStep ? (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 保存中...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> 保存计划
                </>
              )}
            </Button>
          ) : (
            <Button onClick={nextStep}>
              下一步 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default function SavePlan() {
  return (
    <div className="py-12">
      <Suspense
        fallback={
          <div className="py-24 text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin" />
          </div>
        }
      >
        <PlanForm />
      </Suspense>
    </div>
  );
}
