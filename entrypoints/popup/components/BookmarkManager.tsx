import {useState, useEffect} from "react";
import { Bookmark } from "@/entrypoints/content/config";
import { Trash2 } from "lucide-react";

export const BookmarkManager = () => {
    const [bookmarks, setBookmarks] = useState([] as Array<Bookmark>);

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

        return (
        <div>
            {bookmarks.map((bookmark) => (
                <div>
                    <div key={bookmark.key} className="p-2 m-2 border border-gray-600 rounded-lg">
                        <p className="text-sm text-gray-300">Saved on: {bookmark.timeStamp}</p>
                        <p className="text-md text-white">{bookmark.previewChat}</p>
                        <a href={bookmark.chatUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Go to chat</a>
                    </div>
                    <button><Trash2/></button>
                </div>
            ))}
        </div>
        )
}
