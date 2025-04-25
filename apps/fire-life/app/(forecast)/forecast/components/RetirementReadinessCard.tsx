'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface RetirementReadinessCardProps {
  readinessScore: number;
  currentAge: number;
  targetRetirementAge: number;
  actualRetirementAge: number;
}

export default function RetirementReadinessCard({
  readinessScore,
  currentAge,
  targetRetirementAge,
  actualRetirementAge,
}: RetirementReadinessCardProps) {
  // 计算状态和建议
  const getStatusAndTips = () => {
    if (readinessScore >= 90) {
      return {
        status: '非常好',
        color: 'bg-green-100 text-green-800 border-green-300',
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        tips: [
          '你已经为退休做好了充分准备',
          '继续执行当前计划，保持良好的储蓄习惯',
          '可以考虑提前退休或更加灵活的工作安排',
        ],
      };
    } else if (readinessScore >= 70) {
      return {
        status: '良好',
        color: 'bg-blue-100 text-blue-800 border-blue-300',
        icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
        tips: ['你的退休计划进展顺利', '可以考虑适度增加投资或储蓄比例', '定期审视资产配置，确保风险适度'],
      };
    } else if (readinessScore >= 40) {
      return {
        status: '一般',
        color: 'bg-amber-100 text-amber-800 border-amber-300',
        icon: <Lightbulb className="h-5 w-5 text-amber-600" />,
        tips: [
          '退休准备有一定基础，但需要加强',
          '增加每月储蓄金额是最直接有效的方法',
          '考虑多元化投资组合，提高长期回报率',
        ],
      };
    } else {
      return {
        status: '需要改进',
        color: 'bg-red-100 text-red-800 border-red-300',
        icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
        tips: [
          '当前退休准备进度滞后，需要积极调整',
          '大幅增加储蓄率，至少达到收入的20-30%',
          '评估是否需要延迟退休时间或降低退休生活标准',
        ],
      };
    }
  };

  const { status, color, icon, tips } = getStatusAndTips();

  // 计算距离退休还有多少年
  const yearsToRetirement = actualRetirementAge - currentAge;
  const yearsDifference = actualRetirementAge - targetRetirementAge;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>退休准备状态</CardTitle>
          <Badge className={`font-medium ${color}`}>
            {icon}
            <span className="ml-1">{status}</span>
          </Badge>
        </div>
        <CardDescription>基于您当前的财务状况和退休计划评估</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex justify-between">
              <span className="text-sm font-medium">退休准备度</span>
              <span className="text-sm font-medium">{readinessScore}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full ${
                  readinessScore >= 90
                    ? 'bg-green-500'
                    : readinessScore >= 70
                      ? 'bg-blue-500'
                      : readinessScore >= 40
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                }`}
                style={{ width: `${readinessScore}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">距离退休</p>
              <p className="font-medium">{yearsToRetirement} 年</p>
            </div>
            <div>
              <p className="text-muted-foreground">相对目标</p>
              <p
                className={`font-medium ${yearsDifference > 0 ? 'text-red-600' : yearsDifference < 0 ? 'text-green-600' : ''}`}
              >
                {yearsDifference > 0
                  ? `晚 ${yearsDifference} 年`
                  : yearsDifference < 0
                    ? `提前 ${Math.abs(yearsDifference)} 年`
                    : '符合目标'}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <h4 className="mb-2 font-medium">改进建议</h4>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {tips.map((tip, index) => (
                <li key={index} className="text-muted-foreground">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
