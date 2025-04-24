'use client';

import { useState, useEffect } from 'react';
import { checkApiSession } from '../lib/api-client';
import { ApiSessionStatus } from '../lib/types';

interface SessionStatusProps {
  onStatusChange?: (status: ApiSessionStatus | null) => void;
  className?: string;
}

export function SessionStatus({ onStatusChange, className = '' }: SessionStatusProps) {
  const [status, setStatus] = useState<string>('检查中...');
  const [apiStatus, setApiStatus] = useState<ApiSessionStatus | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const sessionStatus = await checkApiSession();
        
        if (!isMounted) return;
        
        setApiStatus(sessionStatus);
        if (onStatusChange) onStatusChange(sessionStatus);
        
        if (sessionStatus) {
          setStatus(`已登录 (${sessionStatus.userId})`);
        } else {
          setStatus('会话无效或已过期');
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('检查会话状态出错:', error);
        setStatus('会话检查失败');
        if (onStatusChange) onStatusChange(null);
      }
    }

    checkSession();
    
    // 定时检查会话状态（每5分钟）
    const interval = setInterval(checkSession, 5 * 60 * 1000);
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [onStatusChange]);

  return (
    <div className={`text-sm ${className}`}>
      <span className="mr-1">会话状态:</span>
      <span className={apiStatus ? 'text-green-600' : 'text-red-600'}>
        {status}
      </span>
    </div>
  );
} 