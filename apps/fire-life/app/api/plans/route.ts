import { NextRequest, NextResponse } from 'next/server';
import { planService } from '../../lib/services/plan-service';
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

    const plans = await planService.getUserPlans(user.id);
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
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const planData = await request.json();
    
    // 确保user_id是当前登录用户
    planData.user_id = user.id;
    
    const newPlan = await planService.createPlan(planData);
    
    if (!newPlan) {
      return NextResponse.json(
        { error: '创建财务计划失败' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(newPlan);
  } catch (error) {
    console.error('创建财务计划失败:', error);
    return NextResponse.json(
      { error: '创建财务计划失败' },
      { status: 500 }
    );
  }
} 