'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

// UI 组件导入
import { Card, CardContent } from '@workspace/ui/components/card';
import { H2, H3, P, Muted } from '@workspace/ui/components/typography';

export default function Solutions() {
    const solutions = [
        {
            title: '数字化转型咨询',
            description: '针对您的业务需求，提供详尽的数字化战略规划与实施路径',
            icon: '/icons/consulting.svg',
        },
        {
            title: '企业级应用开发',
            description: '基于最新技术打造定制化企业应用，提升业务效率',
            icon: '/icons/development.svg',
        },
        {
            title: 'AI解决方案集成',
            description: '将人工智能技术融入您的业务流程，实现智能化决策与运营',
            icon: '/icons/ai.svg',
        },
        {
            title: 'DevOps实践指导',
            description: '建立高效的开发运维一体化流程，加速产品迭代与交付',
            icon: '/icons/devops.svg',
        },
        {
            title: '云端架构设计',
            description: '设计弹性可扩展的云架构，降低成本同时提高系统可靠性',
            icon: '/icons/cloud.svg',
        },
        {
            title: '遗留系统重构',
            description: '为传统系统注入新活力，平稳过渡到现代化技术栈',
            icon: '/icons/legacy.svg',
        },
    ];

    // 动画变量
    const animations = {
        title: {
            hidden: { opacity: 0, y: -20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' },
            },
        },
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
        },
        card: {
            hidden: { opacity: 0, y: 30 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
            },
        },
    };

    return (
        <section
            id="solutions"
            className="bg-background relative overflow-hidden py-20"
        >
            {/* 背景装饰 */}
            <div className="bg-grid-pattern absolute inset-0 z-0 opacity-5"></div>
            <div className="bg-primary/5 absolute -right-40 -top-40 z-0 h-96 w-96 rounded-full blur-3xl"></div>
            <div className="bg-accent/5 absolute -bottom-40 -left-40 z-0 h-96 w-96 rounded-full blur-3xl"></div>

            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    className="mb-16 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={animations.title}
                >
                    <H2 className="text-3xl font-bold md:text-4xl">
                        我们的解决方案
                    </H2>
                    <div className="bg-primary mx-auto mt-4 h-1 w-20 rounded-full"></div>
                    <Muted className="text-foreground/70 mx-auto mt-6 max-w-2xl">
                        为企业提供从咨询到实施的全方位数字化转型服务
                    </Muted>
                </motion.div>

                <motion.div
                    className="grid gap-6 md:grid-cols-3 md:gap-8"
                    variants={animations.container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {solutions.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={animations.card}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.3 },
                            }}
                        >
                            <Card className="border-border/50 hover:border-primary/30 bg-card/80 h-full border backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                                <CardContent className="p-8">
                                    <motion.div
                                        className="bg-primary/10 text-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full md:mx-0"
                                        whileHover={{
                                            scale: 1.1,
                                            backgroundColor: 'var(--primary)',
                                            color: 'var(--primary-foreground)',
                                            transition: {
                                                duration: 0.3,
                                                type: 'spring',
                                            },
                                        }}
                                    >
                                        <div className="relative h-8 w-8">
                                            <Image
                                                src={item.icon}
                                                alt={item.title}
                                                className="object-contain brightness-0 invert filter"
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                    </motion.div>

                                    <div className="text-center md:text-left">
                                        <H3 className="group-hover:text-primary mb-3 text-xl font-semibold transition-colors">
                                            {item.title}
                                        </H3>
                                        <P className="text-muted-foreground text-sm">
                                            {item.description}
                                        </P>
                                    </div>

                                    <motion.div
                                        className="bg-primary/20 mx-auto mt-4 h-1 w-12 rounded-full md:mx-0"
                                        whileHover={{
                                            width: '50%',
                                            backgroundColor: 'var(--primary)',
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
