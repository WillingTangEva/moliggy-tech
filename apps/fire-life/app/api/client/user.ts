'use client';

import { supabase } from '../../utils/supabase/client';
import { ApiSessionStatus } from '../../lib/types';
import { fetchAPI } from './fetch';

/**
 * 统一获取用户信息的方法
 * @returns 返回用户信息或null
 */
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      console.log('获取用户信息失败:', error?.message);
      return null;
    }

    // 处理用户数据
    const userData = {
      id: data.user.id,
      email: data.user.email || '未设置邮箱',
      name: data.user.user_metadata?.name,
      first_name: data.user.user_metadata?.first_name,
      last_name: data.user.user_metadata?.last_name,
      avatar_url: data.user.user_metadata?.avatar_url,
      bio: data.user.user_metadata?.bio || '',
      created_at: data.user.created_at
    };

    return userData;
  } catch (error) {
    console.error('获取用户信息出错:', error);
    return null;
  }
}

/**
 * 检查用户会话状态
 * @returns 返回用户ID或null
 */
export async function checkSession() {
  const user = await getCurrentUser();
  return user ? user.id : null;
}

/**
 * 检查API会话状态
 * @returns 返回API会话状态
 */
export async function checkApiSession(): Promise<ApiSessionStatus | null> {
  try {
    return await fetchAPI<ApiSessionStatus>('/auth/session');
  } catch (error) {
    console.error('检查API会话状态出错:', error);
    return null;
  }
}

/**
 * 刷新用户会话
 * @returns 返回刷新后的会话或null
 */
export async function refreshSessionAPI() {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error || !data.session) {
      console.log('刷新会话失败:', error?.message);
      return null;
    }
    
    return data.session;
  } catch (error) {
    console.error('刷新会话时出错:', error);
    return null;
  }
}

/**
 * 用户退出登录
 * @returns 返回退出结果
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('退出登录失败:', error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error('退出登录时出错:', error);
    return false;
  }
} 