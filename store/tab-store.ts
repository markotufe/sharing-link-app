import { Tab, TabId, TabName } from "@/types/components";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type LinkStore = {
  activeTab: TabId;
  hasHydrated: boolean;
  actions: {
    setActiveTab: (tab: TabId) => void;
    setHasHydrated: (isHydrated: boolean) => void;
  };
};

const useTabStore = create(
  devtools(
    persist<LinkStore>(
      (set) => ({
        hasHydrated: false,
        activeTab: "links",
        actions: {
          setHasHydrated: (isHydrated) => {
            set(() => ({
              hasHydrated: isHydrated
            }));
          },
          setActiveTab: (tab) => {
            set(() => ({
              activeTab: tab
            }));
          }
        }
      }),
      {
        name: "tab-storage",
        partialize: ({ actions, ...rest }) => rest as LinkStore,
        onRehydrateStorage: () => (state) => {
          state?.actions.setHasHydrated(true);
        }
      }
    )
  )
);

export const useTabStoreData = () => useTabStore((state) => state);

export const useTabStoreActions = () => useTabStore((state) => state.actions);
