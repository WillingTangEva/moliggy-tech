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
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">API 测试页面</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <button
          onClick={testGetAssets}
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          测试获取资产
        </button>

        <button
          onClick={testGetPlans}
          disabled={loading}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50"
        >
          测试获取计划
        </button>

        <button
          onClick={testGetForecasts}
          disabled={loading}
          className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:opacity-50"
        >
          测试获取预测
        </button>
      </div>

      {loading && <p className="mb-4 text-gray-500">加载中...</p>}

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {results && (
        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold">
            {results.type === 'assets'
              ? '资产'
              : results.type === 'plans'
                ? '计划'
                : '预测'}{' '}
            结果:
          </h2>
          <pre className="max-h-96 overflow-auto rounded bg-gray-100 p-4">
            {JSON.stringify(results.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
