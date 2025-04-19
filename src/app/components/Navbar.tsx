"use client";

import Link from "next/link";
import { useState } from "react";
import QrCodeModal from "./QrCodeModal";
import { scrollToElement } from "../utils/scrollUtils";

export default function Navbar() {
  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white bg-opacity-95 shadow-sm z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-2xl text-primary">
            MoliggyTech
          </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          <button
            className="text-gray-700 hover:text-primary"
            onClick={() => scrollToElement('solutions')}
          >
            解决方案
          </button>
          <button
            className="text-gray-700 hover:text-primary"
            onClick={() => scrollToElement('cases')}
          >
            客户案例
          </button>
          <button
            className="text-gray-700 hover:text-primary"
            onClick={() => scrollToElement('ceo')}
          >
            关于我们
          </button>
          <button
            className="text-gray-700 hover:text-primary"
            onClick={() => scrollToElement('contact')}
          >
            联系我们
          </button>
        </div>
        <div>
          <button 
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
            onClick={() => setIsQrCodeModalOpen(true)}
          >
            立即咨询
          </button>
        </div>
      </nav>
      
      <QrCodeModal 
        isOpen={isQrCodeModalOpen} 
        onClose={() => setIsQrCodeModalOpen(false)} 
      />
    </header>
  );
} 