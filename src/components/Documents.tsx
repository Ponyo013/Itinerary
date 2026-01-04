import Styles from "../style/Style.module.css"
import { Icon } from "@iconify/react";

export default function Documents() {

    const DOCUMENT_BUTTONS = [
        {
            icon: "hugeicons:airport",
            label: "Airport Transfer",
            link: "https://drive.google.com/drive/folders/18b9PI7roqc16IVsdIPzPX5xNMYPtiO58?usp=sharing"
        },
        {
            icon: "material-symbols-light:attractions-outline-rounded",
            label: "Attraction",
            link: "https://drive.google.com/drive/folders/1MYQsuZ-uvnT4E4J63dWLG8FFszJcG_4C?usp=sharing"
        },
        {
            icon: "carbon:flight-roster",
            label: "Flights",
            link: "https://drive.google.com/drive/folders/1te6p5Iw1IoT7OaneKKr48Jqv-7uZEac7?usp=sharing"
        },
        {
            icon: "material-symbols-light:flights-and-hotels",
            label: "Hotels",
            link: "https://drive.google.com/drive/folders/1-mpEFktQ9PN0zANEJhuI79sgty4UrQgj?usp=sharing"
        },
        {
            icon: "tdesign:personal-information",
            label: "Personal Information",
            link: "https://drive.google.com/drive/folders/11BWYClPGvJe_1t7qGxKDSbpUdLHyQRH9?usp=sharing"
        },
        {
            icon: "material-symbols-light:train",
            label: "Trains",
            link: "https://drive.google.com/drive/folders/1N0tFfUigayjbVh0cjH2EcFyZyNZdk5bp?usp=sharing"
        },
        {
            icon: "streamline:insurance-hand",
            label: "Travel Insurance",
            link: "https://drive.google.com/drive/folders/1jKtljdG66suoEE6TZlQ1ACALAp_nftyZ?usp=sharing"
        },
    ];

    const top = DOCUMENT_BUTTONS.slice(0, 4);
    const bottom = DOCUMENT_BUTTONS.slice(4);

    return (
        <div>
            <h1 className={`${Styles.head} text-7xl text-white font-bold mb-12 text-center`}>Documents</h1>

            <div className={`${Styles.body} flex flex-col gap-5 items-center`}>
                <div className="flex gap-4 justify-items-center">
                    {top.map(({ icon, label, link }) => (
                        <a className="flex gap-2 bg-white px-4 py-4 rounded-xl hover:bg-gray-300" href={link}>
                            <Icon icon={icon} width={38} height={38} color="740001" />
                            <p className="text-3xl text-[#740001]">{label}</p>
                        </a>
                    ))}
                </div>
                <div className="flex gap-4 justify-items-center">
                    {bottom.map(({ icon, label, link }) => (
                        <a className="flex gap-2 bg-white px-4 py-4 rounded-xl hover:bg-gray-300" href={link}>
                            <Icon icon={icon} width={38} height={38} color="740001" />
                            <p className="text-3xl text-[#740001]">{label}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}