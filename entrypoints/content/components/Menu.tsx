//note to self: codex refactored this component a bit. This is the same logic as your code, mostly just different name.
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { createPortal } from "react-dom";
import { SidebarContent } from "./SidebarContent";
import { BookmarkManager } from "./BookmarkManager";
import { Config, siteConfig } from "../config";
import useClickOutside from "../hooks/clickOutside";
import { TriangleIcon } from "@/assets/CustomIcons";

type TabKey = "conversation" | "bookmarks" | "AI Responses";

function resolveSiteFromHostname(): Config | null {
  const { hostname } = window.location;
  const key = Object.keys(siteConfig).find(
    (siteKey) => siteConfig[siteKey].hostname === hostname
  );
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
    { width: 320, height: 320 } // default matches w-80 h-80
  );
  const [triggerRect, setTriggerRect] = useState<{
    top: number;
    bottom: number;
    left: number;
    right: number;
    width: number;
    height: number;
  } | null>(null);
  const [menuDirection, setMenuDirection] = useState<{
    vertical: "up" | "down";
    horizontal: "left" | "right";
  }>({
    vertical: "down",
    horizontal: "right",
  });

  // Determine if menu should open up/down or left/right based on available viewport space
  const determineMenuDirection = (rect: DOMRect | null) => {
    if (!rect) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const needLeft = rect.left + menuSize.width + 16 > vw;
    const needUp = rect.bottom + menuSize.height + 16 > vh;
    setMenuDirection({
      horizontal: needLeft ? "left" : "right",
      vertical: needUp ? "up" : "down",
    });
  };

  // Update trigger rect and recalculate menu direction
  const updateTriggerRect = (rect: DOMRect) => {
    const normalizedRect = {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      width: rect.width,
      height: rect.height,
    };
    setTriggerRect(normalizedRect);
    determineMenuDirection(rect);
  };

  // Calculate menu style based on trigger rect and direction, then applied to the menu's style
  const menuStyle = {
    width: menuSize.width,
    height: menuSize.height,
    top: triggerRect
      ? menuDirection.vertical === "down"
        ? triggerRect.bottom
        : triggerRect.top - menuSize.height
      : 0,
    left: triggerRect
      ? menuDirection.horizontal === "right"
        ? triggerRect.left
        : triggerRect.right - menuSize.width
      : 0,
  };

  // Refresh site data: current site config and queries
  const refreshSiteData = () => {
    const nextSite = resolveSiteFromHostname();
    setCurrSite(nextSite);

    if (!nextSite) {
      setUserQueries([]);
      return;
    }

    const queries = Array.from(
      document.querySelectorAll<HTMLElement>(nextSite.selectors.userQueries)
    );
    setUserQueries(queries);

    const responses = Array.from(
      document.querySelectorAll<HTMLElement>(
        nextSite.selectors.aiResponses ?? ""
      )
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

    // Set up an observer to track size changes
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

  // Recalculate menu direction when menu size, open state, or trigger rect changes
  useEffect(() => {
    if (!isOpen || !triggerRect) return;
    determineMenuDirection(
      new DOMRect(
        triggerRect.left,
        triggerRect.top,
        triggerRect.width,
        triggerRect.height
      )
    );
  }, [menuSize, isOpen, triggerRect]);

  const tabButtonClasses = (tab: TabKey) =>
    [
      "flex-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
      activeTab === tab
        ? "bg-amber-500/20 text-amber-200"
        : "text-gray-400 hover:bg-white/5 hover:text-gray-200",
    ].join(" ");

  return (
    <>
      <Draggable nodeRef={nodeRef} cancel="div .resize">
        <div
          ref={nodeRef}
          className="absolute left-80 bottom-20 z-50 h-10 w-10"
        >
          <button
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              updateTriggerRect(rect);
              setIsOpen((prev) => {
                const next = !prev;
                if (next) {
                  setActiveTab("conversation");
                }
                return next;
              });
            }}
            className={`triangle-toggle rounded-full ${
              isOpen ? "bg-amber-700" : "bg-[#323061]"
            }  p-2 text-red-500 shadow-lg transition ring-1 ring-cyan-900 hover:bg-gray-800 hover:ring-1 hover:ring-amber-500`}
            aria-expanded={isOpen}
            aria-label="Toggle assistant menu"
            type="button"
          >
            {/* <ChevronRight className={isOpen ? "rotate-90 transition" : "transition"} /> */}
            <div className={isOpen ? "hidden" : "flex flex-col m-1"}>
              <TriangleIcon
                fill="black"
                viewBox="0 0 800 800"
                size="14"
                className="triangle-top"
              />
              <TriangleIcon
                fill="black"
                viewBox="0 0 800 800"
                size="14"
                className="rotate-180 triangle-bottom"
              />
            </div>
          </button>
        </div>
      </Draggable>
      {isOpen && triggerRect && (
        <div
          ref={refMenu}
          style={menuStyle}
          className="resize fixed flex min-h-60 flex-col overflow-hidden rounded-2xl shadow-2xl bg-gray-800 ring-1 ring-black/20 z-50"
        >
          <div className="flex items-center gap-2 border-b border-1 border-white/10 bg-amber-600 px-3 py-2">
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
          <div className="flex-1 overflow-auto p-3 pr-1 bg-gray-900">
            {activeTab === "conversation" ? (
              currSite ? (
                <SidebarContent currSite={currSite} userQueries={userQueries} />
              ) : (
                <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-white/10 bg-cyan-800 p-4 text-center text-sm text-gray-300">
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
    </>
  );
}

export default OpenMenu;
