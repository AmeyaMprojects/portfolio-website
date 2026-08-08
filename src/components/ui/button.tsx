import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Apple-style controls: full-round capsules, weight carried by fill rather
 * than by outline, and press feedback that fires on pointer-down via
 * `:active` (the `pressable` class) instead of waiting for the click.
 */
const buttonVariants = cva(
  [
    "pressable inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "text-[0.9375rem] font-medium tracking-[-0.006em]",
    "transition-colors duration-200 ease-apple",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-blue text-blue-foreground hover:bg-blue-hover",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-secondary",
        ghost: "text-foreground hover:bg-secondary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "rounded-md text-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-9 px-4 text-[0.875rem]",
        lg: "h-12 px-7 text-[1.0625rem]",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
