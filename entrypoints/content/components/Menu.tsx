//note to self: codex refactored this component a bit. This is the same logic as your code, mostly just different name.
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { SidebarContent } from "./SidebarContent";
import { BookmarkManager } from "./BookmarkManager";
import { Config, siteConfig } from "../config";
import useClickOutside from "../hooks/clickOutside";
import { TriangleIcon } from "@/assets/CustomIcons";

type TabKey = "conversation" | "bookmarks" | "AI Responses";


function resolveSiteFromHostname(): Config | null {
  const { hostname } = window.location;
  const key = Object.keys(siteConfig).find((siteKey) => siteConfig[siteKey].hostname === hostname);
  return key ? siteConfig[key] : null;
}

function OpenMenu() {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const refMenu = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("conversation");
  const [currSite, setCurrSite] = useState<Config | null>(null);
  const [userQueries, setUserQueries] = useState<HTMLElement[]>([]);
  const [aiResponses, setAIResponses] = useState<HTMLElement[]>([]);
  const [menuSize, setMenuSize] = useState<{ width: number; height: number }>(
    { width: 320, height: 320 }, // default matches w-80 h-80
  );
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 100, y: 100 });
  const [menuDirection, setMenuDirection] = useState<{vertical: "up" | "down", horizontal: "left" | "right"}>({vertical: "down", horizontal: "right"})

  const refreshSiteData = () => {
    const nextSite = resolveSiteFromHostname();
    setCurrSite(nextSite);

    if (!nextSite) {
      setUserQueries([]);
      return;
    }

    const queries = Array.from(
      document.querySelectorAll<HTMLElement>(nextSite.selectors.userQueries),
    );
    setUserQueries(queries);

    const responses = Array.from(
      document.querySelectorAll<HTMLElement>(nextSite.selectors.aiResponses ?? ""),
    );
    setAIResponses(responses);
  };

  useEffect(() => {
    //refresh site data on first load
    refreshSiteData();
  }, []);

  useEffect(() => {
    //refresh site data when menu is opened
    if (!isOpen) return;
    refreshSiteData();
    console.log()
    
  }, [isOpen]);

  useClickOutside(refMenu, () => setIsOpen(false));

  // Track size changes of the resizable menu so width/height persist across close/open
  useEffect(() => {
    if (!isOpen) return; // only observe when mounted
    const el = refMenu.current;
    if (!el) return;
    // Apply the last known size immediately
    el.style.width = `${menuSize.width}px`;
    el.style.height = `${menuSize.height}px`;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setMenuSize({ width: Math.round(width), height: Math.round(height) });
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
    };
  }, [isOpen]);

  const tabButtonClasses = (tab: TabKey) =>
    [
      "flex-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
      activeTab === tab
        ? "bg-amber-500/20 text-amber-200"
        : "text-gray-400 hover:bg-white/5 hover:text-gray-200",
    ].join(" ");

  return (
    <Draggable nodeRef={nodeRef} cancel="div .resize">
      <div ref={nodeRef} className="absolute left-80 bottom-20 z-50 h-10 w-10">
        <button onClick={(e) => 
                  { const rect = e.currentTarget.getBoundingClientRect()
                    setMenuPosition({x: rect.x, y: rect.y})
                     setIsOpen((prev) => {
                      const next = !prev;
                        if (next) {
                          setActiveTab("conversation");
                        }
                      return next;
                      })
}
          }
          className={`triangle-toggle rounded-full ${isOpen? "bg-amber-700": "bg-gray-900/80"}  p-2 text-red-500 shadow-lg transition hover:bg-gray-800`}
          aria-expanded={isOpen}
          aria-label="Toggle assistant menu"
          type="button"
        >
          {/* <ChevronRight className={isOpen ? "rotate-90 transition" : "transition"} /> */}
          <div className={isOpen ? "hidden" : "flex flex-col m-1"}>
            <TriangleIcon fill="black" viewBox="0 0 800 800" size="14" className="triangle-top"/>
            <TriangleIcon fill="black" viewBox="0 0 800 800" size="14" className="rotate-180 triangle-bottom"/>
          </div>
        </button>
        {isOpen && (
          <div
            ref={refMenu}
            style={{ width: menuSize.width, height: menuSize.height }}
            className="resize m-3 flex min-h-60 min-w-48 max-h-120 max-w-120 flex-col overflow-hidden rounded-2xl bg-gray-950/95 ring-1 ring-white/10 backdrop-blur"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-gray-900/70 px-3 py-2">
              <button
                type="button"
                className={tabButtonClasses("conversation")}
                onClick={() => setActiveTab("conversation")}
              >
                Conversations ({userQueries.length})
              </button>
              <button
                type="button"
                className={tabButtonClasses("bookmarks")}
                onClick={() => setActiveTab("bookmarks")}
              >
                Bookmarks
              </button>
              <button
                type="button"
                className={tabButtonClasses("AI Responses")}
                onClick={() => {
                  setActiveTab("AI Responses");
                  console.log(aiResponses[0].innerText);
                }}
              >
                AI Responses ({aiResponses.length})
              </button>
            </div>
            <div className="flex-1 overflow-auto p-3 pr-1">
              {activeTab === "conversation" ? (
                currSite ? (
                  <SidebarContent currSite={currSite} userQueries={userQueries} />
                ) : (
                  <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/5 p-4 text-center text-sm text-gray-300">
                    This site is not supported yet.
                  </div>
                )
              ) : activeTab === "bookmarks" ? (
                <BookmarkManager isActive={activeTab === "bookmarks"} />
              ) : (
                <SidebarContent currSite={currSite} userQueries={aiResponses} />
              )}
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default OpenMenu;
