"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import QrCodeModal from "./QrCodeModal";
import { scrollToElement } from "../utils/scrollUtils";
import { cn } from "../utils/cn";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "./ui/sheet";

export default function Navbar() {
  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 初始化
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    { name: "解决方案", id: "solutions" },
    { name: "客户案例", id: "cases" },
    { name: "关于我们", id: "ceo" },
    { name: "联系我们", id: "contact" },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    scrollToElement(id);
  };

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-background shadow-sm" 
        : "bg-background/60 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
    )}>
      <nav className="container mx-auto px-4 py-2 md:py-3 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link href="/" className="font-bold text-xl md:text-2xl text-primary">
            MoliggyTech
          </Link>
        </motion.div>
        
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              className={cn(
                "font-medium transition-colors hover:text-primary relative",
                activeSection === item.id 
                  ? "text-primary" 
                  : "text-foreground"
              )}
              onClick={() => handleNavClick(item.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeSection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-3">
          <ThemeToggle />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              onClick={() => setIsQrCodeModalOpen(true)}
              className="rounded-full py-1 px-3 text-sm md:text-base md:py-2 md:px-6"
            >
              立即咨询
            </Button>
          </motion.div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden p-0 h-8 w-8">
                <Menu className="h-5 w-5 text-foreground" />
                <span className="sr-only">打开菜单</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-12">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.id}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-base"
                      onClick={() => handleNavClick(item.id)}
                    >
                      {item.name}
                    </Button>
                  </SheetClose>
                ))}
                <div className="flex items-center px-3 py-2">
                  <span className="mr-2 text-sm text-muted-foreground">暗黑模式</span>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      
      <QrCodeModal 
        isOpen={isQrCodeModalOpen} 
        onClose={() => setIsQrCodeModalOpen(false)} 
      />
    </header>
  );
} 