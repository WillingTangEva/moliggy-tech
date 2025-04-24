import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return NextResponse.json({ 
      authenticated: false, 
      error: error?.message || 'No user found' 
    });
  }

  return NextResponse.json({ 
    authenticated: true, 
    user: data.user 
  });
} 