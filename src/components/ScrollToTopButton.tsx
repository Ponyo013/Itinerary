import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false)

    // Scroll to top with smooth behaviour
    const scrollToTop = () => {
        window.scroll({
            behavior: 'smooth',
            top: 0
        })
    }

    // show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
        <div>
            {isVisible && (
                <a className="bg-[#7b3a3b] shadow-lg hover:bg-[#9c5455] p-2 md:p-3 fixed right-4 lg:right-10 xl:right-12 bottom-7 z-50 rounded-xl" onClick={scrollToTop}>
                    <Icon icon="line-md:chevron-up" className="w-8 h-8" color="white" />
                </a>
            )}
        </div>
    )
}