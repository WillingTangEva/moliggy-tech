import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed w-full bg-white bg-opacity-95 shadow-sm z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-2xl text-primary">
            MoliggyTech
          </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link
            href="#solutions"
            className="text-gray-700 hover:text-primary"
          >
            解决方案
          </Link>
          <Link href="#cases" className="text-gray-700 hover:text-primary">
            客户案例
          </Link>
          <Link href="#ceo" className="text-gray-700 hover:text-primary">
            关于我们
          </Link>
          <Link href="#contact" className="text-gray-700 hover:text-primary">
            联系我们
          </Link>
        </div>
        <div>
          <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition">
            立即咨询
          </button>
        </div>
      </nav>
    </header>
  );
} 