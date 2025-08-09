import { MouseEventHandler, ReactNode, useState } from "react";

type DraggableProps = {
    children: ReactNode
}

export default function Draggable ({children}: DraggableProps) {
    const [position, setPosition] = useState({x: 100, y: 100})
    const [isDragging, setIsDragging] = useState(false)
    const [offset, setOffset] = useState({x: 0, y: 0})

    function handleMouseDown(e: React.MouseEvent) {
        setIsDragging(true)
        setOffset({
            x: e.clientX - position.x, //clientX & Y is the browser's mouse event DOM
            y: e.clientY - position.y
        })
    }

    function handleMouseMove(e: React.MouseEvent) {
        if (!isDragging) return
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
        })
    }

    function handleMouseUp() {
        setIsDragging(false)
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            // className="absolute left-{position.x} right-{position.y} width-100 height-100 cursor-{{isDragging ? cursor-grabbing : cursor-default}}"
                  style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: 50,
        height: 50,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
        >
            {children}
        </div>
    )
}