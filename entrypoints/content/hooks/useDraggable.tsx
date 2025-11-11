import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Props } from "@dnd-kit/core/dist/components/DndContext/DndContext";

function DndDrag(props: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props?.children}
    </button>
  );
}

export default DndDrag;
