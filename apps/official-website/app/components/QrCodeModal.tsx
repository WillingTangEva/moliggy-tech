'use client';

import { motion } from 'motion/react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@workspace/ui/components/dialog';
import { Button } from '@workspace/ui/components/button';

interface QrCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QrCodeModal({ isOpen, onClose }: QrCodeModalProps) {
    // 容器动画
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 300,
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.2,
                ease: 'easeOut',
            },
        },
    };

    // 子元素动画
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
            },
        },
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open: boolean) => !open && onClose()}
        >
            <DialogContent className="max-w-sm overflow-hidden rounded-xl p-0">
                <motion.div
                    className="p-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <DialogHeader>
                        <motion.div variants={itemVariants}>
                            <DialogTitle className="text-center text-xl font-bold">
                                扫码咨询
                            </DialogTitle>
                        </motion.div>
                    </DialogHeader>

                    <motion.div
                        className="my-4 flex justify-center"
                        variants={itemVariants}
                    >
                        <div className="border-border bg-background relative h-56 w-56 rounded-lg border p-2">
                            <div className="relative h-full w-full">
                                <motion.svg
                                    className="h-full w-full"
                                    viewBox="0 0 200 200"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <rect
                                        width="200"
                                        height="200"
                                        fill="white"
                                    />
                                    <path
                                        d="M50 50H80V80H50V50ZM90 50H100V60H90V50ZM110 50H120V60H110V50ZM130 50H150V70H130V50ZM50 90H60V100H50V90ZM70 90H80V100H70V90ZM100 90H110V110H100V90ZM120 90H130V100H120V90ZM140 90H150V100H140V90ZM50 110H60V120H50V110ZM80 110H90V120H80V110ZM120 110H130V120H120V110ZM140 110H150V120H140V110ZM120 120H130V130H120V120ZM50 130H80V150H50V130ZM100 130H110V140H100V130ZM130 130H150V150H130V150Z"
                                        fill="black"
                                    />
                                </motion.svg>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                        <p className="text-foreground mb-2">
                            微信扫码，立即获取专业咨询
                        </p>
                        <p className="text-muted-foreground text-sm">
                            或添加客服微信: moliggy-tech
                        </p>
                    </motion.div>

                    <DialogFooter className="mt-6 flex justify-center">
                        <motion.div variants={itemVariants}>
                            <Button
                                onClick={onClose}
                                className="rounded-full px-6"
                            >
                                关闭
                            </Button>
                        </motion.div>
                    </DialogFooter>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
