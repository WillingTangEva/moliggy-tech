import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/app/lib/services/base-service';
import { forecastService } from '@/app/lib/services/forecast-service';

// 通用辅助函数：检查用户会话
async function checkSession() {
  const supabase = await getServerSupabaseClient();
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return { error: '未授权访问', userId: null };
  }

  return { error: null, userId: session.user.id };
}

// 获取单个预测及其详情
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, userId } = await checkSession();
    if (error) {
      return NextResponse.json({ error }, { status: 401 });
    }

    // 获取预测
    const forecast = await forecastService.getForecastById(params.id);

    if (!forecast || forecast.user_id !== userId) {
      return NextResponse.json(
        { error: '预测不存在或无权访问' },
        { status: 404 }
      );
    }

    // 获取预测详情
    const details = await forecastService.getForecastDetails(params.id);

    return NextResponse.json({
      forecast,
      details
    });
  } catch (error) {
    console.error('获取预测详情API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 删除预测
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, userId } = await checkSession();
    if (error) {
      return NextResponse.json({ error }, { status: 401 });
    }

    // 获取预测
    const forecast = await forecastService.getForecastById(params.id);

    if (!forecast || forecast.user_id !== userId) {
      return NextResponse.json(
        { error: '预测不存在或无权访问' },
        { status: 404 }
      );
    }

    // 执行删除
    const success = await forecastService.deleteForecast(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: '删除预测失败' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除预测API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 