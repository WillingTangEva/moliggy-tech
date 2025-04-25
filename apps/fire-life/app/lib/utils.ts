/**
 * 工具函数
 */

/**
 * 生成唯一ID
 */
export function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
  );
}

/**
 * 格式化货币
 */
export function formatCurrency(value: number, locale = 'zh-CN', currency = 'CNY'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * 格式化百分比
 */
export function formatPercentage(value: number, decimalPlaces = 1): string {
  return `${value.toFixed(decimalPlaces)}%`;
}

/**
 * 睡眠函数 - 用于调试或模拟延迟
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 安全解析JSON
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    console.error('JSON解析失败:', error);
    return fallback;
  }
}

/**
 * 深度合并对象
 */
export function deepMerge<T extends object = object, U extends object = T>(target: T, source: U): T & U {
  const output = { ...target } as T & U;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key as keyof U])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key as keyof U] });
        } else {
          output[key as keyof (T & U)] = deepMerge(
            target[key as keyof T] as object,
            source[key as keyof U] as object
          ) as (T & U)[keyof (T & U)];
        }
      } else {
        Object.assign(output, { [key]: source[key as keyof U] });
      }
    });
  }

  return output;
}

/**
 * 判断是否为对象
 */
function isObject(item: unknown): item is object {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}
