"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QrCodeModal({ isOpen, onClose }: QrCodeModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isMounted) return null;
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      {/* 背景虚化蒙层 */}
      <div className="absolute inset-0 bg-gray-800/40 backdrop-blur-sm"></div>
      
      {/* 模态框卡片 */}
      <div 
        className="relative bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">扫码咨询</h3>
          <div className="flex justify-center mb-4">
            <div className="relative w-56 h-56 border border-gray-200 rounded-lg p-2 bg-white">
              <div className="relative w-full h-full">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="200" height="200" fill="white" />
                  <path
                    d="M50 50H80V80H50V50ZM90 50H100V60H90V50ZM110 50H120V60H110V50ZM130 50H150V70H130V50ZM50 90H60V100H50V90ZM70 90H80V100H70V90ZM100 90H110V110H100V90ZM120 90H130V100H120V90ZM140 90H150V100H140V90ZM50 110H60V120H50V110ZM80 110H90V120H80V110ZM120 110H130V120H120V110ZM140 110H150V120H140V110ZM120 120H130V130H120V120ZM50 130H80V150H50V130ZM100 130H110V140H100V130ZM130 130H150V150H130V130Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-2">微信扫码，立即获取专业咨询</p>
          <p className="text-sm text-gray-500">或添加客服微信: moliggy-tech</p>
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
} 