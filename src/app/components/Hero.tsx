"use client";

import Image from "next/image";
import { useState } from "react";
import QrCodeModal from "./QrCodeModal";
import { scrollToElement } from "../utils/scrollUtils";

export default function Hero() {
  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-50 overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-15"></div>
        <div className="absolute inset-0 bg-primary-gradient opacity-5"></div>
      </div>
      <div className="container mx-auto px-4 z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-primary">让智能</span>驱动数字化转型
          </h1>
          <p className="text-xl text-gray-700 mb-10">
            专业软件咨询与定制开发服务商
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition flex items-center"
              onClick={() => setIsQrCodeModalOpen(true)}
            >
              立即咨询 <span className="ml-2">→</span>
            </button>
            <button 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-100 transition flex items-center"
              onClick={() => scrollToElement('cases')}
            >
              查看客户案例 <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>
      
      <QrCodeModal 
        isOpen={isQrCodeModalOpen} 
        onClose={() => setIsQrCodeModalOpen(false)} 
      />
    </section>
  );
} 