import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[96px] w-full resize-y rounded-lg border border-input bg-secondary/60 px-3.5 py-2.5 text-[1.0625rem] leading-relaxed tracking-[-0.004em] transition-colors duration-200 placeholder:text-subtle focus-visible:border-blue focus-visible:bg-background focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/20 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
