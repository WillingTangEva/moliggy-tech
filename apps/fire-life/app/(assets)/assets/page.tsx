'use client';

import { useState, useEffect } from 'react';
import { getAssets, createAsset, updateAsset, deleteAsset } from '@/app/api';
import { Asset, AssetType, Currency } from '@/app/api/utils/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { Button } from '@workspace/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { Textarea } from '@workspace/ui/components/textarea';

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);
  const [formData, setFormData] = useState<Partial<Asset>>({
    name: '',
    type: 'cash',
    value: 0,
    currency: 'CNY',
    notes: '',
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  // 资产类型选项
  const assetTypeOptions: { value: AssetType; label: string }[] = [
    { value: 'cash', label: '现金' },
    { value: 'stock', label: '股票' },
    { value: 'bond', label: '债券' },
    { value: 'property', label: '房产' },
    { value: 'insurance', label: '保险' },
    { value: 'other', label: '其他' },
  ];

  // 货币类型选项
  const currencyOptions: { value: Currency; label: string }[] = [
    { value: 'CNY', label: '人民币 (¥)' },
    { value: 'USD', label: '美元 ($)' },
    { value: 'EUR', label: '欧元 (€)' },
    { value: 'GBP', label: '英镑 (£)' },
    { value: 'JPY', label: '日元 (¥)' },
  ];

  // 加载资产数据
  useEffect(() => {
    async function fetchAssets() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAssets();
        setAssets(data);
      } catch (err) {
        console.error('获取资产失败:', err);
        setError('获取资产数据失败，请刷新页面重试');
      } finally {
        setLoading(false);
      }
    }

    fetchAssets();
  }, []);

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'value' ? Number(value) : value,
    });
  };

  // 处理选择器变化
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 打开编辑对话框
  const openEditDialog = (asset: Asset) => {
    setCurrentAsset(asset);
    setFormData({
      name: asset.name,
      type: asset.type,
      value: asset.value,
      currency: asset.currency,
      notes: asset.notes || '',
    });
    setIsEditDialogOpen(true);
  };

  // 打开删除对话框
  const openDeleteDialog = (asset: Asset) => {
    setCurrentAsset(asset);
    setIsDeleteDialogOpen(true);
  };

  // 重置表单
  const resetForm = () => {
    setFormData({
      name: '',
      type: 'cash',
      value: 0,
      currency: 'CNY',
      notes: '',
    });
    setCurrentAsset(null);
  };

  // 添加资产
  const handleAddAsset = async () => {
    try {
      setSubmitting(true);
      const newAsset = await createAsset(formData as Omit<Asset, 'id' | 'created_at' | 'updated_at'>);
      if (newAsset) {
        setAssets([...assets, newAsset]);
        setIsAddDialogOpen(false);
        resetForm();
      } else {
        setError('添加资产失败，请重试');
      }
    } catch (err) {
      console.error('添加资产失败:', err);
      setError('添加资产失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  // 更新资产
  const handleUpdateAsset = async () => {
    if (!currentAsset) return;

    try {
      setSubmitting(true);
      const updatedAsset = await updateAsset(
        currentAsset.id,
        formData as Partial<Omit<Asset, 'id' | 'user_id' | 'created_at'>>
      );
      
      if (updatedAsset) {
        setAssets(assets.map((asset) => (asset.id === updatedAsset.id ? updatedAsset : asset)));
        setIsEditDialogOpen(false);
        resetForm();
      } else {
        setError('更新资产失败，请重试');
      }
    } catch (err) {
      console.error('更新资产失败:', err);
      setError('更新资产失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  // 删除资产
  const handleDeleteAsset = async () => {
    if (!currentAsset) return;

    try {
      setSubmitting(true);
      const result = await deleteAsset(currentAsset.id);
      
      if (result) {
        setAssets(assets.filter((asset) => asset.id !== currentAsset.id));
        setIsDeleteDialogOpen(false);
        resetForm();
      } else {
        setError('删除资产失败，请重试');
      }
    } catch (err) {
      console.error('删除资产失败:', err);
      setError('删除资产失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  // 计算总资产
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);

  // 渲染资产类型标签
  const renderAssetType = (type: AssetType) => {
    const option = assetTypeOptions.find((opt) => opt.value === type);
    return option ? option.label : type;
  };

  // 渲染货币符号
  const renderCurrency = (currency: Currency) => {
    switch (currency) {
      case 'CNY':
        return '¥';
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'JPY':
        return '¥';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center py-8">
        <div className="text-center">
          <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin" />
          <p>加载资产数据中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {error && <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-600">{error}</div>}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">资产管理</h1>
          <p className="text-muted-foreground">管理您的所有资产，追踪资产价值变化</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              添加资产
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加新资产</DialogTitle>
              <DialogDescription>填写以下信息添加新的资产记录</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">资产名称</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  placeholder="例如：招商银行储蓄账户"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">资产类型</Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="选择资产类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currency">币种</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleSelectChange('currency', value)}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="选择币种" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value">资产价值</Label>
                <Input
                  id="value"
                  name="value"
                  type="number"
                  value={formData.value || ''}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">备注</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes || ''}
                  onChange={handleInputChange}
                  placeholder="添加资产相关备注信息（可选）"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsAddDialogOpen(false);
                }}
              >
                取消
              </Button>
              <Button onClick={handleAddAsset} disabled={submitting || !formData.name || formData.value === undefined}>
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                添加
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>资产概览</CardTitle>
            <CardDescription>您的总资产价值及资产分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8 text-center">
              <p className="text-muted-foreground mb-2 text-sm">总资产</p>
              <h2 className="text-4xl font-bold">¥{totalAssets.toLocaleString()}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {assetTypeOptions.map((type) => {
                const typeAssets = assets.filter((asset) => asset.type === type.value);
                const typeTotal = typeAssets.reduce((sum, asset) => sum + asset.value, 0);
                const percentage = totalAssets > 0 ? (typeTotal / totalAssets) * 100 : 0;

                return (
                  <Card key={type.value}>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-muted-foreground text-xs font-medium">{type.label}</p>
                        <p className="text-xl font-bold">¥{typeTotal.toLocaleString()}</p>
                        <div className="mt-2">
                          <div className="h-2 w-full rounded-full bg-gray-200">
                            <div
                              className="h-2 rounded-full bg-blue-600"
                              style={{
                                width: `${percentage}%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-muted-foreground mt-1 text-xs">{percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>资产列表</CardTitle>
            <CardDescription>管理您所有的资产记录</CardDescription>
          </CardHeader>
          <CardContent>
            {assets.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center">
                <p>您还没有添加任何资产</p>
                <p className="mt-2 text-sm">点击"添加资产"按钮开始记录您的资产</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>资产名称</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead className="text-right">价值</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-medium">
                        {asset.name}
                        {asset.notes && <p className="text-muted-foreground mt-1 text-xs">{asset.notes}</p>}
                      </TableCell>
                      <TableCell>{renderAssetType(asset.type)}</TableCell>
                      <TableCell className="text-right">
                        {renderCurrency(asset.currency)}
                        {asset.value.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(asset)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(asset)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 编辑资产对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑资产</DialogTitle>
            <DialogDescription>更新资产信息</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">资产名称</Label>
              <Input id="edit-name" name="name" value={formData.name || ''} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-type">资产类型</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                  <SelectTrigger id="edit-type">
                    <SelectValue placeholder="选择资产类型" />
                  </SelectTrigger>
                  <SelectContent>
                    {assetTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-currency">币种</Label>
                <Select value={formData.currency} onValueChange={(value) => handleSelectChange('currency', value)}>
                  <SelectTrigger id="edit-currency">
                    <SelectValue placeholder="选择币种" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-value">资产价值</Label>
              <Input
                id="edit-value"
                name="value"
                type="number"
                value={formData.value || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-notes">备注</Label>
              <Textarea
                id="edit-notes"
                name="notes"
                value={formData.notes || ''}
                onChange={handleInputChange}
                placeholder="添加资产相关备注信息（可选）"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                setIsEditDialogOpen(false);
              }}
            >
              取消
            </Button>
            <Button onClick={handleUpdateAsset} disabled={submitting || !formData.name || formData.value === undefined}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除资产确认对话框 */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>删除资产</DialogTitle>
            <DialogDescription>确定要删除这个资产吗？此操作无法撤销。</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              您即将删除资产: <span className="font-medium">{currentAsset?.name}</span>
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDeleteAsset} disabled={submitting}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
