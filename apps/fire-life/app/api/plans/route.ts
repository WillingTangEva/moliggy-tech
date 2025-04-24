import { NextRequest, NextResponse } from 'next/server';
import { getUserPlans, createPlan } from '../../lib/services/plan-service';
import { createClient } from '../../utils/supabase/server';

// GET /api/plans - 获取用户财务计划列表
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    console.log('获取用户财务计划: 开始处理');
    
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log('获取用户财务计划: 用户未登录，返回测试数据');
      // 为未登录用户提供测试数据
      return NextResponse.json([
        {
          id: "test-plan-1",
          user_id: "test-user-123",
          name: "标准退休计划",
          description: "基于标准退休方案的财务规划",
          current_age: 30,
          target_retirement_age: 55,
          annual_income: 240000,
          annual_expenses: 180000,
          retirement_income: 120000,
          retirement_expenses: 120000,
          expected_return_rate: 0.07,
          inflation_rate: 0.03,
          risk_tolerance: 6,
          created_at: new Date().toISOString()
        }
      ]);
    }

    console.log('获取用户财务计划: 用户已登录, ID:', user.id);
    const plans = await getUserPlans(user.id);
    console.log('获取用户财务计划: 成功获取计划数量:', plans.length);
    
    return NextResponse.json(plans);
  } catch (error) {
    console.error('获取财务计划列表失败:', error);
    return NextResponse.json(
      { error: '获取财务计划列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/plans - 创建新财务计划
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log('用户未认证，使用测试用户ID');
      // 如果用户未登录，为了演示使用测试用户ID
      const planData = await request.json();
      planData.user_id = 'test-user-123'; 
      
      console.log('创建计划数据:', planData);
      const newPlan = await createPlan(planData);
      
      if (!newPlan) {
        console.error('创建计划失败，服务返回null');
        return NextResponse.json(
          { error: '创建财务计划失败' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(newPlan);
    }

    const planData = await request.json();
    
    // 确保user_id是当前登录用户
    planData.user_id = user.id;
    console.log('创建计划数据:', planData);
    
    const newPlan = await createPlan(planData);
    
    if (!newPlan) {
      console.error('创建计划失败，服务返回null');
      return NextResponse.json(
        { error: '创建财务计划失败' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(newPlan);
  } catch (error) {
    console.error('创建财务计划失败，异常:', error);
    return NextResponse.json(
      { error: '创建财务计划失败: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
} 