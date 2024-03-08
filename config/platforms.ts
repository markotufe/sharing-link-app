import { IconKey } from "@/components/ui/Icon";
import { DropdownOption } from "@/types/components";

export type Platform = {
  value: string;
  label: string;
  color: string;
  icon: IconKey;
};

export type PlatformDropdownType = DropdownOption<Platform>;

export const platforms: Platform[] = [
  { value: "github", label: "Github", icon: "github", color: "#1A1A1A" },
  { value: "facebook", label: "Facebook", icon: "facebook", color: "#2442AC" },
  { value: "youtube", label: "Youtube", icon: "youtube", color: "#EE3939" },
  { value: "linkedin", label: "Linkedin", icon: "linkedin", color: "#2D68FF" },
  {
    value: "stackoverflow",
    label: "Stack Overflow",
    icon: "stack-overflow",
    color: "#EC7100"
  },
  {
    value: "twitch",
    label: "Twitch",
    icon: "twitch",
    color: "#EE3FC8"
  }
];

export const options: PlatformDropdownType[] = platforms.map((item) => ({
  label: item.label,
  value: item.value,
  icon: item.icon,
  item
}));
