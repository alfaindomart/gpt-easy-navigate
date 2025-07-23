import { useState } from "react";
import { ChevronRight } from "lucide-react";

function OpenMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronRight className="rotate-90" /> : <ChevronRight />}
        </button>
    )
}

export default OpenMenu