import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">茉莉给科技工作室</h3>
            <p className="text-gray-400 mb-4">让智能驱动数字化转型</p>
            <p className="text-gray-400">© 2024 茉莉给科技. 保留所有权利</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">快速链接</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  服务条款
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  招贤纳士
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">联系方式</h3>
            <ul className="space-y-2 text-gray-400">
              <li>电话: 400-888-9999</li>
              <li>邮箱: contact@moliggytech.com</li>
              <li>地址: 浙江省杭州市西湖区</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">关注我们</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">知乎</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.2 2C6.7 2 2 6.7 2 12.2c0 5.5 4.7 10.2 10.2 10.2 5.5 0 10.2-4.7 10.2-10.2C22.4 6.7 17.7 2 12.2 2zM16 7.1c.7 0 1.3.1 1.3.1v2h-2.5c-.3 1.6-.5 3.1-.5 4.5h2.3v1.8h-4.9c.5 3.5 2.1 6.5 4.3 7.4l-1.1 1.8c-3.3-1.4-5.1-4.9-5.6-9.2H7v-1.8h1.5c0-1.2.2-2.9.6-4.5H7V7.1h4.6c.2-.8.5-1.6.8-2.5l2 .5c-.4.7-.7 1.3-.9 2h2.5z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">微信</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.7 5c1.9 0 3.5.7 4.8 2 1.2 1.3 1.9 2.9 1.9 4.8 0 .7-.1 1.3-.2 2h.8c1.8 0 3.3.6 4.5 1.8 1.2 1.2 1.8 2.7 1.8 4.5 0 1.8-.6 3.3-1.8 4.5-1.2 1.2-2.7 1.8-4.5 1.8h-12c-1.8 0-3.3-.6-4.5-1.8-1.2-1.2-1.8-2.7-1.8-4.5 0-1.5.4-2.8 1.3-4 .9-1.2 2-2 3.4-2.4-.1-.5-.2-1-.2-1.6 0-1.9.7-3.5 2-4.8 1.2-1.3 2.8-2 4.5-2h.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 