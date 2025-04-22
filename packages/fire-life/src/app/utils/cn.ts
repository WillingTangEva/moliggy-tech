import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并Tailwind CSS类的辅助函数
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 