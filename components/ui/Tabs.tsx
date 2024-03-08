import { Tab, TabId } from "@/types/components";
import Icon from "./Icon";

type TabsProps = {
  tabs: Tab[];
  selectedTab: string;
  handleSelectTab: (tab: TabId) => void;
};

export const Tabs = ({ tabs, selectedTab, handleSelectTab }: TabsProps) => {
  return (
    <ul className="flex items-center gap-5">
      {tabs.map((item) => (
        <li
          key={item.id}
          className={`text-heading-s px-7 py-3 rounded-md cursor-pointer hover:text-purple flex items-center gap-2 ${
            selectedTab === item.id && "bg-lightPurple text-purple"
          }`}
          onClick={() => handleSelectTab(item.id)}
        >
          {item.icon && (
            <Icon
              name={item.icon}
              fill={selectedTab === item.id ? "#633CFF" : "#737373"}
            />
          )}
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};
