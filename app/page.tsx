"use client";

import EmptyLinks from "@/components/EmptyLinks";
import MobileMockup from "@/components/MobileMockup";
import Button from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { ImagePicker } from "@/components/ui/ImagePicker";
import TextInput from "@/components/ui/TextInput";
import { PlatformDropdownType, options } from "@/config/platforms";
import { DndContext } from "@/dnd/dnd";
import { useLinkStoreActions, useLinkStoreData } from "@/store/link-store";
import { useTabStoreData } from "@/store/tab-store";
import { Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

export default function Home() {
  const [previewImage, setPreviewImage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File>();

  const { links, hasHydrated } = useLinkStoreData();
  const { addLink, removeLink, updateLink, reorderLinks } =
    useLinkStoreActions();

  const { activeTab } = useTabStoreData();

  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: ""
  });

  if (!hasHydrated) return <></>;

  let pageContent: React.ReactNode;

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newLinkList = structuredClone(links);

    const [removed] = newLinkList.splice(source.index, 1);

    newLinkList.splice(destination.index, 0, removed);

    reorderLinks(newLinkList);
  };

  if (activeTab === "links") {
    pageContent = (
      <>
        <div className="p-10 pb-0">
          <h1 className="text-heading-m text-darkGrey font-bold">
            Customize your links
          </h1>
          <p className="text-grey text-body-m mt-2">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <Button
            variant="secondary"
            disabled={links.length === 5}
            onClick={addLink}
            className="w-full mt-10"
          >
            Add new link
          </Button>
        </div>

        {links.length === 0 && (
          <div className="p-10">
            <div className="flex-1 bg-lightGrey rounded-xl flex items-center justify-center flex-col p-[40px]">
              <EmptyLinks />
              <h1 className="text-heading-m font-bold text-darkGrey mt-10">
                Lets get you started
              </h1>
              <p className="text-body-m text-grey max-w-[488px] text-center mt-6">
                {`Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We're here to help
              you share your profiles with everyone!`}
              </p>
            </div>
          </div>
        )}

        <div className="overflow-scroll flex-1 p-10 py-3">
          <DndContext onDragEnd={onDragEnd}>
            {links.map((link, index) => {
              return (
                <Droppable key={index} droppableId={`droppable${index}`}>
                  {(provided) => (
                    <div
                      className="w-full bg-white"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <Draggable
                        key={link.rectangle.id}
                        draggableId={link.rectangle.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <div
                              className="bg-gray-50 p-5 rounded-xl my-6"
                              key={link.id}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-x-2">
                                  <Icon
                                    name="drag-and-drop"
                                    className="mt-2 cursor-pointer"
                                  />
                                  <p className="text-grey font-bold">
                                    Link {`#${index + 1}`}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="small"
                                  onClick={() => {
                                    removeLink(link.id);
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                              <div className="gap-y-5 flex flex-col mt-3">
                                <Dropdown
                                  options={options}
                                  selectedOption={link.platform}
                                  handleSelectOption={(
                                    option: PlatformDropdownType
                                  ) => {
                                    updateLink({
                                      linkId: link.id,
                                      platform: option,
                                      updateType: "select"
                                    });
                                  }}
                                  label="Platform"
                                />
                                <TextInput
                                  name="platformLink"
                                  id={`platformLink-${link.id}`}
                                  placeholder="Enter platform link"
                                  label="Link"
                                  renderIcon={() => (
                                    <Icon
                                      name="link"
                                      className="absolute top-1/2 left-4 transform -translate-y-1/2"
                                    />
                                  )}
                                  value={link.platformLink}
                                  className="w-full"
                                  onChange={(e) => {
                                    updateLink({
                                      linkId: link.id,
                                      platformLink: e.target.value,
                                      updateType: "text"
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </DndContext>
        </div>
      </>
    );
  } else {
    pageContent = (
      <>
        <div className="p-10 pb-0 flex-1">
          <h1 className="text-heading-m text-darkGrey font-bold">
            Profile Details
          </h1>
          <p className="text-grey text-body-m mt-2">
            Add your details to create a personal touch to your profile.
          </p>

          <div className="mt-10">
            <div className="bg-lightGrey rounded-xl flex items-center p-5">
              <div className="w-1/3">
                <p className="text-body-m text-grey">Profile details</p>
              </div>
              <div className="flex items-center gap-8 w-2/3">
                <ImagePicker
                  handleSelectImage={setSelectedImage}
                  setPreviewImage={setPreviewImage}
                  previewUrl={previewImage}
                />
                <p className="text-body-s text-grey w-[215px]">
                  Image must be below 1024x1024px. Use PNG or JPG format.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="bg-lightGrey rounded-xl p-5 flex flex-col gap-y-3">
              <div className="flex items-center">
                <div className="w-1/3">
                  <p className="text-body-m text-grey">First Name*</p>
                </div>
                <div className="w-2/3">
                  <TextInput
                    id="firstName"
                    placeholder="e.g. John"
                    className="w-full"
                    onChange={(e) => {
                      setUserData((prev) => ({
                        ...prev,
                        firstName: e.target.value
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-1/3">
                  <p className="text-body-m text-grey">Last Name*</p>
                </div>
                <div className="w-2/3">
                  <TextInput
                    id="lastName"
                    placeholder="e.g. Doe"
                    className="w-full"
                    onChange={(e) => {
                      setUserData((prev) => ({
                        ...prev,
                        lastName: e.target.value
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-1/3">
                  <p className="text-body-m text-grey">Email</p>
                </div>
                <div className="w-2/3">
                  <TextInput
                    id="email"
                    placeholder="e.g. johndoe@gmail.com"
                    className="w-full"
                    onChange={(e) => {
                      setUserData((prev) => ({
                        ...prev,
                        email: e.target.value
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="p-5 space-y-5">
      <div className="flex gap-x-6 h-[834px]">
        <div className="w-2/5 bg-white rounded-xl justify-center items-center flex">
          <MobileMockup
            imageUrl={previewImage}
            userData={userData}
            links={links}
          />
        </div>
        <div className="w-3/5 bg-white rounded-xl flex flex-col relative">
          {pageContent}
          <div className="p-10 h-[94px] bg-white border-t items-center flex justify-end border-borders rounded-b-xl">
            <Button disabled={links.length === 0}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
