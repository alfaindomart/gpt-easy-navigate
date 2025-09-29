import { useCallback, useEffect, useState } from "react";
import type { Config, Bookmark } from "../config";
import { truncate } from "../utils";

const UNTITLED_CHAT = "Untitled conversation";

export function useBookmark(currSite: Config) {
    const [bookmarked, setBookmarked] = useState<Map<Bookmark["key"], Bookmark>>(new Map());

    useEffect(() => {
        const getSavedChats = async () => {
            try {
                const savedChats = (await storage.getItem<Array<Bookmark>>("sync:SavedChats")) ?? [];
                const mappedChats = new Map(savedChats.map((savedChat) => [savedChat.key, savedChat]));
                setBookmarked(mappedChats);
            } catch (err) {
                console.log(err);
            }
        };

        getSavedChats();
    }, []);

    const saveChat = useCallback(async (query: HTMLElement) => {
        const createdAt = new Date();
        const key = currSite.selectors.helper(query);

        const newSave: Bookmark = {
            key,
            chatUrl: window.location.href,
            title: currSite.selectors.conversationTitle() ?? UNTITLED_CHAT,
            previewChat: truncate(query.innerText),
            timeStamp: createdAt.toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            }),
        };

        setBookmarked((prev) => {
            const next = new Map(prev);

            if (next.has(newSave.key)) {
                next.delete(newSave.key);
            } else {
                next.set(newSave.key, newSave);
            }

            const updatedChats = Array.from(next.values());
            storage.setItem("sync:SavedChats", updatedChats).catch((error) => {
                console.log(error);
            });

            return next;
        });
    }, [currSite]);

    return { bookmarked, saveChat };
}
