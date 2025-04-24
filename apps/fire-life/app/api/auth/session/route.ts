import { getServerSupabase } from '@/app/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * GET /api/auth/session
 * 返回当前用户会话信息，用于诊断会话问题
 */
export async function GET() {
    try {
        // 获取服务器端supabase客户端
        const serverSupabase = getServerSupabase();

        // 获取当前会话
        const { data, error } = await serverSupabase.auth.getSession();

        if (error) {
            console.error('获取会话出错:', error.message);
            return NextResponse.json(
                {
                    status: 'error',
                    message: error.message,
                },
                { status: 500 }
            );
        }

        // 如果没有会话，返回401状态码
        if (!data.session) {
            return NextResponse.json(
                {
                    status: 'unauthorized',
                    message: '无有效会话',
                },
                { status: 401 }
            );
        }

        // 返回会话信息（去除敏感信息）
        return NextResponse.json(
            {
                status: 'success',
                userId: data.session.user.id,
                email: data.session.user.email,
                lastUpdated: data.session.expires_at,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('会话检查出错:', error);
        return NextResponse.json(
            {
                status: 'error',
                message:
                    error instanceof Error ? error.message : '会话检查出错',
            },
            { status: 500 }
        );
    }
}
