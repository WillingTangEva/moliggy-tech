import Image from "next/image";

export default function Solutions() {
  return (
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
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <div className="w-8 h-8 relative">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    className="object-contain filter invert brightness-0 invert"
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
  );
} 