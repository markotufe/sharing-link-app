import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const inputStyles = cva(
  ["flex", "items-center", "justify-center", "transition-colors"],
  {
    variants: {
      variant: {
        primary: [
          "bg-white",
          "text-darkGrey text-body-m font-regular",
          "border border-borders px-4 py-3 rounded-md focus:border-purple focus:outline-none",
          "focus:drop-shadow-input"
        ],
        error: [
          "bg-white",
          "text-red text-body-m font-regular placeholder-red",
          "border border-red px-4 py-3 pl-[44px] rounded-md focus:border-red focus:outline-none"
        ]
      },
      size: {
        default: ["rounded-md", "w-[480px]", "h-[48px]"]
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

type TextInputProps = VariantProps<typeof inputStyles> &
  ComponentProps<"input"> & {
    label?: string;
    renderIcon?: () => JSX.Element;
    errorMessage?: string;
  };

const TextInput = ({
  variant,
  size,
  className,
  label,
  renderIcon,
  errorMessage,
  ...props
}: TextInputProps) => {
  const padding =
    renderIcon !== undefined || errorMessage
      ? "pl-[44px] pr-[140px]"
      : "pl-[16px] pr-[16px]";

  return (
    <div>
      {label && (
        <label
          htmlFor={props.id}
          className={`text-sm ${errorMessage ? "text-red" : "text-darkGrey"}`}
        >
          {label}
        </label>
      )}
      <div className="relative mt-1">
        <input
          {...props}
          className={twMerge(
            inputStyles({ variant, size }),
            className,
            padding
          )}
        />
        {renderIcon?.()}
        <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-red text-body-s">
          {errorMessage}
        </span>
      </div>
    </div>
  );
};

export default TextInput;
