import { useEffect } from "react"
import { Config, Bookmark } from "../config"
import { truncate } from "../utils"

export function useBookmark(currSite: Config) {

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

    // async function saveChat(query: HTMLElement) {

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

    //         setBookmarked(copyOfBookmark)

    //         console.log(bookmarked)

    //         const updatedChats = Array.from(copyOfBookmark.values())
    //         console.log('updating array')
    //         console.log(updatedChats)
    //         await storage.setItem("sync:SavedChats", updatedChats)
    //     }

    

     getSaveChats()
      }, [])

    const saveChat = useCallback(async (query: HTMLElement) => { //if returning a function from custom hook, wrap in useCallback -> https://react.dev/reference/react/useCallback#optimizing-a-custom-hook
    
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
        
                setBookmarked(copyOfBookmark)
        
                const updatedChats = Array.from(copyOfBookmark.values())
                console.log('updating array')
                console.log(updatedChats)
                await storage.setItem("sync:SavedChats", updatedChats)
            }, [bookmarked]
    
 )      
    return {bookmarked, saveChat}
}