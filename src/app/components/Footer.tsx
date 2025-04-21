import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="text-center"><span className="text-md font-bold mr-4">莫力给科技工作室</span><span className="text-sm text-gray-400 mr-4">让智能驱动数字化转型</span><span className="text-xs text-gray-400 mr-4">© 2024 莫力给科技. 保留所有权利</span><Link href="/privacy" className="text-xs text-gray-400 hover:text-white mr-4">隐私政策</Link><Link href="/terms" className="text-xs text-gray-400 hover:text-white">服务条款</Link></div>
      </div>
    </footer>
  );
} 