import { scrollQueryToView, truncate } from "../utils"
import { Config, siteConfig } from "../config"

interface Prop {
    currSite: Config | null
    userQueries: HTMLElement[]
}

export function SidebarContent ({currSite, userQueries}: Prop) {

    console.log(userQueries)


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

        //     console.log(siteConfig[key])

        //     setCurrSite(siteConfig[key])
        //     console.log('currSite is ' + currSite)
        //     fetchQueries(currSite?.selectors.userQueries)
        // }, [])        
        
        return (
            <div className="h-80 overflow-auto flex flex-col">
                {userQueries && userQueries.length > 0 ? userQueries.map((query) => (
                    <button onClick={() => scrollQueryToView(query.dataset.messageId)} key={query.dataset.messageId} className="hover:bg-gray-800 border-t border-white-800" data-id={query.dataset.messageId}>
                        <div className="border-solid text-sm p-2">{truncate(query.innerText)}</div>
                    </button>
                )) : <p>Can't find any message</p>}
            </div>
        )
    }