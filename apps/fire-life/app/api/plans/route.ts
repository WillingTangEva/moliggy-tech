import { NextRequest, NextResponse } from 'next/server';
import { getUserPlans, createPlan } from '../../lib/services/plan-service';
import { createClient } from '../../utils/supabase/server';

// GET /api/plans - 获取用户财务计划列表
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const plans = await getUserPlans(user.id);
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