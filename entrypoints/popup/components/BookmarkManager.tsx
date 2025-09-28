import {useState, useEffect} from "react";
import { Bookmark, GroupedBookmarks } from "@/entrypoints/content/config";
import { Key, Trash2 } from "lucide-react";



export const BookmarkManager = () => {
    const [bookmarks, setBookmarks] = useState([] as Array<Bookmark>);
    const [activeSite, setActiveSite] = useState('');
    const [activeTitle, setActiveTitle] = useState('');



    useEffect(() => {
        try {
                const fetchBookmarks = async () => {
                console.log('fetching bookmarks from storage...');
                const SavedChats = await storage.getItem<Array<Bookmark>>('sync:SavedChats') || [] //'sync:SavedChats' !== 'sync: SavedChats', is space sensitive!
                setBookmarks(SavedChats);
               }
               fetchBookmarks()
            } catch(err) {
                console.log('no bookmarks found', err);
            }
            
    }, [])


    const nestedBookmarks = useMemo(() => {
        return bookmarks.reduce((acc, bookmark) => {
            let siteName = 'Other';
            
            if (bookmark.chatUrl.includes('gemini')) {
                siteName = 'Gemini'
            }
            if (bookmark.chatUrl.includes('chatgpt')) {
                siteName = 'ChatGPT'
            }
            if (!acc[siteName]) {
                acc[siteName] = {};
            }
            if (!acc[siteName][bookmark.title]) {
                acc[siteName][bookmark.title] = []
            };
            acc[siteName][bookmark.title].push(bookmark);
            return acc;
            }, {} as GroupedBookmarks)
        }
    , [bookmarks]);
        
        return (
            <div>
                {Object.keys(nestedBookmarks).map(siteName => (
                    <div key={siteName}>
                        <h2 onClick={() => setActiveSite(activeSite === siteName ? '' : siteName)} className="cursor-pointer text-xl font-bold my-2">{siteName}</h2>
                            {activeSite === siteName && (
                                <div>
                                    {Object.keys(nestedBookmarks[siteName]).map(title => (
                                        <div key={title}>
                                            <h3 onClick={() => setActiveTitle(activeTitle === title ? '' : title)}>
                                            {title} ({nestedBookmarks[siteName][title].length} bookmarks)
                                            </h3>
                                            {activeTitle === title && (
                                                <div>
                                                    {nestedBookmarks[siteName][title].map(bookmark => (
                                                        <div key={bookmark.key}>
                                                            <p>{bookmark.previewChat}</p>
                                                            <a href={bookmark.chatUrl} target="_blank" rel="noopener noreferrer">Go to chat</a>
                                                            <button><Trash2 /></button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>
                ))}
            </div>
        )
}
