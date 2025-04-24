'use client';

/**
 * 自定义事件名称常量
 */
export const AUTH_STATE_CHANGE_EVENT = 'auth-state-change';

/**
 * 触发用户认证状态变化的事件
 * 可以在登录成功、注销或会话恢复时调用
 */
export function triggerAuthStateChange() {
  if (typeof window !== 'undefined') {
    // 创建自定义事件
    const event = new CustomEvent(AUTH_STATE_CHANGE_EVENT);
    window.dispatchEvent(event);
    
    // 同时存储一个值到localStorage，以便在不同标签页间同步
    localStorage.setItem('auth_state_updated', Date.now().toString());
  }
}

/**
 * 添加认证状态变化事件监听器
 * @param callback 事件处理函数
 * @returns 清理函数
 */
export function listenToAuthStateChange(callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  
  // 监听自定义事件
  window.addEventListener(AUTH_STATE_CHANGE_EVENT, callback);
  
  // 监听localStorage变化，以处理跨标签页的状态同步
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'auth_state_updated') {
      callback();
    }
  };
  
  window.addEventListener('storage', handleStorageChange);
  
  // 返回清理函数
  return () => {
    window.removeEventListener(AUTH_STATE_CHANGE_EVENT, callback);
    window.removeEventListener('storage', handleStorageChange);
  };
} 