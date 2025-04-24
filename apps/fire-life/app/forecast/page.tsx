import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Slider } from "@workspace/ui/components/slider";
import { Label } from "@workspace/ui/components/label";
import { Download, Share2, RefreshCw, AlertTriangle } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@workspace/ui/components/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

export default function ForecastPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">退休预测</h1>
          <p className="text-muted-foreground">
            基于您的财务数据，预测未来财务状况和退休收入
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            更新预测
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            分享
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
        </div>
      </div>

      <div className="grid gap-8">
        {/* 预测摘要卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">预计退休年龄</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">55岁</div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <span className="text-xs text-green-600 font-medium">85%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                2034年1月（还有10年）
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">预计退休资产</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥4,500,000</div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                  <div 
                    className="bg-yellow-500 h-2.5 rounded-full" 
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <span className="text-xs text-yellow-500 font-medium">70%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                目标: ¥6,000,000（差距 ¥1,500,000）
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">每月退休收入</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥16,500</div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: "92%" }}
                  ></div>
                </div>
                <span className="text-xs text-green-600 font-medium">92%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                目标: ¥18,000（已达成 92%）
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 免责提示 */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4 flex items-start">
            <AlertTriangle className="text-amber-500 mr-4 h-6 w-6 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">预测免责说明</h4>
              <p className="text-sm text-amber-700">
                此预测基于您提供的数据和假设参数。实际结果可能因市场波动、通货膨胀、政策变化等因素而有所不同。
                请定期更新您的财务数据以获得更准确的预测。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 财富增长图表 */}
        <Card>
          <CardHeader>
            <CardTitle>财富增长预测</CardTitle>
            <CardDescription>
              展示您的资产在未来几年的预期增长趋势
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">财富增长图表将在此处显示</p>
              {/* 这里将使用Chart.js或Recharts实现实际图表 */}
            </div>
          </CardContent>
        </Card>

        {/* 情景模拟器 */}
        <Card>
          <CardHeader>
            <CardTitle>情景模拟器</CardTitle>
            <CardDescription>
              调整参数，查看不同情景下的退休预测结果
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="inflation">预期年通货膨胀率</Label>
                    <span className="text-sm font-medium">3%</span>
                  </div>
                  <Slider
                    id="inflation"
                    defaultValue={[3]}
                    max={10}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1%</span>
                    <span>5%</span>
                    <span>10%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="return">预期年投资回报率</Label>
                    <span className="text-sm font-medium">7%</span>
                  </div>
                  <Slider
                    id="return"
                    defaultValue={[7]}
                    max={15}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1%</span>
                    <span>8%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="savings">每月额外储蓄</Label>
                    <span className="text-sm font-medium">¥5,000</span>
                  </div>
                  <Slider
                    id="savings"
                    defaultValue={[5000]}
                    max={20000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>¥0</span>
                    <span>¥10,000</span>
                    <span>¥20,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="retire-age">计划退休年龄</Label>
                    <span className="text-sm font-medium">55岁</span>
                  </div>
                  <Slider
                    id="retire-age"
                    defaultValue={[55]}
                    min={40}
                    max={70}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>40岁</span>
                    <span>55岁</span>
                    <span>70岁</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button>应用参数变更</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>更新预测结果以反映参数变更</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 退休收入预测 */}
        <Card>
          <CardHeader>
            <CardTitle>退休收入预测</CardTitle>
            <CardDescription>
              退休后每月可支配收入的详细预测
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly">
              <TabsList className="mb-4">
                <TabsTrigger value="monthly">月度视图</TabsTrigger>
                <TabsTrigger value="yearly">年度视图</TabsTrigger>
                <TabsTrigger value="age">按年龄</TabsTrigger>
              </TabsList>
              
              <TabsContent value="monthly" className="space-y-4">
                <div className="flex justify-end mb-2">
                  <Select defaultValue="first-10">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first-10">退休后前10年</SelectItem>
                      <SelectItem value="middle-10">退休中期10年</SelectItem>
                      <SelectItem value="last-10">退休后期10年</SelectItem>
                      <SelectItem value="all">全部时间段</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="h-80 w-full bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">退休收入图表将在此处显示</p>
                  {/* 这里将使用Chart.js或Recharts实现实际图表 */}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">收入来源分布</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">投资收益</p>
                      <p className="font-medium">¥9,500 <span className="text-sm text-muted-foreground">(57%)</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">养老金</p>
                      <p className="font-medium">¥5,000 <span className="text-sm text-muted-foreground">(30%)</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">社保</p>
                      <p className="font-medium">¥1,500 <span className="text-sm text-muted-foreground">(9%)</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">其他收入</p>
                      <p className="font-medium">¥500 <span className="text-sm text-muted-foreground">(4%)</span></p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="yearly" className="h-80 w-full bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">年度收入图表将在此处显示</p>
              </TabsContent>
              
              <TabsContent value="age" className="h-80 w-full bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">按年龄的收入图表将在此处显示</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 退休准备度指标 */}
        <Card>
          <CardHeader>
            <CardTitle>退休准备度评估</CardTitle>
            <CardDescription>
              评估您当前的退休准备情况
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center rounded-full w-24 h-24 border-8 border-green-200 bg-green-100">
                  <span className="text-2xl font-bold text-green-700">85%</span>
                </div>
                <h3 className="font-medium mt-2">总体准备度</h3>
                <p className="text-sm text-muted-foreground">
                  您的退休规划已完成85%
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>储蓄进度</span>
                    <span className="font-medium">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    提高每月储蓄额以加快进度
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>投资多样性</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    您的投资组合多样性良好
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>风险适应性</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    您的投资风险与年龄匹配良好
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">提高准备度的建议</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                      1
                    </div>
                    <span>增加每月储蓄额至少 ¥2,000，可使准备度提高约10%</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                      2
                    </div>
                    <span>考虑延迟退休2年，可使准备度提高约15%</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                      3
                    </div>
                    <span>优化投资组合，增加回报率1%，可使准备度提高约8%</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 