import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { SidebarContent } from "./SidebarContent";
import { Config, siteConfig } from "../config";

function OpenMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [currSite, setCurrSite] = useState<Config|null>(null)
    const [userQueries, setUserQueries] = useState<HTMLElement[]>([])


    const fetchQueries = (queriesSelector: string | undefined) => {
            
            if (!queriesSelector) {
                console.log('param queriesSelector missing')
                return
            }
            console.log('getting user queries......')
            console.log(currSite?.selectors.userQueries)
            const queries = [...document.querySelectorAll(`${currSite?.selectors.userQueries}`)] as HTMLElement[]

            console.log(queries)
            
            setUserQueries(queries)

            console.log(userQueries)
        }


    useEffect(() => {
            const currHostname = window.location.hostname

            const key = Object.keys(siteConfig).find(key => siteConfig[key].hostname === currHostname)

            if (!key) return

            console.log(key) //output: the key of sitesConfig

            console.log(siteConfig[key])

            setCurrSite(siteConfig[key])
            console.log(currSite)
            fetchQueries(currSite?.selectors.userQueries)
    }, [isOpen])

    // observeNewQuery()


    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <ChevronRight className="rotate-90" /> : <ChevronRight />}
            </button>
            <div className="h-height flex-col">
                {isOpen && (
                    <div style={{backgroundColor: 'var(--bg-elevated-secondary)'}} className="w-64">
                        <SidebarContent currSite={currSite} userQueries={userQueries}/>
                    </div>
                )}
            </div>
        </>
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