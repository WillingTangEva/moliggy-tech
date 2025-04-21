import Image from "next/image";

export default function About() {
  return (
    <section id="ceo" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">创始人致辞</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="w-full max-w-md mx-auto aspect-square relative rounded-lg overflow-hidden border-4 border-accent shadow-xl">
              <Image
                src="/ceo.png"
                alt="莫力给科技CEO"
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
              <span className="inline-block px-4 py-1 bg-primary bg-opacity-10 text-white rounded-full border border-accent mr-3">
                人工智能专家
              </span>
              <span className="inline-block px-4 py-1 bg-primary bg-opacity-10 text-white rounded-full border border-accent mr-3">
                数字化转型顾问
              </span>
              <span className="inline-block px-4 py-1 bg-primary bg-opacity-10 text-white rounded-full border border-accent">
                企业家
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
