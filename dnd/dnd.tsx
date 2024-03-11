"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";

export const DndContext = ({
  children,
  onDragEnd
}: {
  children: React.ReactNode;
  onDragEnd: (result: DropResult) => void;
}) => {
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
