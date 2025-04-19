import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 导航栏 */}
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
            <Link
              href="#technologies"
              className="text-gray-700 hover:text-primary"
            >
              技术专区
            </Link>
            <Link href="#cases" className="text-gray-700 hover:text-primary">
              客户案例
            </Link>
            <Link href="#team" className="text-gray-700 hover:text-primary">
              团队介绍
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

      <main>
        {/* 首屏部分 (Hero Section) */}
        <section className="relative h-screen flex items-center bg-gray-50 overflow-hidden pt-16">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
            <div className="absolute inset-0 bg-primary-gradient opacity-5"></div>
          </div>
          <div className="container mx-auto px-4 z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                  <span className="text-primary">让智能</span>驱动数字化转型
                </h1>
                <p className="text-xl text-gray-700">
                  专业软件咨询与定制开发服务商
                </p>
                <div className="flex space-x-4">
                  <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition flex items-center">
                    立即咨询 <span className="ml-2">→</span>
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-100 transition flex items-center">
                    查看案例研究 <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative aspect-video bg-white p-2 rounded-lg shadow-lg">
                  <div className="rounded overflow-hidden">
                    <Image
                      src="/hero-image.jpg"
                      alt="智能科技"
                      width={600}
                      height={400}
                      className="object-cover"
                      unoptimized={true}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16">
              <p className="text-center text-gray-600 mb-6">
                受到行业领先企业的信任
              </p>
              <div className="flex flex-wrap justify-center gap-8 grayscale opacity-70">
                <div className="w-24 h-12 relative">
                  <Image
                    src="/partners/tencent.svg"
                    alt="腾讯云"
                    className="object-contain"
                    unoptimized={true}
                    layout="fill"
                  />
                </div>
                <div className="w-24 h-12 relative">
                  <Image
                    src="/partners/aws.svg"
                    alt="AWS"
                    className="object-contain"
                    unoptimized={true}
                    layout="fill"
                  />
                </div>
                <div className="w-24 h-12 relative">
                  <Image
                    src="/partners/huawei.svg"
                    alt="华为云"
                    className="object-contain"
                    unoptimized={true}
                    layout="fill"
                  />
                </div>
                <div className="w-24 h-12 relative">
                  <Image
                    src="/partners/alibaba.svg"
                    alt="阿里云"
                    className="object-contain"
                    unoptimized={true}
                    layout="fill"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 解决方案展示部分 */}
        <section id="solutions" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">我们的解决方案</h2>
              <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                为企业提供从咨询到实施的全方位数字化转型服务
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "数字化转型咨询",
                  description:
                    "针对您的业务需求，提供详尽的数字化战略规划与实施路径",
                  icon: "/icons/consulting.svg",
                },
                {
                  title: "企业级应用开发",
                  description: "基于最新技术打造定制化企业应用，提升业务效率",
                  icon: "/icons/development.svg",
                },
                {
                  title: "AI解决方案集成",
                  description:
                    "将人工智能技术融入您的业务流程，实现智能化决策与运营",
                  icon: "/icons/ai.svg",
                },
                {
                  title: "DevOps实践指导",
                  description:
                    "建立高效的开发运维一体化流程，加速产品迭代与交付",
                  icon: "/icons/devops.svg",
                },
                {
                  title: "云端架构设计",
                  description:
                    "设计弹性可扩展的云架构，降低成本同时提高系统可靠性",
                  icon: "/icons/cloud.svg",
                },
                {
                  title: "遗留系统重构",
                  description: "为传统系统注入新活力，平稳过渡到现代化技术栈",
                  icon: "/icons/legacy.svg",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition"
                >
                  <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                    <div className="w-8 h-8 relative">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        className="object-contain"
                        unoptimized={true}
                        layout="fill"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 技术专区 */}
        <section id="technologies" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">产品技术专区</h2>
              <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                "React",
                "Vue",
                "Angular",
                "Next.js",
                "Spring Cloud",
                "Kubernetes",
                "Docker",
                "TensorFlow",
                "PyTorch",
                "AWS",
                "Azure",
                "Alibaba Cloud",
                "Microservices",
                "DevOps",
              ].map((tech, index) => (
                <span
                  key={index}
                  className="bg-white px-4 py-2 rounded-full text-sm border border-gray-200 hover:border-primary hover:text-primary cursor-pointer transition"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">智能开发平台</h3>
                <div className="bg-gray-900 text-gray-300 p-4 rounded font-mono text-sm h-48 overflow-hidden">
                  <pre>{`// 智能代码生成示例
const generateAI = async (prompt) => {
  const response = await api.models.generate({
    model: "moliggy-gpt",
    prompt: prompt,
    parameters: {
      temperature: 0.7,
      max_tokens: 150
    }
  });
  return response.data;
}`}</pre>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">敏捷开发流程</h3>
                <div className="relative h-48">
                  <Image
                    src="/agile-process.svg"
                    alt="敏捷开发流程"
                    className="object-contain"
                    unoptimized={true}
                    layout="fill"
                  />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">安全合规认证</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded p-3 flex items-center justify-center">
                    <div className="relative w-20 h-20">
                      <Image
                        src="/certifications/iso27001.svg"
                        alt="ISO27001"
                        className="object-contain"
                        unoptimized={true}
                        layout="fill"
                      />
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded p-3 flex items-center justify-center">
                    <div className="relative w-20 h-20">
                      <Image
                        src="/certifications/pci-dss.svg"
                        alt="PCI DSS"
                        className="object-contain"
                        unoptimized={true}
                        layout="fill"
                      />
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded p-3 flex items-center justify-center">
                    <div className="relative w-20 h-20">
                      <Image
                        src="/certifications/gdpr.svg"
                        alt="GDPR"
                        className="object-contain"
                        unoptimized={true}
                        layout="fill"
                      />
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded p-3 flex items-center justify-center">
                    <div className="relative w-20 h-20">
                      <Image
                        src="/certifications/cmmi.svg"
                        alt="CMMI"
                        className="object-contain"
                        unoptimized={true}
                        layout="fill"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CEO简介部分 */}
        <section id="ceo" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">董事长致辞</h2>
              <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="w-full max-w-md mx-auto aspect-square relative rounded-lg overflow-hidden border-4 border-accent shadow-xl">
                  <Image
                    src="/ceo.png"
                    alt="茉莉给科技CEO"
                    className="object-cover"
                    unoptimized={true}
                    layout="fill"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-accent rounded-full opacity-20"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-accent rounded-full opacity-20"></div>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">
                  老莫宝 <span className="text-primary">创始人 & 首席执行官</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  "各位伙伴，我是莫满。作为用爪子敲过无数键盘的科技老兵，我的白色卷毛里藏着的不仅是清华与斯坦福的智慧结晶，更是20年数字化转型的实战经验。我们用尾巴摇动代码，用鼻子嗅出创新方向，让这家公司成为技术汪星人的理想国。记住，这里没有骨头难题，只有待啃的挑战；没有不可逾越的栅栏，只有等待解锁的数字化未来。让我们以代码为肉垫，用算法作牵引绳，在科技的草坪上共同追逐属于这个时代的星辰大海！"
                </p>
                <div className="pt-4">
                  <span className="inline-block px-4 py-1 bg-primary bg-opacity-10 text-primary rounded-full border border-accent mr-3">
                    人工智能专家
                  </span>
                  <span className="inline-block px-4 py-1 bg-primary bg-opacity-10 text-primary rounded-full border border-accent mr-3">
                    数字化转型顾问
                  </span>
                  <span className="inline-block px-4 py-1 bg-primary bg-opacity-10 text-primary rounded-full border border-accent">
                    企业家
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 客户案例展示 */}
        <section id="cases" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">客户案例</h2>
              <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                我们为各行业领先企业提供专业的数字化解决方案
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-dark transition">
                全部案例
              </button>
              <button className="px-4 py-2 rounded-full border border-accent text-gray-700 hover:bg-gray-100 transition">
                金融行业
              </button>
              <button className="px-4 py-2 rounded-full border border-accent text-gray-700 hover:bg-gray-100 transition">
                医疗健康
              </button>
              <button className="px-4 py-2 rounded-full border border-accent text-gray-700 hover:bg-gray-100 transition">
                制造业
              </button>
              <button className="px-4 py-2 rounded-full border border-accent text-gray-700 hover:bg-gray-100 transition">
                零售电商
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "某国有银行智能风控系统",
                  description:
                    "为客户构建基于AI的实时风险评估系统，将风险识别准确率提升40%，处理速度提升300%",
                  industry: "金融行业",
                  image: "/cases/finance.jpg",
                },
                {
                  title: "医疗集团患者管理平台",
                  description:
                    "整合多家医院的患者数据，建立统一的管理平台，优化医疗资源调配效率，缩短患者等待时间53%",
                  industry: "医疗健康",
                  image: "/cases/healthcare.jpg",
                },
                {
                  title: "制造企业智能生产线改造",
                  description:
                    "引入IoT和边缘计算技术，实现生产线智能化改造，生产效率提升35%，能源消耗降低28%",
                  industry: "制造业",
                  image: "/cases/manufacturing.jpg",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group"
                >
                  <div className="h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="px-4 py-2 bg-white text-primary rounded-full border border-accent hover:bg-gray-100 transition">
                        查看详情
                      </button>
                    </div>
                    <div className="h-48 w-full bg-gray-200"></div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-xs mb-3">
                      {item.industry}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <a
                      href="#"
                      className="text-primary flex items-center hover:text-primary-dark transition"
                    >
                      查看案例研究 <span className="ml-2">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="px-8 py-3 border-2 border-accent rounded-full text-primary hover:bg-primary hover:text-white transition-all">
                查看更多案例
              </button>
            </div>
          </div>
        </section>

        {/* 团队展示部分 */}
        <section id="team" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">核心团队</h2>
              <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                由行业资深专家组成的精英团队，拥有丰富的项目经验
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "李婷婷",
                  position: "技术总监",
                  description: "前阿里云架构师，15年云计算和大数据经验",
                  image: "/team/tech-director.jpg",
                },
                {
                  name: "王建国",
                  position: "AI研发主管",
                  description: "人工智能领域专家，发表多篇行业顶会论文",
                  image: "/team/ai-lead.jpg",
                },
                {
                  name: "赵明",
                  position: "产品经理",
                  description: "前腾讯产品经理，专注企业级SaaS产品设计",
                  image: "/team/product-manager.jpg",
                },
                {
                  name: "张丽",
                  position: "设计总监",
                  description: "拥有10年用户体验设计经验，多项设计大奖获得者",
                  image: "/team/design-director.jpg",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition relative group"
                >
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-accent mb-6 relative">
                    <div className="w-full h-full bg-gray-200"></div>
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.description}</p>
                  <div className="absolute top-0 left-0 w-full h-full bg-primary bg-opacity-90 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white p-6">
                      <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                      <p className="mb-4">{member.description}</p>
                      <div className="flex justify-center space-x-3">
                        <a
                          href="#"
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                        >
                          <svg
                            className="h-4 w-4 text-primary"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                        >
                          <svg
                            className="h-4 w-4 text-primary"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 联系我们部分 */}
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
      </main>

      {/* 页脚 */}
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
                    <path d="M8.7 5c1.9 0 3.5.7 4.8 2 1.2 1.3 1.9 2.9 1.9 4.8 0 .7-.1 1.3-.2 2h.8c1.8 0 3.3.6 4.5 1.8 1.2 1.2 1.8 2.7 1.8 4.5 0 1.8-.6 3.3-1.8 4.5-1.2 1.2-2.7 1.8-4.5 1.8h-12c-1.8 0-3.3-.6-4.5-1.8-1.2-1.2-1.8-2.7-1.8-4.5 0-1.5.4-2.8 1.3-4 .9-1.2 2-2 3.4-2.4-.1-.5-.2-1-.2-1.6 0-1.9.7-3.5 2-4.8 1.2-1.3 2.8-2 4.5-2h.1zm10.9 14.6c.9 0 1.6-.3 2.2-.9.6-.6.9-1.3.9-2.2 0-.9-.3-1.6-.9-2.2-.6-.6-1.3-.9-2.2-.9h-5.3c-1.1 0-2-.4-2.7-1.1-.7-.7-1.1-1.6-1.1-2.7 0-1 .4-1.9 1.1-2.7.7-.7 1.6-1.1 2.7-1.1 1 0 1.9.4 2.7 1.1.7.7 1.1 1.6 1.1 2.7v.7l-1.3-.2c0-.4-.2-.7-.4-1-.2-.3-.5-.4-.8-.4-.3 0-.6.1-.8.4-.2.3-.4.6-.4 1s.1.7.4 1c.2.3.5.4.8.4h5.3c1.5 0 2.8.5 3.8 1.6 1.1 1.1 1.6 2.3 1.6 3.8 0 1.5-.5 2.8-1.6 3.8-1.1 1.1-2.3 1.6-3.8 1.6h-12c-1.5 0-2.8-.5-3.8-1.6-1.1-1.1-1.6-2.3-1.6-3.8 0-1.1.3-2 1-2.9.7-.8 1.5-1.4 2.6-1.6-.3-.8-.5-1.6-.5-2.5 0-1.5.5-2.8 1.6-3.8 1-1 2.3-1.6 3.8-1.6 1.5 0 2.8.5 3.8 1.6 1.1 1.1 1.6 2.3 1.6 3.8V12h-1.9c0-.4-.1-.8-.4-1.1-.2-.3-.5-.5-.9-.5-.4 0-.7.2-.9.5-.2.3-.4.7-.4 1.1 0 .4.1.8.4 1.1.2.3.5.5.9.5h5.3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
