"use client";

import Image from "next/image";
import { Tabs } from "./ui/Tabs";
import Button from "./ui/Button";
import { useTabStoreActions, useTabStoreData } from "@/store/tab-store";
import { TabId } from "@/types/components";

export function NavigationBar() {
  const { activeTab, hasHydrated } = useTabStoreData();
  const { setActiveTab } = useTabStoreActions();

  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
  };

  if (!hasHydrated) return <></>;

  return (
    <nav className="bg-white rounded-xl p-4 flex items-center justify-between">
      <Image
        src={`/images/logo.svg`}
        priority
        width={146}
        height={32}
        alt="app-logo"
      />
      <Tabs
        handleSelectTab={handleSelectTab}
        selectedTab={activeTab}
        tabs={[
          {
            id: "links",
            name: "Links",
            icon: "email"
          },
          {
            id: "personal-details",
            name: "Personal Details",
            icon: "password"
          }
        ]}
      />
      <Button variant="secondary" size="medium">
        Preview
      </Button>
    </nav>
  );
}
