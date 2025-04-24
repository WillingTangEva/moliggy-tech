import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../utils/supabase/server';

// GET /api/forecasts/:id - 获取单个预测详情
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const forecastId = params.id;
    
    if (!forecastId) {
      return NextResponse.json(
        { error: '预测ID不能为空' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 获取预测基本信息
    const { data: forecast, error: forecastError } = await supabase
      .from('forecasts')
      .select('*')
      .eq('id', forecastId)
      .single();

    if (forecastError || !forecast) {
      console.error('获取预测信息失败:', forecastError);
      return NextResponse.json(
        { error: '预测不存在或无法访问' },
        { status: 404 }
      );
    }

    // 验证用户是否有权限访问该预测
    if (forecast.user_id !== user.id) {
      return NextResponse.json(
        { error: '无权访问此预测' },
        { status: 403 }
      );
    }

    // 获取预测详情
    const { data: details, error: detailsError } = await supabase
      .from('forecast_details')
      .select('*')
      .eq('forecast_id', forecastId)
      .order('year', { ascending: true });

    if (detailsError) {
      console.error('获取预测详情失败:', detailsError);
      return NextResponse.json(
        { error: '获取预测详情失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      forecast,
      details
    });
  } catch (error) {
    console.error('获取预测详情失败:', error);
    return NextResponse.json(
      { error: '获取预测详情失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/forecasts/:id - 删除预测
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const forecastId = params.id;
    
    if (!forecastId) {
      return NextResponse.json(
        { error: '预测ID不能为空' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 验证预测所有权
    const { data: forecast, error: forecastError } = await supabase
      .from('forecasts')
      .select('user_id')
      .eq('id', forecastId)
      .single();

    if (forecastError || !forecast) {
      return NextResponse.json(
        { error: '预测不存在' },
        { status: 404 }
      );
    }

    if (forecast.user_id !== user.id) {
      return NextResponse.json(
        { error: '无权删除此预测' },
        { status: 403 }
      );
    }

    // 首先删除预测详情
    const { error: detailsError } = await supabase
      .from('forecast_details')
      .delete()
      .eq('forecast_id', forecastId);

    if (detailsError) {
      console.error('删除预测详情失败:', detailsError);
      return NextResponse.json(
        { error: '删除预测详情失败' },
        { status: 500 }
      );
    }

    // 然后删除预测记录
    const { error: deleteError } = await supabase
      .from('forecasts')
      .delete()
      .eq('id', forecastId);

    if (deleteError) {
      console.error('删除预测记录失败:', deleteError);
      return NextResponse.json(
        { error: '删除预测失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除预测失败:', error);
    return NextResponse.json(
      { error: '删除预测失败' },
      { status: 500 }
    );
  }
} 