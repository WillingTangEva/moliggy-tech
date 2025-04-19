export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-blue-langlan text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">联系我们</h2>
          <div className="h-1 w-20 bg-blue-caie mx-auto mt-4"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            无论您有任何问题或需求，我们的团队随时准备为您提供帮助
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-blue-langlan-dark p-8 rounded-lg border border-blue-caie-30">
            <h3 className="text-2xl font-bold mb-6">发送消息</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">姓名 <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-blue-langlan border border-blue-caie-50 rounded focus:outline-none focus:border-blue-caie"
                    placeholder="请输入您的姓名"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">电话 <span className="text-red-400">*</span></label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-blue-langlan border border-blue-caie-50 rounded focus:outline-none focus:border-blue-caie"
                    placeholder="请输入您的联系电话"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">电子邮箱 <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-blue-langlan border border-blue-caie-50 rounded focus:outline-none focus:border-blue-caie"
                    placeholder="请输入您的电子邮箱"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">公司/组织</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-blue-langlan border border-blue-caie-50 rounded focus:outline-none focus:border-blue-caie"
                    placeholder="请输入您的公司或组织名称"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">需求类型</label>
                <select 
                  className="w-full px-4 py-3 bg-blue-langlan border border-blue-caie-50 rounded focus:outline-none focus:border-blue-caie"
                >
                  <option value="" disabled selected>请选择您的需求类型</option>
                  <option value="software">软件开发</option>
                  <option value="consulting">技术咨询</option>
                  <option value="integration">系统集成</option>
                  <option value="other">其他服务</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">需求描述 <span className="text-red-400">*</span></label>
                <textarea
                  className="w-full px-4 py-3 bg-blue-langlan border border-blue-caie-50 rounded focus:outline-none focus:border-blue-caie h-32"
                  placeholder="请详细描述您的需求或问题"
                  required
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  className="mr-2"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-gray-300">
                  我同意根据<a href="#" className="text-blue-caie hover:underline">隐私政策</a>处理我的个人信息
                </label>
              </div>
              
              <button 
                type="submit"
                className="px-8 py-3 bg-blue-caie text-white rounded-full hover:bg-blue-caie-dark transition"
              >
                提交信息
              </button>
            </form>
          </div>
          
          <div className="bg-blue-langlan-dark p-8 rounded-lg border border-blue-caie-30">
            <h3 className="text-2xl font-bold mb-6">联系方式</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-blue-caie mb-2">公司地址</h4>
                <p className="text-gray-300">上海市浦东新区</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-blue-caie mb-2">联系电话</h4>
                <p className="text-gray-300">010-12345678</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-blue-caie mb-2">电子邮箱</h4>
                <p className="text-gray-300">moliggy@163.com</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-blue-caie mb-2">工作时间</h4>
                <p className="text-gray-300">周一至周五：9:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
