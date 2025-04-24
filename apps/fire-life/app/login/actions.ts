'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/app/utils/supabase/server';

export async function login(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const returnUrl = (formData.get('returnUrl') as string) || '/dashboard';

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/', 'layout');
    redirect(returnUrl);
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const returnUrl = (formData.get('returnUrl') as string) || '/dashboard';

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        return { error: error.message };
    }

    return {
        message: '注册成功！请检查您的邮箱完成验证。验证后将自动登录。',
    };
}
