import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Link } from "@/types/link-store";
import { v4 as uuidv4 } from "uuid";
import { PlatformDropdownType } from "@/config/platforms";
import { IconKey } from "@/components/ui/Icon";

type UpdateLinkProps =
  | { linkId: string } & (
      | {
          platformLink: string;
          updateType: "text";
        }
      | {
          platform: PlatformDropdownType;
          updateType: "select";
        }
    );

type LinkStore = {
  links: Link[];
  hasHydrated: boolean;
  actions: {
    addLink: () => void;
    updateLink: (data: UpdateLinkProps) => void;
    removeLink: (linkId: string) => void;
    setHasHydrated: (isHydrated: boolean) => void;
    reorderLinks: (links: Link[]) => void;
  };
};

const useLinkStore = create(
  devtools(
    persist<LinkStore>(
      (set) => ({
        hasHydrated: false,
        links: [],
        actions: {
          setHasHydrated: (isHydrated) => {
            set(() => ({
              hasHydrated: isHydrated
            }));
          },

          reorderLinks: (newLinks) => {
            set(() => {
              const reorderedLinks = newLinks.map((item, index) => ({
                ...item,
                rectangle: {
                  ...item.rectangle,
                  y: 278 + index * 64
                }
              }));

              return {
                links: reorderedLinks
              };
            });
          },

          addLink: () => {
            set((state) => {
              return {
                links: [
                  ...state.links,
                  {
                    id: uuidv4(),
                    platform: null as unknown as PlatformDropdownType,
                    platformLink: "",
                    rectangle: {
                      id: uuidv4(),
                      x: 35,
                      y: 278 + state.links.length * 64,
                      width: 237,
                      height: 44,
                      fill: "#EEEE",
                      text: "",
                      href: "",
                      icon: null
                    }
                  }
                ]
              };
            });
          },

          updateLink: (data) => {
            set((state) => {
              const updatedLinks = state.links.map((item) => {
                if (item.id !== data.linkId) return item;

                if (data.updateType === "text") {
                  const { platformLink } = data;

                  return {
                    ...item,
                    platformLink: platformLink as string,
                    rectangle: {
                      ...item.rectangle,
                      href: platformLink as string
                    }
                  };
                }

                const { platform } = data;
                const { label, item: platformItem, icon } = platform;

                return {
                  ...item,
                  platform: platform,
                  rectangle: {
                    ...item.rectangle,
                    text: label,
                    fill: platformItem?.color as string,
                    icon: icon as IconKey
                  }
                };
              });

              return {
                links: updatedLinks
              };
            });
          },

          removeLink: (linkId) => {
            set((state) => {
              const itemToDelete = state.links.find(
                (item) => item.id === linkId
              );

              if (!itemToDelete)
                return {
                  links: state.links
                };

              const newLinks = state.links.reduce(
                (previousValue: Link[], currentValue) => {
                  if (currentValue.id !== linkId) {
                    return [
                      ...previousValue,
                      {
                        ...currentValue,
                        rectangle: {
                          ...currentValue.rectangle,
                          y: 278 + previousValue.length * 64
                        }
                      }
                    ];
                  }
                  return previousValue;
                },
                []
              );

              return {
                links: newLinks
              };
            });
          }
        }
      }),
      {
        name: "link-storage",
        partialize: ({ actions, ...rest }) => rest as LinkStore,
        onRehydrateStorage: () => (state) => {
          state?.actions.setHasHydrated(true);
        }
      }
    )
  )
);

export const useLinkStoreData = () => useLinkStore((state) => state);

export const useLinkStoreActions = () => useLinkStore((state) => state.actions);
