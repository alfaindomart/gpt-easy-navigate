// import React, {useState} from "react";
// import { DndContext } from "@dnd-kit/core";
// import DndDrag from "../hooks/useDraggable";
// import Droppable from "./Droppable";

// function NewDraggabale() {
//     const [isDropped, setIsDropped] = useState(false);
//     const draggableMarkup = (
//         <DndDrag>Test</DndDrag>
//     )

//     function handleDragEnd(e) {
//         if (e.over && e.over.id === 'droppable') {
//             setIsDropped
//         }
//     }


//     return (
//         <DndContext onDragEnd={handleDragEnd}>
//             {!isDropped ? draggableMarkup : null}
//             <DndDrag></DndDrag>

//         </DndContext>
//     )
// }
