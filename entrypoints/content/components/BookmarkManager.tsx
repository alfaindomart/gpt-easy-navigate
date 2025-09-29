//note to self: a lot of this component has been rewritten by codex

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, ExternalLink, Trash2 } from "lucide-react";
import type { Bookmark, GroupedBookmarks } from "../config";

interface BookmarkManagerProps {
    isActive: boolean;
}

const FALLBACK_SITE = "Other";
const UNTITLED_CHAT = "Untitled conversation";

export function BookmarkManager({ isActive }: BookmarkManagerProps) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [expandedSite, setExpandedSite] = useState<string | null>(null);
    const [expandedTitles, setExpandedTitles] = useState<Set<string>>(new Set());

    const fetchBookmarks = useCallback(async () => {
        try {
            const stored = (await storage.getItem<Bookmark[]>("sync:SavedChats")) ?? [];
            setBookmarks(stored);
        } catch (error) {
            console.error("Failed to load bookmarks", error);
        }
    }, []);

    useEffect(() => {
        if (!isActive) return;
        fetchBookmarks();
    }, [isActive, fetchBookmarks]);

    const grouped = useMemo(() => {
        return bookmarks.reduce((acc, bookmark) => {
            const siteName = bookmark.chatUrl.includes("gemini")
                ? "Gemini"
                : bookmark.chatUrl.includes("chatgpt")
                    ? "ChatGPT"
                    : FALLBACK_SITE;

            const titleKey = bookmark.title?.trim() || UNTITLED_CHAT;

            if (!acc[siteName]) {
                acc[siteName] = {};
            }

            if (!acc[siteName][titleKey]) {
                acc[siteName][titleKey] = [];
            }

            acc[siteName][titleKey].push(bookmark);
            return acc;
        }, {} as GroupedBookmarks);
    }, [bookmarks]);

    const totalCount = bookmarks.length;

    const toggleSite = useCallback((siteName: string) => {
        setExpandedSite((prev) => (prev === siteName ? null : siteName));
    }, []);

    const toggleTitle = useCallback((siteName: string, title: string) => {
        const key = `${siteName}:::${title}`;
        setExpandedTitles((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    }, []);

    const handleDelete = useCallback((bookmarkKey: Bookmark["key"]) => {
        if (!bookmarkKey) return;

        setBookmarks((prev) => {
            const next = prev.filter((bookmark) => bookmark.key !== bookmarkKey);
            storage.setItem("sync:SavedChats", next).catch((error) => {
                console.error("Failed to remove bookmark", error);
            });
            return next;
        });
    }, []);

    if (!totalCount) {
        return (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/5 p-6 text-center text-sm text-gray-300">
                <p>No bookmarks yet. Save a chat from the conversation tab to see it here.</p>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col gap-2 text-sm text-white">
            <div className="text-xs uppercase tracking-wide text-gray-400">
                {totalCount} saved {totalCount === 1 ? "conversation" : "conversations"}
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {Object.entries(grouped).map(([siteName, titles]) => {
                    const siteCount = Object.values(titles).reduce(
                        (sum, items) => sum + items.length,
                        0,
                    );
                    const isSiteExpanded = expandedSite === siteName;

                    return (
                        <div key={siteName} className="rounded-lg border border-white/10 bg-white/5">
                            <button
                                type="button"
                                onClick={() => toggleSite(siteName)}
                                className="flex w-full items-center gap-2 px-3 py-2 text-left font-medium text-gray-200 transition hover:bg-white/10"
                            >
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${isSiteExpanded ? "rotate-180" : ""}`}
                                />
                                <span>{siteName}</span>
                                <span className="ml-auto text-xs text-gray-400">{siteCount}</span>
                            </button>
                            {isSiteExpanded && (
                                <div className="space-y-2 border-t border-white/10 bg-black/10 px-3 py-2">
                                    {Object.entries(titles).map(([title, items]) => {
                                        const titleKey = `${siteName}:::${title}`;
                                        const isTitleExpanded = expandedTitles.has(titleKey);

                                        return (
                                            <div key={title} className="rounded-md border border-white/5 bg-white/5">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleTitle(siteName, title)}
                                                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium text-gray-200 transition hover:bg-white/10"
                                                >
                                                    <ChevronDown
                                                        size={14}
                                                        className={`transition-transform ${
                                                            isTitleExpanded ? "rotate-180" : ""
                                                        }`}
                                                    />
                                                    <span className="flex-1">{title}</span>
                                                    <span className="text-xs text-gray-400">{items.length}</span>
                                                </button>
                                                {isTitleExpanded && (
                                                    <ul className="space-y-2 border-t border-white/10 bg-black/10 px-3 py-2">
                                                        {items.map((bookmark) => (
                                                            <li
                                                                key={bookmark.key ?? `${bookmark.chatUrl}-${bookmark.timeStamp}`}
                                                                className="space-y-2 rounded-md bg-white/5 p-3"
                                                            >
                                                                <p className="text-xs text-gray-300">{bookmark.previewChat}</p>
                                                                <div className="flex items-center gap-2">
                                                                    <a
                                                                        href={bookmark.chatUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="inline-flex items-center gap-1 text-xs text-amber-200 transition hover:text-amber-100"
                                                                    >
                                                                        <ExternalLink size={14} />
                                                                        Open chat
                                                                    </a>
                                                                    <span className="text-xs text-gray-500">
                                                                        {bookmark.timeStamp}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleDelete(bookmark.key)}
                                                                        className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-red-300 transition hover:bg-red-500/20 hover:text-red-200"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
