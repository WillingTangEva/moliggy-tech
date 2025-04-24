import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@workspace/ui/lib/utils';

type TypographyProps = React.HTMLAttributes<HTMLElement>;

// 标题组件
export const H1 = forwardRef<HTMLHeadingElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <h1
            ref={ref}
            className={cn(
                'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
                className
            )}
            {...props}
        />
    )
);
H1.displayName = 'H1';

export const H2 = forwardRef<HTMLHeadingElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <h2
            ref={ref}
            className={cn(
                'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
                className
            )}
            {...props}
        />
    )
);
H2.displayName = 'H2';

export const H3 = forwardRef<HTMLHeadingElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn(
                'scroll-m-20 text-2xl font-semibold tracking-tight',
                className
            )}
            {...props}
        />
    )
);
H3.displayName = 'H3';

export const H4 = forwardRef<HTMLHeadingElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <h4
            ref={ref}
            className={cn(
                'scroll-m-20 text-xl font-semibold tracking-tight',
                className
            )}
            {...props}
        />
    )
);
H4.displayName = 'H4';

// 段落组件
export const P = forwardRef<HTMLParagraphElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
            {...props}
        />
    )
);
P.displayName = 'P';

// 引用块组件
export const BlockQuote = forwardRef<HTMLQuoteElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <blockquote
            ref={ref}
            className={cn(
                'text-muted-foreground mt-6 border-l-2 pl-6 italic',
                className
            )}
            {...props}
        />
    )
);
BlockQuote.displayName = 'BlockQuote';

// 列表组件
export const UL = forwardRef<HTMLUListElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <ul
            ref={ref}
            className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
            {...props}
        />
    )
);
UL.displayName = 'UL';

export const OL = forwardRef<HTMLOListElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <ol
            ref={ref}
            className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)}
            {...props}
        />
    )
);
OL.displayName = 'OL';

// 代码组件
export const InlineCode = forwardRef<HTMLElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <code
            ref={ref}
            className={cn(
                'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm',
                className
            )}
            {...props}
        />
    )
);
InlineCode.displayName = 'InlineCode';

// 特殊文本组件
export const Lead = forwardRef<HTMLParagraphElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn('text-muted-foreground text-xl', className)}
            {...props}
        />
    )
);
Lead.displayName = 'Lead';

export const Large = forwardRef<HTMLDivElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('text-lg font-semibold', className)}
            {...props}
        />
    )
);
Large.displayName = 'Large';

export interface SmallProps extends TypographyProps {
    asChild?: boolean;
}

export const Small = forwardRef<HTMLElement, SmallProps>(
    ({ className, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'small';
        return (
            <Comp
                ref={ref}
                className={cn('text-sm font-medium leading-none', className)}
                {...props}
            />
        );
    }
);
Small.displayName = 'Small';

export const Muted = forwardRef<HTMLParagraphElement, TypographyProps>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn('text-muted-foreground text-sm', className)}
            {...props}
        />
    )
);
Muted.displayName = 'Muted';
