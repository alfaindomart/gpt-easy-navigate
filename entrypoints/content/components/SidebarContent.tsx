import { useState, useMemo } from "react"
import { truncate, sortFilter} from "../utils"
import { Config, Bookmark} from "../config"
import { Star } from "lucide-react"
import { storage } from "wxt/utils/storage"
import Sort from "./Sort"
import { useSortFilter } from "../hooks/useSortFilter"
import { useBookmark } from "../hooks/useBookmark"

interface Prop {
    currSite: Config | null
    userQueries: HTMLElement[]
}

export function SidebarContent ({currSite, userQueries}: Prop) {

    console.time('SidebarContent')

    if (!currSite) {
        console.log('cant get current site config')
        return
    }

    // const [bookmarked, setBookmarked] = useState(new Map())
    const [keywords, setKeywords] = useState("")
    // const [filteredQueries, setFiltered] = useState(userQueries)
    const [options, setOptions] = useState({
        filterSaved: false,
        sortFromNew: false 
    })

    const bookmarked = useBookmark(currSite)

    const displayedQueries = useSortFilter(
        userQueries, keywords, options.filterSaved, options.sortFromNew,
        bookmarked.bookmarked, currSite
    )
    
    //    const getSaveChats = async () => {//get SavedChats from sync storage after rendering for the first time

    //     try {
    //         const SavedChats = await storage.getItem<Array<Bookmark>>('sync:SavedChats') || [] //'sync:SavedChats' !== 'sync: SavedChats', is space sensitive!

    //         if (!SavedChats) {
    //             console.log('cant get SavedChats')
    //             return
    //         }
            
    //         console.log('getSaveChats running...')

    //         console.log(SavedChats)

    //         const mappedChats = new Map(SavedChats.map(savedChat => [savedChat.key, savedChat])) //change the SavedChats Array into a Map

    //         setBookmarked(mappedChats)

    //         console.log(mappedChats)

    //         console.log('getSaveChatss ending...')

    //     } catch(err) {
    //         console.log(err)
    //     }

    //     }

    //     getSaveChats()
    // }, [])
     
    //    async function saveChat(query: HTMLElement) {

    //         const newSave: Bookmark = {
    //             key: currSite?.selectors.helper(query),
    //             chatUrl: window.location.href,
    //             previewChat: truncate(query.innerText),
    //             timeStamp: Date.now()
    //         }

    //         const copyOfBookmark = new Map(bookmarked)  

    //         if (copyOfBookmark.has(newSave.key)) {
    //             console.log('the chat already exist, removing...')
    //             copyOfBookmark.delete(newSave.key)
    //         } else {
    //             console.log('setting new key')
    //             copyOfBookmark.set(newSave.key, newSave)
    //         }

    //         console.log(copyOfBookmark)

    //         setBookmarked(copyOfBookmark)

    //         console.log(bookmarked)

    //         const updatedChats = Array.from(copyOfBookmark.values())
    //         console.log('updating array')
    //         console.log(updatedChats)
    //         await storage.setItem("sync:SavedChats", updatedChats)
    //     }

        // const filtered = (keywords === '') ? userQueries : userQueries.filter((query) => query.innerText.toLowerCase().includes(keywords.toLowerCase()))


        
        switch (currSite?.name) {
            case 'ChatGPT' : return (
                //CHATGPT
                <div>
                    <div>
                        <input type="text" value={keywords} onChange={(e) => {setKeywords(e.target.value); console.log(keywords); console.log(displayedQueries)}} placeholder="search here"/>
                    </div>
                    <div>
                        <Sort options={options} setOptions={setOptions}/>
                    </div>
                    <div>
                        {displayedQueries && displayedQueries.length > 0 ? displayedQueries.map((query) => (
                            <div key={currSite.selectors.helper(query)} className="flex">
                                <button onClick={() => query.scrollIntoView()} className="hover:bg-gray-800 border-t border-white-800" data-id={currSite.selectors.helper(query)}>
                                    <div className="border-solid text-sm text-white p-2">{truncate(query.innerText)}</div>
                                </button>
                                <button onClick={() => bookmarked.saveChat(query)}>
                                    {bookmarked.bookmarked.has(currSite.selectors.helper(query)) ? 
                                        <Star size={18} color="yellow" fill="yellow"/> :
                                        <Star size={18} color="yellow"/>
                                }
                                </button>
                            </div>
                        )) : <p>Can't find any message</p>}
                    </div>
                </div>
            );

            case 'Gemini': return (
                //GEMINI
            <div className="h-80 overflow-auto flex flex-col">
                {userQueries && userQueries.length > 0 ? userQueries.map((query) => (
                    <div className="flex flex-auto" key={currSite.selectors.helper(query)} data-id={currSite.selectors.helper(query)}>
                        <button onClick={() => query.scrollIntoView()} key={query.id} className="hover:bg-gray-800 border-t border-white-800">
                            <div className="border-solid text-sm p-2 truncate">{query.innerText}</div>
                        </button>
                        <button onClick={() => bookmarked.saveChat(query)}>
                            {bookmarked.bookmarked.has(currSite.selectors.helper(query)) ? 
                                    <Star size={18} fill="yellow"/> :
                                    <Star size={18}/>
                            }
                        </button>
                    </div>
                )) : <p>Can't find any message</p>}
            </div>
        )
        }

        console.timeEnd('SidebarContent')

    }