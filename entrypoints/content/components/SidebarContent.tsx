import { useState } from "react"
import { truncate } from "../utils"
import { Config, Bookmark} from "../config"
import { Star } from "lucide-react"

interface Prop {
    currSite: Config | null
    userQueries: HTMLElement[]
}

export function SidebarContent ({currSite, userQueries}: Prop) {

    const [bookmarked, setBookmarked] = useState(false)


    // function scrollQueryToView(queryId: string | undefined /*the dataset is typed as DOMStringMap, which has the value: string | undefined*/ ) {
    //     console.log('i juset changed')
    //     console.log(userQueries[0])
    //     if (!queryId) {
    //         console.log('queryId not received')
    //         return
    //     }
    //     const getElement = currSite?.selectors.userQuery(queryId) //need to change based on url matches
    //     console.log(getElement)
    //     if (!getElement) console.log('cant find element')
    //         else
    //     getElement.scrollIntoView({behavior: "smooth", block: 'center'})
    // }

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
        
       async function saveChat(query: HTMLElement) {
            setBookmarked(true)
            console.log('bookmarked!')
            console.log(query.closest('.conversation-container')?.getAttribute('id'))
            const savedObject: Bookmark = {
                key: currSite?.selectors.helper(query),
                chatUrl: window.location.href,
                previewChat: truncate(query.innerText)

            } 
            console.log(savedObject)
            await browser.storage.sync.set({savedChat: savedObject})
            console.log('saving chat...')




        }
        
        switch (currSite?.name) {
            case 'ChatGPT' : return (
            <div className="h-80 overflow-auto flex flex-col">
                {userQueries && userQueries.length > 0 ? userQueries.map((query) => (
                    <div className="flex flex-auto" key={currSite.selectors.helper(query)}>
                        <button onClick={() => query.scrollIntoView()} className="hover:bg-gray-800 border-t border-white-800" data-id={currSite.selectors.helper(query)}>
                            <div className="border-solid text-sm p-2">{truncate(query.innerText)}</div>
                        </button>
                        <button data-bookmark={saveChat} onClick={() => saveChat(query)}>
                            <Star size={24}/>
                        </button>
                    </div>
                )) : <p>Can't find any message</p>}
            </div>
            );

            case 'Gemini': return (
            <div className="h-80 overflow-auto flex bg-white border-solid border-black-800">
                {userQueries && userQueries.length > 0 ? userQueries.map((query) => (
                    <div className="flex flex-auto" key={currSite.selectors.helper(query)} data-id={currSite.selectors.helper(query)}>
                        <button onClick={() => query.scrollIntoView()} key={query.id} className="hover:bg-gray-800 border-t border-white-800">
                            <div className="border-solid text-sm p-2">{truncate(query.innerText)}</div>
                        </button>
                        <button data-bookmark={saveChat} onClick={() => saveChat(query)}>
                            <Star size={24}/>
                        </button>
                    </div>
                )) : <p>Can't find any message</p>}
            </div>
        )
        }

    }