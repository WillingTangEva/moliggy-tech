'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@workspace/ui/components/badge';

interface SessionStatusProps {
    onStatusChange?: (status: boolean) => void;
    className?: string;
}

export function SessionStatus({
    onStatusChange,
    className = '',
}: SessionStatusProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('检查中...');

    useEffect(() => {
        let isMounted = true;

        async function checkAuth() {
            try {
                // 使用fetch API请求服务器端的登录检查接口
                const response = await fetch('/api/auth/check');
                const data = await response.json();

                if (!isMounted) return;

                if (data.authenticated) {
                    setIsLoggedIn(true);
                    setStatus('已登录');
                    if (onStatusChange) onStatusChange(true);
                } else {
                    setIsLoggedIn(false);
                    setStatus('未登录');
                    if (onStatusChange) onStatusChange(false);
                }
            } catch (error) {
                if (!isMounted) return;
                console.error('认证检查失败:', error);
                setStatus('会话检查失败');
                setIsLoggedIn(false);
                if (onStatusChange) onStatusChange(false);
            }
        }

        checkAuth();

        // 定时检查登录状态（每5分钟）
        const interval = setInterval(checkAuth, 5 * 60 * 1000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [onStatusChange]);

    return (
        <div className={`text-sm ${className}`}>
            <span className="mr-1">会话状态:</span>
            <span className={isLoggedIn ? 'text-green-600' : 'text-red-600'}>
                {status}
            </span>
        </div>
    );
}
