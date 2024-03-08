import iconsConfig from "@/config/icon.json";
const { icons } = iconsConfig;

export type IconKey = keyof typeof icons;

type IconProps = {
  name: IconKey;
  fill?: string;
  className?: string;
  y?: number;
  x?: number;
};

const Icon = ({ name, fill, className, y, x }: IconProps) => {
  const icon = icons[name];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={className}
      y={y}
      x={x}
    >
      <path fill={fill || "#737373"} d={icon?.paths[0]} />
    </svg>
  );
};

export default Icon;
