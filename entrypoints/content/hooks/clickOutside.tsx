import {Ref, RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLDivElement | null>, callback: () => void) {
    
    useEffect (() => {
        
        function clickOutside(e: MouseEvent) {

            console.log('clickOutside started')

            console.log(e.target)

            console.log(e.composedPath())

            //use composedPath instead of ref.current.contains(e.target), cuz we use shadowRootUI instead of integrated UI. Thanks Gemini!
            //It has something to do with retargeting in ShadowDOM. Not quite getting it yet, need to learn more: https://it.javascript.info/shadow-dom-events
            if (ref.current && !e.composedPath().includes(ref.current)) {
                callback()
            }
        }

        document.addEventListener('mousedown', clickOutside)

            return () => {
            document.removeEventListener("mousedown", clickOutside);
    };
    }, [ref, callback])
}

export default useClickOutside