import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { siteConfig, Config } from "../config";
import { SidebarContent } from "./SidebarContent";

function OpenMenu() {
    const [isOpen, setIsOpen] = useState(false)

    // observeNewQuery()


    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <ChevronRight className="rotate-90" /> : <ChevronRight />}
            </button>
            <div className="h-height flex-col">
                {isOpen && (
    
                    <div style={{backgroundColor: 'var(--bg-elevated-secondary)'}} className="w-64">
                        <SidebarContent />
                    </div>
                )}
            </div>
        </>
    )
}

    // function SidebarContent() {
    //     const [userQueries, setUserQueries] = useState<HTMLElement[]>([])
    //     const [currSite, setCurrSite] = useState<Config | null>(null)
        

    //     const fetchQueries = (queriesSelector: string | undefined) => {
            
    //         if (!queriesSelector) {
    //             console.log('param queriesSelector missing')
    //             return
    //         }
    //         console.log('getting user queries...')
    //         const queries = [...document.querySelectorAll(`${queriesSelector}`)] as HTMLElement[]
            
    //         setUserQueries(queries)
    //     }

        // const getSiteConfig = () => {
        //     const currHostname = window.location.hostname

        //     const key = Object.keys(siteConfig).find(key => siteConfig[key].hostname === currHostname)

        //     if (!key) return

        //     console.log(key) //output: the key of sitesConfig

        //     setCurrSite(siteConfig[key])
        // }

        // useEffect(() => {
        //     const currHostname = window.location.hostname

        //     const key = Object.keys(siteConfig).find(key => siteConfig[key].hostname === currHostname)

        //     if (!key) return

        //     console.log(key) //output: the key of sitesConfig

        //     setCurrSite(siteConfig[key])
        //     console.log(currSite)
        //     fetchQueries(currSite?.selectors.userQueries)
        // }, [])        
        
    //     return (
    //         <div className="h-80 overflow-auto flex flex-col">
    //             {userQueries && userQueries.length > 0 ? userQueries.map((query) => (
    //                 <button onClick={() => scrollQueryToView(query.dataset.messageId)} key={query.dataset.messageId} className="hover:bg-gray-800 border-t border-white-800" data-id={query.dataset.messageId}>
    //                     <div className="border-solid text-sm p-2">{truncate(query.innerText)}</div>
    //                 </button>
    //             )) : <p>Can't find any message</p>}
    //         </div>
    //     )
    // }

// function truncate(queryContent: string) {
//     const truncated = queryContent.slice(0, 100)
//     return truncated
// }

// function scrollQueryToView(queryId: string | undefined /*the dataset is typed as DOMStringMap, which has the value: string | undefined*/ ) {
//     const getElement = document.querySelector(`div [data-message-id="${queryId}"]`) //need to change based on url matches
//     console.log(getElement)
//     if (!getElement) console.log('cant find element')
//          else
//     getElement.scrollIntoView({behavior: "smooth", block: 'center'})
// }


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