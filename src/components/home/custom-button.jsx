'use client';
import React from "react";
import { cn } from "@/lib/utils";

const CustomButton = React.forwardRef(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-[#06140A] shadow-[inset_0px_-3px_15px_0px_rgba(60,255,165,0.25)] text-[#CCFFE5]',
      secondary: 'bg-[#061409] shadow-[inset_0px_-3px_15px_0px_rgba(34,82,47,1)] text-[#BFDCC6]',
      accent: 'bg-[#06140A] shadow-[inset_0px_-3px_15px_0px_rgba(242,255,250,0.25)] text-[#F2FFFA]',
    };

    return (
      <div className="flex flex-col justify-center items-center relative h-[40px] sm:h-[50px] w-[140px] sm:w-[160px] group">
        <button
          className={cn(
            "h-[40px] sm:h-[50px] w-[140px] sm:w-[160px] rounded-[13px] font-manrope text-sm sm:text-base flex flex-col justify-center items-center absolute transform transition-all duration-200 ease-in-out group-hover:translate-y-1",
            variants[variant],
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </button>
        <span className={cn(
          "w-[80px] sm:w-[100px] h-[50px] sm:h-[60px] rounded-full blur-[20px] absolute -bottom-1/2 transition-all duration-200 ease-in-out opacity-0 group-hover:opacity-60",
          {
            'bg-[rgba(60,255,165,0.25)]': variant === 'primary',
            'bg-[rgba(34,82,47,0.5)]': variant === 'secondary',
            'bg-[rgba(242,255,250,0.25)]': variant === 'accent',
          }
        )} />
      </div>
    );
  }
);
CustomButton.displayName = "CustomButton";

export { CustomButton };

