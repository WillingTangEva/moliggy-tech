import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/ui/components/tabs';
import {
  Plus,
  Download,
  Upload,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { cn } from '@workspace/ui/lib/utils';

// 模拟资产数据
const assets = [
  {
    id: '1',
    name: '招商银行储蓄账户',
    type: 'cash',
    value: 50000,
    currency: 'CNY',
    lastUpdated: '2023-10-15',
  },
  {
    id: '2',
    name: '支付宝余额宝',
    type: 'cash',
    value: 30000,
    currency: 'CNY',
    lastUpdated: '2023-10-10',
  },
  {
    id: '3',
    name: 'A股ETF',
    type: 'stock',
    value: 120000,
    currency: 'CNY',
    lastUpdated: '2023-10-12',
  },
  {
    id: '4',
    name: '美股Index基金',
    type: 'stock',
    value: 200000,
    currency: 'CNY',
    lastUpdated: '2023-10-14',
  },
  {
    id: '5',
    name: '国债',
    type: 'bond',
    value: 100000,
    currency: 'CNY',
    lastUpdated: '2023-10-01',
  },
  {
    id: '6',
    name: '养老保险',
    type: 'insurance',
    value: 80000,
    currency: 'CNY',
    lastUpdated: '2023-09-30',
  },
  {
    id: '7',
    name: '住房公积金',
    type: 'other',
    value: 60000,
    currency: 'CNY',
    lastUpdated: '2023-09-28',
  },
];

// 资产类型映射
const assetTypeMap = {
  cash: '现金/存款',
  stock: '股票/基金',
  bond: '债券',
  property: '房产',
  insurance: '保险',
  other: '其他',
};

export default function AssetsPage() {
  // 计算资产总值
  const totalAssetValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">资产管理</h1>
          <p className="text-muted-foreground">
            管理您的财务资产，轻松掌握资产状况
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            导入
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                添加资产
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>添加新资产</DialogTitle>
                <DialogDescription>
                  请填写资产详情，带*的字段为必填项
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="asset-name" className="text-right">
                    资产名称*
                  </Label>
                  <Input
                    id="asset-name"
                    className="col-span-3"
                    placeholder="如：招商银行储蓄账户"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="asset-type" className="text-right">
                    资产类型*
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="选择资产类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">现金/存款</SelectItem>
                      <SelectItem value="stock">股票/基金</SelectItem>
                      <SelectItem value="bond">债券</SelectItem>
                      <SelectItem value="property">房产</SelectItem>
                      <SelectItem value="insurance">保险</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="asset-value" className="text-right">
                    资产价值*
                  </Label>
                  <Input
                    id="asset-value"
                    className="col-span-3"
                    type="number"
                    placeholder="0.00"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="asset-currency" className="text-right">
                    货币类型
                  </Label>
                  <Select defaultValue="CNY">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="选择货币类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CNY">人民币 (CNY)</SelectItem>
                      <SelectItem value="USD">美元 (USD)</SelectItem>
                      <SelectItem value="EUR">欧元 (EUR)</SelectItem>
                      <SelectItem value="GBP">英镑 (GBP)</SelectItem>
                      <SelectItem value="JPY">日元 (JPY)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="asset-notes" className="text-right">
                    备注
                  </Label>
                  <Input
                    id="asset-notes"
                    className="col-span-3"
                    placeholder="备注信息..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">保存</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">总资产</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ¥{totalAssetValue.toLocaleString()}
              </div>
              <p className="text-muted-foreground text-xs">
                最后更新: 2023-10-15
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">资产数量</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assets.length}</div>
              <p className="text-muted-foreground text-xs">
                跨
                {
                  Object.keys(
                    assets.reduce((acc, asset) => {
                      acc[asset.type] = true;
                      return acc;
                    }, {})
                  ).length
                }
                种资产类型
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">今日变动</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+¥1,234</div>
              <p className="text-muted-foreground text-xs">较昨日增长0.3%</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">全部资产</TabsTrigger>
              <TabsTrigger value="cash">现金/存款</TabsTrigger>
              <TabsTrigger value="stock">股票/基金</TabsTrigger>
              <TabsTrigger value="bond">债券</TabsTrigger>
              <TabsTrigger value="insurance">保险</TabsTrigger>
              <TabsTrigger value="other">其他</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
          </div>

          <TabsContent value="all" className="mt-0">
            <AssetTable assets={assets} />
          </TabsContent>

          {Object.keys(assetTypeMap).map((type) => (
            <TabsContent key={type} value={type} className="mt-0">
              <AssetTable
                assets={assets.filter((asset) => asset.type === type)}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

function AssetTable({ assets }) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>资产名称</TableHead>
              <TableHead>类型</TableHead>
              <TableHead className="text-right">价值</TableHead>
              <TableHead>货币</TableHead>
              <TableHead>最后更新</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  暂无资产数据
                </TableCell>
              </TableRow>
            ) : (
              assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>
                    {assetTypeMap[asset.type] || asset.type}
                  </TableCell>
                  <TableCell className="text-right">
                    {asset.value.toLocaleString()}
                  </TableCell>
                  <TableCell>{asset.currency}</TableCell>
                  <TableCell>{asset.lastUpdated}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">打开菜单</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
