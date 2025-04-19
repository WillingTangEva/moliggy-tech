export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">联系我们</h2>
          <div className="h-1 w-20 bg-accent mx-auto mt-4"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            无论您有任何问题或需求，我们的团队随时准备为您提供帮助
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">发送消息</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">您的姓名</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-accent"
                  placeholder="请输入您的姓名"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">电子邮箱</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-accent"
                  placeholder="请输入您的电子邮箱"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">留言内容</label>
                <textarea
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-accent h-32"
                  placeholder="请输入您的留言内容"
                ></textarea>
              </div>
              <button className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition border border-accent">
                提交信息
              </button>
            </form>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">联系方式</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center flex-shrink-0 border border-accent">
                    <svg
                      className="h-5 w-5 text-accent"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-accent">
                      公司地址
                    </h4>
                    <p className="text-gray-400">
                      浙江省杭州市西湖区科技园区23号楼
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center flex-shrink-0 border border-accent">
                    <svg
                      className="h-5 w-5 text-accent"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-accent">
                      电子邮箱
                    </h4>
                    <p className="text-gray-400">contact@moliggytech.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center flex-shrink-0 border border-accent">
                    <svg
                      className="h-5 w-5 text-accent"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-accent">
                      咨询热线
                    </h4>
                    <p className="text-gray-400">400-888-9999</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">关注我们</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center border border-accent hover:bg-primary hover:bg-opacity-30 transition"
                >
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.7 5c1.9 0 3.5.7 4.8 2 1.2 1.3 1.9 2.9 1.9 4.8 0 .7-.1 1.3-.2 2h.8c1.8 0 3.3.6 4.5 1.8 1.2 1.2 1.8 2.7 1.8 4.5 0 1.8-.6 3.3-1.8 4.5-1.2 1.2-2.7 1.8-4.5 1.8h-12c-1.8 0-3.3-.6-4.5-1.8-1.2-1.2-1.8-2.7-1.8-4.5 0-1.5.4-2.8 1.3-4 .9-1.2 2-2 3.4-2.4-.1-.5-.2-1-.2-1.6 0-1.9.7-3.5 2-4.8 1.2-1.3 2.8-2 4.5-2h.1z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center border border-accent hover:bg-primary hover:bg-opacity-30 transition"
                >
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.2 2C6.7 2 2 6.7 2 12.2c0 5.5 4.7 10.2 10.2 10.2 5.5 0 10.2-4.7 10.2-10.2C22.4 6.7 17.7 2 12.2 2zM16 7.1c.7 0 1.3.1 1.3.1v2h-2.5c-.3 1.6-.5 3.1-.5 4.5h2.3v1.8h-4.9c.5 3.5 2.1 6.5 4.3 7.4l-1.1 1.8c-3.3-1.4-5.1-4.9-5.6-9.2H7v-1.8h1.5c0-1.2.2-2.9.6-4.5H7V7.1h4.6c.2-.8.5-1.6.8-2.5l2 .5c-.4.7-.7 1.3-.9 2h2.5z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center border border-accent hover:bg-primary hover:bg-opacity-30 transition"
                >
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 