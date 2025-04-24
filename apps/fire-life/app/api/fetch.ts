'use client';

/**
 * API请求客户端
 * @param endpoint API端点
 * @param options 请求选项
 * @returns 响应数据
 */
export async function fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    try {
        // 确保包含凭据
        options.credentials = 'include';

        // 添加必要的headers
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
        };

        // 执行请求
        const response = await fetch(`/api/${endpoint}`, options);

        // 检查是否未授权
        if (response.status === 401) {
            console.log('请求未授权');

            // 重定向到登录页面，附带当前URL作为返回URL
            const currentUrl =
                window.location.pathname + window.location.search;
            console.log(`用户未登录，重定向到登录页面，返回URL: ${currentUrl}`);
            window.location.href = `/login?returnUrl=${encodeURIComponent(currentUrl)}`;

            throw new Error(`未授权访问 (${response.status})`);
        }

        // 检查其他错误
        if (!response.ok) {
            throw new Error(
                `API请求失败: ${response.status} ${response.statusText}`
            );
        }

        return (await response.json()) as T;
    } catch (error) {
        console.error('API请求出错:', error);
        throw error;
    }
}
