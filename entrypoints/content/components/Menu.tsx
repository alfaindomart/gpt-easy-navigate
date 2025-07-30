import { useState } from "react";
import { ChevronRight } from "lucide-react";
import background from "@/entrypoints/background";

function OpenMenu() {
    const [isOpen, setIsOpen] = useState(false)


    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <ChevronRight className="rotate-90" /> : <ChevronRight />}
            </button>
            <div className="h-height flex-col">
                {isOpen && (
    
                    <div style={{backgroundColor: 'var(--bg-elevated-secondary)'}} className="w-64">
                        <SidebarContent />
                    </div>
                )}
            </div>
        </>
    )
}

    function SidebarContent() {
                const userQueries = [...document.querySelectorAll("[data-message-author-role='user']")] as HTMLElement[]
                console.log(userQueries[0].dataset.messageId)
                const testTrunc = userQueries.map((query) => truncate(query.innerText))

                console.log(testTrunc)
                
                
                return (
                    <div className="h-80 overflow-auto flex flex-col">
                        {userQueries && userQueries.length > 0 ? userQueries.map((query) => (
                            <button onClick={() => scrollQueryToView(query.dataset.messageId)} key={query.dataset.messageId} className="hover:bg-gray-800 border-t border-white-800" data-id={query.dataset.messageId}>
                                <div className="border-solid text-sm p-2">{truncate(query.innerText)}</div>
                            </button>
                        )) : <p>Can't find any message</p>}
                    </div>
                )
    }

function truncate(queryContent: string) {
    const truncated = queryContent.slice(0, 100)
    return truncated
}

function scrollQueryToView(queryId: string | undefined /*the dataset is typed as DOMStringMap, which has the value: string | undefined*/ ) {
    const getElement = document.querySelector(`[data-message-id=${queryId}]`)
    !getElement ? console.log('the elemen is not found') :
    console.log(getElement)
    getElement?.scrollIntoView()
}

export default OpenMenu