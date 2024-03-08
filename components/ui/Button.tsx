import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  ["flex", "items-center", "justify-center", "transition-colors"],
  {
    variants: {
      variant: {
        primary: [
          "bg-purple",
          "text-white",
          "hover:bg-purpleHover disabled:pointer-events-none disabled:bg-purpleHover/70 text-heading-s text-white font-medium"
        ],
        secondary: [
          "bg-transparent",
          "border-purple border",
          "hover:bg-purpleHover/30 disabled:pointer-events-none disabled:opacity-40 text-heading-s text-purple font-medium"
        ],
        ghost: [
          "bg-transparent",
          "disabled:pointer-events-none disabled:opacity-40 text-heading-s font-medium text-grey"
        ]
      },
      size: {
        default: ["rounded-md", "px-7 ", "py-3"],
        medium: ["rounded-md", "px-7 ", "py-2.5"],
        small: ["p-0 m-0"]
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
};

export default Button;
