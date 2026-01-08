import Styles from "../style/Style.module.css"
import { Icon } from "@iconify/react";
import { DOCUMENT_BUTTONS } from "../data/dataDocuments";

export default function Documents() {
    const top = DOCUMENT_BUTTONS.slice(0, 4);
    const bottom = DOCUMENT_BUTTONS.slice(4);

    return (
        <div>
            {/* Heading text */}
            <h1 className={`${Styles.head} text-3xl sm:text-5xl md:text-7xl text-white font-bold text-center mb-8 sm:mb-12`}>Documents</h1>
            
            {/* Tampilan website */}
            <div className="hidden sm:flex flex-col sm:gap-3 lg:gap-5 items-center">
                <div className={`${Styles.body} flex flex-col sm:gap-3 lg:gap-5 items-center`}>
                    {/* Airport Transfer, Attraction, Flights, Hotels */}
                    <div className="flex gap-2 sm:gap-3 lg:gap-4 justify-center">
                        {top.map(({ icon, label, link }) => (
                            <a className="flex gap-2 bg-white sm:px-2 sm:py-2 lg:px-4 lg:py-4 sm:rounded-md md:rounded-lg lg:rounded-xl hover:bg-gray-300" href={link}>
                                <Icon icon={icon} className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" color="740001" />
                                <p className="sm:text-xl md:text-2xl lg:text-3xl text-[#740001]">{label}</p>
                            </a>
                        ))}
                    </div>

                    {/* Personal Info, Trains, Travel Insurance */}
                    <div className="flex gap-2 sm:gap-3 lg:gap-4 justify-center">
                        {bottom.map(({ icon, label, link }) => (
                            <a className="flex gap-2 bg-white sm:px-2 sm:py-2 lg:px-4 lg:py-4 sm:rounded-md md:rounded-lg lg:rounded-xl hover:bg-gray-300" href={link}>
                                <Icon icon={icon} className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" color="740001" />
                                <p className="sm:text-xl md:2xl lg:text-3xl text-[#740001]">{label}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tampilan Mobile */}
            <div className={`${Styles.body} sm:hidden grid grid-cols-3 gap-6`}>
                {DOCUMENT_BUTTONS.map(({ icon, label, link }) => (
                    <a key={label} href={link} className="flex flex-col items-center gap-2">
                        <Icon
                            icon={icon}
                            className="w-12 h-12 bg-white rounded-lg px-2 py-2"
                            color="740001"
                        />
                        <p className="text-base text-white text-center leading-tight">
                            {label.includes(" ")
                                ? label.split(" ").map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                ))
                                : label
                            }
                        </p>
                    </a>
                ))}
            </div>
        </div>
    )
}