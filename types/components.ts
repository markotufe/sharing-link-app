import { IconKey } from "@/components/ui/Icon";

export type DropdownOption<T = undefined> = {
  value: string;
  label: string;
  icon?: IconKey;
} & (T extends undefined
  ? {}
  : {
      item?: T;
    });

export type TabName = "Links" | "Personal Details";
export type TabId = "links" | "personal-details";

export type Tab = {
  id: TabId;
  name: TabName;
  icon?: IconKey;
};
