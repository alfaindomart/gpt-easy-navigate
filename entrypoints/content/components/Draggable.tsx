import Draggable from "react-draggable";
import React from "react";
import type {DraggableEvent, DraggableData} from 'react-draggable'
import { ReactNode } from "react";


type DraggableProps = {
    children: ReactNode
}


export default function DraggableItem({children}: DraggableProps) {

    const eventLogger = (e: MouseEvent, data: Object) => {
        console.log('Event: ', e)
        console.log('Data: ', e)
    }

    return (
        <Draggable
            axis="both"
            defaultPosition={{x:100, y:100}}
            scale={1}
        >
            {children}
        </Draggable>
    )
}
// class App extends React.Component {

//     eventLogger = (e: MouseEvent, data: Object) => {
//         console.log('Event ', e)
//         console.log('Data: ', data)
//     }

//     render() {
//         return (
//             <Draggable
//             axis="x"
//             handle=".handle"
//             defaultPosition={{x: 0, y: 0}}
//             position={null}
//             grid={[25, 25]}
//             scale={1}
//             onStart={this.handleStart}
//             onDrag={this.handleDrag}
//             onStop={this.handleStop}>
//                 <div>
//                     <div className="handle">Drag from here</div>
//                     <div>This readme is really dragging on...</div>
//                 </div>
//         </Draggable>
//         )
//     }
// }

// ReactDOM.render(<App />, document.body)




// export default function Draggable ({children}: DraggableProps) {
//     const [position, setPosition] = useState({x: 600, y: 50})
//     const [isDragging, setIsDragging] = useState(false)
//     const [offset, setOffset] = useState({x: 0, y: 0})

//     function handleMouseDown(e: React.MouseEvent) {
//         console.log('event: handleMouseDown')
//         setIsDragging(true)
//         setOffset({
//             x: e.clientX - position.x, //clientX & Y is the browser's mouse event DOM
//             y: e.clientY - position.y
//         })
//     window.addEventListener("mousemove", handleMouseMove)
//     window.addEventListener("mouseup", handleMouseUp)
//     }

//     function handleMouseMove(e: MouseEvent) {
//         console.log('event: handleMouseMove')
//         if (!isDragging) return
//         setPosition({
//             x: e.clientX - offset.x,
//             y: e.clientY - offset.y
//         })
//     }

//     function handleMouseUp() {
//         console.log('event: handleMouseUp')
//         setIsDragging(false)
//         window.removeEventListener("mousemove", handleMouseMove)
//         window.removeEventListener("mouseup", handleMouseUp)

//     }

//     return (
//         <div
//             onMouseDown={handleMouseDown}
//             onMouseMove={() =>handleMouseMove}
//             onMouseUp={handleMouseUp}
//             className="absolute w-10 h-10 z-999 flex align-middle justify-center"
//             style={{
//                 left: position.x,
//                 top: position.y,
//                 cursor: isDragging ? "grabbing" : "grab",
//                 userSelect: "none",
//                 }}
//         >
//             {children}
//         </div>
//     )
// }