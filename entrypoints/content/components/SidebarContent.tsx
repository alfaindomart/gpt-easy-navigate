import { useState } from "react"
import { truncate } from "../utils"
import { Config, Bookmark} from "../config"
import { Star } from "lucide-react"
import { storage } from "wxt/utils/storage"

interface Prop {
    currSite: Config | null
    userQueries: HTMLElement[]
}

export function SidebarContent ({currSite, userQueries}: Prop) {

    const [bookmarked, setBookmarked] = useState(new Map())

    useEffect(() => {
       const getSaveChats = async () => {//get SavedChats from sync storage after rendering for the first time

        try {
            const SavedChats = await storage.getItem<Array<Bookmark>>('sync:SavedChats') || [] //'sync:SavedChats' !== 'sync: SavedChats', is space sensitive!

             if (!SavedChats) {
                console.log('cant get SavedChats')
                return
            }
            
            console.log('getSaveChats running...')

            console.log(SavedChats)

            const mappedChats = new Map(SavedChats.map(savedChat => [savedChat.key, savedChat])) //change the SavedChats Array into a Map

            setBookmarked(mappedChats)

            console.log(mappedChats)

            console.log('getSaveChatss ending...')

        } catch(err) {
            console.log(err)
        }

        }

        getSaveChats()
    }, [])


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

            const newSave: Bookmark = {
                key: currSite?.selectors.helper(query),
                chatUrl: window.location.href,
                previewChat: truncate(query.innerText),
                timeStamp: Date.now()
            }

            const copyOfBookmark = new Map(bookmarked)  

            if (copyOfBookmark.has(newSave.key)) {
                console.log('the chat already exist, removing...')
                copyOfBookmark.delete(newSave.key)
            } else {
                console.log('setting new key')
                copyOfBookmark.set(newSave.key, newSave)
            }

            console.log(copyOfBookmark)

            setBookmarked(copyOfBookmark)

            console.log(bookmarked)

            const updatedChats = Array.from(copyOfBookmark.values())
            console.log('updating array')
            console.log(updatedChats)
            await storage.setItem("sync:SavedChats", updatedChats)
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
                            {bookmarked.has(currSite.selectors.helper(query)) ? 
                                 <Star size={24} fill="yellow"/> :
                                 <Star size={24}/>
                        }
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
                            {bookmarked.has(currSite.selectors.helper(query)) ? 
                                    <Star size={24} fill="yellow"/> :
                                    <Star size={24}/>
                            }
                        </button>
                    </div>
                )) : <p>Can't find any message</p>}
            </div>
        )
        }

    }