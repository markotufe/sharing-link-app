import { IconKey } from "@/components/ui/Icon";
import { PlatformDropdownType } from "@/config/platforms";

export type Link = {
  id: string;
  platform: PlatformDropdownType;
  platformLink: string;
  rectangle: Rectangle;
};

export type Rectangle = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  text: string;
  href: string;
  icon: IconKey | null;
};
