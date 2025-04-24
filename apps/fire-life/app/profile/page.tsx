'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Loader2, Save, User } from 'lucide-react';
import { clientSupabase } from '../lib/services/client-service';

interface Profile {
  id: string;
  email: string;
  name: string;
  bio: string;
  avatar_url: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    id: '',
    email: '',
    name: '',
    bio: '',
    avatar_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const { data: { user }, error } = await clientSupabase.auth.getUser();

        if (error || !user) {
          console.error('获取用户信息失败:', error?.message);
          router.push('/login');
          return;
        }

        // 从用户元数据获取资料信息
        setProfile({
          id: user.id,
          email: user.email || '',
          name: user.user_metadata?.name || '',
          bio: user.user_metadata?.bio || '',
          avatar_url: user.user_metadata?.avatar_url || '',
        });
      } catch (err) {
        console.error('加载用户资料失败:', err);
        setError('加载用户资料失败，请刷新重试');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setMessage(null);

      // 更新用户元数据
      const { error } = await clientSupabase.auth.updateUser({
        data: {
          name: profile.name,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      setMessage('个人资料已更新');
    } catch (err) {
      console.error('保存资料失败:', err);
      setError('保存资料失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center py-12">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        <span>加载中...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex items-center">
        <User className="mr-2 h-6 w-6" />
        <h1 className="text-3xl font-bold">个人资料</h1>
      </div>

      <Tabs defaultValue="profile" className="max-w-3xl">
        <TabsList>
          <TabsTrigger value="profile">基本资料</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>个人信息</CardTitle>
              <CardDescription>
                更新您的个人资料信息
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}
              {message && (
                <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">
                  {message}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  邮箱地址不可修改
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="输入您的姓名"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">个人简介</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="简单介绍一下自己"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar_url">头像URL</Label>
                <Input
                  id="avatar_url"
                  name="avatar_url"
                  value={profile.avatar_url}
                  onChange={handleChange}
                  placeholder="输入头像图片URL"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {saving ? '保存中...' : '保存更改'}
                {!saving && <Save className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>安全设置</CardTitle>
              <CardDescription>
                管理您的密码和账号安全选项
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">密码管理功能将在后续版本开放</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
