"use client";

import Image from "next/image";
import { useState } from "react";

export default function Cases() {
  const [activeFilter, setActiveFilter] = useState("全部案例");

  const cases = [
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
  ];

  const filterButtons = [
    "全部案例",
    "金融行业",
    "医疗健康",
    "制造业",
    "零售电商",
  ];

  const filteredCases =
    activeFilter === "全部案例"
      ? cases
      : cases.filter((item) => item.industry === activeFilter);

  return (
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
          {filterButtons.map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full transition duration-300 ${
                activeFilter === filter
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "border border-accent text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-12 min-h-[500px]">
          {filteredCases.map((item, index) => (
            <div
              key={`${item.industry}-${index}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group transform transition-all duration-500 opacity-100"
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
      </div>
    </section>
  );
}
