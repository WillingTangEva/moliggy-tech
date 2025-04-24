'use client';

import { useState } from 'react';
import { assetAPI, planAPI, forecastAPI } from '../../lib/api-client';

export default function ApiTestPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testGetAssets = async () => {
    setLoading(true);
    setError(null);
    try {
      const assets = await assetAPI.getAssets();
      setResults({ type: 'assets', data: assets });
    } catch (err) {
      if (err instanceof Error) {
        setError(`获取资产失败: ${err.message}`);
      } else {
        setError('获取资产失败: 未知错误');
      }
    } finally {
      setLoading(false);
    }
  };

  const testGetPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const plans = await planAPI.getPlans();
      setResults({ type: 'plans', data: plans });
    } catch (err) {
      if (err instanceof Error) {
        setError(`获取计划失败: ${err.message}`);
      } else {
        setError('获取计划失败: 未知错误');
      }
    } finally {
      setLoading(false);
    }
  };

  const testGetForecasts = async () => {
    setLoading(true);
    setError(null);
    try {
      const forecasts = await forecastAPI.getForecasts();
      setResults({ type: 'forecasts', data: forecasts });
    } catch (err) {
      if (err instanceof Error) {
        setError(`获取预测失败: ${err.message}`);
      } else {
        setError('获取预测失败: 未知错误');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">API 测试页面</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={testGetAssets}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          测试获取资产
        </button>
        
        <button
          onClick={testGetPlans}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          测试获取计划
        </button>
        
        <button
          onClick={testGetForecasts}
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          测试获取预测
        </button>
      </div>
      
      {loading && <p className="text-gray-500 mb-4">加载中...</p>}
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-600">
          {error}
        </div>
      )}
      
      {results && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            {results.type === 'assets' ? '资产' : 
             results.type === 'plans' ? '计划' : '预测'} 结果:
          </h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(results.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 