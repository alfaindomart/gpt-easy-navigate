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
                    <div>
                        {userQueries ? userQueries.map((query) => (
                            <div key={query.dataset.messageId} className="flex auto" data-id={query.dataset.messageId}>
                                <div className="border-solid">{truncate(query.innerText)}</div>
                            </div>
                        )) : <p>Can't find any message</p>}
                    </div>
                )
    }

function truncate(queryContent: string) {
    const truncated = queryContent.slice(0, 100)
    return truncated
}

export default OpenMenu