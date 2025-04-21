import { cn } from "@/app/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

// h1 组件
export const H1 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      className
    )}
    {...props}
  />
));
H1.displayName = "H1";

// h2 组件
export const H2 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      className
    )}
    {...props}
  />
));
H2.displayName = "H2";

// h3 组件
export const H3 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "scroll-m-20 text-2xl font-semibold tracking-tight",
      className
    )}
    {...props}
  />
));
H3.displayName = "H3";

// h4 组件
export const H4 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn(
      "scroll-m-20 text-xl font-semibold tracking-tight",
      className
    )}
    {...props}
  />
));
H4.displayName = "H4";

// p 组件 - 普通段落文本
export const P = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
    {...props}
  />
));
P.displayName = "P";

// BlockQuote 组件 - 引用块
export const BlockQuote = forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(
      "mt-6 border-l-2 pl-6 italic text-muted-foreground",
      className
    )}
    {...props}
  />
));
BlockQuote.displayName = "BlockQuote";

// List 组件 - 无序列表
export const UL = forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
    {...props}
  />
));
UL.displayName = "UL";

// 有序列表
export const OL = forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}
    {...props}
  />
));
OL.displayName = "OL";

// InlineCode 组件 - 内联代码
export const InlineCode = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
      className
    )}
    {...props}
  />
));
InlineCode.displayName = "InlineCode";

// Lead 组件 - 引导文本
export const Lead = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xl text-muted-foreground", className)}
    {...props}
  />
));
Lead.displayName = "Lead";

// Large 组件 - 大号文本
export const Large = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
Large.displayName = "Large";

// Small 组件 - 小号文本
export const Small = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "small";
  return (
    <Comp
      ref={ref}
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
});
Small.displayName = "Small";

// Muted 组件 - 次要文本
export const Muted = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
Muted.displayName = "Muted"; 