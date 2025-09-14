import { useState, useRef, Dispatch, SetStateAction } from "react";
import {SortAsc, SortDesc, Star} from "lucide-react";
import useClickOutside from "../hooks/clickOutside";

export type options = {
    filterSaved: boolean
    sortFromNew: boolean
}

interface Prop {
    options: options,
    setOptions: Dispatch<SetStateAction<options>>
}

export default function Sort({options, setOptions}: Prop) {

    const [isOpen, setIsOpen] = useState(false)

    const refSortMenu = useRef<HTMLDivElement>(null)

    useClickOutside(refSortMenu, () => {setIsOpen(false)})

    function toggleFilter () {
        setOptions(prev => ({...prev, filterSaved: !prev.filterSaved}))
    }

    function toggleSort() {
        setOptions(prev => ({...prev, sortFromNew: !prev.sortFromNew}))
    }


    return (
        <div>
            <button onClick={toggleSort}>
                {options.sortFromNew ? <SortAsc/> : <SortDesc />}
            </button>
            <button onClick={toggleFilter}>
                {options.filterSaved ? <Star fill="red"/> :  <Star />}
            </button>
        </div>
    )
}