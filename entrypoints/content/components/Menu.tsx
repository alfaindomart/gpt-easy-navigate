import { useState, useEffect, useRef, ReactElement, ChangeEventHandler, Ref, RefObject } from "react";
import { ChevronRight } from "lucide-react";
import { SidebarContent } from "./SidebarContent";
import { Config, siteConfig } from "../config";
import useClickOutside from "../hooks/clickOutside";
import Draggable from "react-draggable";


function OpenMenu() {
    const nodeRef = useRef(null)
    console.time('OpenMenu')
    const [isOpen, setIsOpen] = useState(false)
    const [currSite, setCurrSite] = useState<Config|null>(null)
    const [userQueries, setUserQueries] = useState<HTMLElement[]>([])

    // const [keywords, setKeywords] = useState("")
    // const [filteredQueries, setFiltered] = useState(userQueries)

    const refMenu = useRef<HTMLDivElement>(null) 

    const fetchQueries = (queriesSelector: string | undefined) => {
            
            if (!queriesSelector) {
                console.log('param queriesSelector missing')
                return
            }

            const queries = [...document.querySelectorAll(`${currSite?.selectors.userQueries}`)] as HTMLElement[]
            
            setUserQueries(queries)
        }

    useEffect(() => {//fetch queries on the first page load
        const currHostname = window.location.hostname

        const key = Object.keys(siteConfig).find(key => siteConfig[key].hostname === currHostname)

        if (!key) return

         setCurrSite(siteConfig[key])
         fetchQueries(currSite?.selectors.userQueries)
    }, [])

    useEffect(() => {//fetch queries everytime menu is open or closed

        if (isOpen) {

            const currHostname = window.location.hostname

            const key = Object.keys(siteConfig).find(key => siteConfig[key].hostname === currHostname)

            if (!key) return

            console.log(key) //output: the key of sitesConfig, "chatgpt" "gemini"

            console.log(siteConfig[key])

            setCurrSite(siteConfig[key])
            fetchQueries(currSite?.selectors.userQueries)

        } else {console.log('menu is closed')}


    }, [isOpen])

    useClickOutside(refMenu, () => {setIsOpen(false)})

    // function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    //     const getInput = e.target.value
    //     setKeywords(getInput)

    //     const filtering = userQueries.filter((query) => {
    //         query.innerText.toLowerCase().includes(getInput.toLowerCase())
    //     })

    //     setFiltered(filtering)
    // }


    // observeNewQuery()

    console.timeEnd('OpenMenu')


    return (
        <Draggable nodeRef={nodeRef}>
            <div ref={nodeRef} className="h-10 w-10 absolute z-50 top-20 left-5">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <ChevronRight className="rotate-90" color="red" /> : <ChevronRight color="red" />}
                </button>
                <div>
                    {isOpen && (
                        <div ref={refMenu} 
                        className="resize rounded-2xl overflow-auto h-80 w-80 min-h-60 min-w-48 max-w-90 max-h-90 flex flex-col p-5 pr-1 m-3 bg-gray-950">
                            <SidebarContent currSite={currSite} userQueries={userQueries}/>
                        </div>
                    )}
                </div>
            </div>
        </Draggable>
    )
}


/* Todo: use MutationObserver to update the sidebar automatically

function debounce<T extends unknown []>(fn: (...args: T) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    clearTimeout(timeout); // cancel the previous scheduled call
    timeout = setTimeout(() => {fn.call(null, ...args)}, delay);
  };
}

function observeNewQuery() {

    useEffect(() => {

    const target = document.getElementById('thread')
    if (!target) return
        
    const config = {childList: true, subtree: true };

    const callback = (mutationLists: MutationRecord[], observer: MutationObserver) => {
        if (!mutationLists) return
        for (const mutation of mutationLists) {
            if (mutation.type === "childList") {
                console.log("A direct child has been added or removed")
            } else console.log('nohting')
            }
        }
            const observer = new MutationObserver(debounce(callback, 3000))

                observer.observe(target, config)

                    return () => {
      observer.disconnect();
    };
}, [])
    }
*/

export default OpenMenu