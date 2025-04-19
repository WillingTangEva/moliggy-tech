import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center bg-gray-50 overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-15"></div>
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
  );
} 