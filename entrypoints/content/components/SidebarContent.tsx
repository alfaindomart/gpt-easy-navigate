import { useState } from "react";
import { Star } from "lucide-react";
import Sort from "./Sort";
import { useSortFilter } from "../hooks/useSortFilter";
import { useBookmark } from "../hooks/useBookmark";
import type { Config } from "../config";
import { ChevronDown } from "lucide-react";
import { truncate } from "../utils";

interface Prop {
  currSite: Config | null;
  userQueries: HTMLElement[];
}

export function SidebarContent({ currSite, userQueries }: Prop) {
  if (!currSite) {
    console.log("cant get current site config");
    return null;
  }

  const [expandedChat, setExpandedChat] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [options, setOptions] = useState({
    filterSaved: false,
    sortFromNew: false,
  });

  // const toggleExpanded = useCallback(() => {
  //     setExpandedChat((prev) => {

  //     })
  // })

  const bookmarked = useBookmark(currSite);

  const displayedQueries = useSortFilter(
    userQueries,
    keywords,
    options.filterSaved,
    options.sortFromNew,
    bookmarked.bookmarked,
    currSite
  );

  const queriesToRender = displayedQueries ?? [];

  return (
    <div className="flex h-full w-full flex-col text-white resize">
      <div className="flex items-center gap-2 pb-3">
        <input
          className="min-w-0 flex-1 rounded-md border border-amber-50/40 bg-transparent px-2 py-1 text-sm placeholder:text-gray-400 focus:border-amber-200 focus:outline-none focus:ring-1 focus:ring-amber-200"
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Type to search..."
        />
        <div className="ml-auto">
          <Sort options={options} setOptions={setOptions} />
        </div>
      </div>
      <div className="flex-1 m-2 overflow-y-auto overflow-x-hidden space-y-2 pr-2 scrollbar-corner-amber-600 scrollbar-thumb-amber-500 scrollbar-thin scrollbar-track-amber-900">
        {queriesToRender.length > 0 ? (
          queriesToRender.map((query) => {
            const queryKey = currSite.selectors.helper(query);
            const isBookmarked = bookmarked.bookmarked.has(queryKey);

            return (
              <div
                key={queryKey}
                className="group flex items-start gap-3 rounded-md border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10"
                data-id={queryKey}
              >
                <div className="flex-1 mr-5 flex">
                  <button className="peer mr-2 hover:outline-amber-50 hover:outline-1 hover:outline-offset-1 focus:outline-1 focus:outline-offset-1">
                    <ChevronDown size={14} />
                  </button>
                  <button
                    type="button"
                    className="flex-1 w-full bg-transparent text-left line-clamp-2 break-words text-sm text-white transition-all whitespace-pre-wrap focus:outline-none peer-focus:line-clamp-none"
                    onClick={() =>
                      query.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      })
                    }
                  >
                    {query.textContent.length > 5000
                      ? truncate(query.textContent) + "..."
                      : query.textContent}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => bookmarked.saveChat(query)}
                  className="ml-auto flex-shrink-0 rounded-md p-1.5 transition-colors hover:bg-white/10"
                  aria-label={
                    isBookmarked ? "Remove bookmark" : "Save bookmark"
                  }
                >
                  {isBookmarked ? (
                    <Star size={20} color="#FACC15" fill="#FACC15" />
                  ) : (
                    <Star size={20} color="#E5E7EB" />
                  )}
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-300">Can't find any message</p>
        )}
      </div>
    </div>
  );
}
