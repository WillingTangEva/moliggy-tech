import { createForecast, getForecastsByUser } from '@/app/lib/services/forecast.service';
import { supabase } from '@/app/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 获取当前登录用户
async function getAuthUser() {
  try {
    // 从请求中获取cookie
    const cookieStore = cookies();
    
    // 创建新的supabase客户端实例
    const authSupabase = supabase;
    
    // 获取会话
    const { data: { session }, error } = await authSupabase.auth.getSession();
    
    if (error || !session) {
      console.error('获取会话失败:', error);
      return null;
    }
    
    return session.user;
  } catch (err) {
    console.error('认证错误:', err);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // 获取当前用户
    const user = await getAuthUser();
    const userId = user?.id;
    
    if (!userId) {
      return NextResponse.json({ error: '未授权', code: 'auth/unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { planId, currentAssets } = body;

    if (!planId) {
      return NextResponse.json({ error: '缺少必要参数: planId' }, { status: 400 });
    }

    if (currentAssets === undefined || typeof currentAssets !== 'number') {
      return NextResponse.json({ error: '缺少必要参数: currentAssets 或格式不正确' }, { status: 400 });
    }

    const result = await createForecast(userId, planId, currentAssets);
    return NextResponse.json(result);
  } catch (error) {
    console.error('创建预测失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '创建预测失败' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // 获取当前用户
    const user = await getAuthUser();
    const userId = user?.id;
    
    if (!userId) {
      return NextResponse.json({ error: '未授权', code: 'auth/unauthorized' }, { status: 401 });
    }

    const forecasts = await getForecastsByUser(userId);
    return NextResponse.json(forecasts);
  } catch (error) {
    console.error('获取预测失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取预测失败' },
      { status: 500 }
    );
  }
} 