import { NextRequest, NextResponse } from 'next/server';
import { forecastService } from '../../../lib/services/forecast-service';
import { createClient } from '../../../utils/supabase/server';

// GET /api/forecasts/:id - 获取单个预测详情
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const forecast = await forecastService.getForecastById(params.id);

    if (!forecast) {
      return NextResponse.json(
        { error: '预测不存在' },
        { status: 404 }
      );
    }

    // 获取预测详情
    const details = await forecastService.getForecastDetails(forecast.id);

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