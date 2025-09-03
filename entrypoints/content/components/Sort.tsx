import { useState, useRef } from "react";
import { EllipsisIcon } from "lucide-react";
import useClickOutside from "../hooks/clickOutside";

export default function Sort() {

    const [isOpen, setIsOpen] = useState(false)

    const refSortMenu = useRef<HTMLDivElement>(null)

    useClickOutside(refSortMenu, () => {setIsOpen(false)})


    return (
        <>
        <button onClick={() => setIsOpen(!isOpen)}>
            <EllipsisIcon />
        </button>
        <div ref={refSortMenu}>
            {isOpen && (
                <div className="flex flex-col">
                    <button>Show Bookmark Only</button>
                    <button>Old to New</button>
                    <button>New to Old</button>
                </div>
            )}
        </div>
        </>
    )
}