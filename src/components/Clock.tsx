import { useEffect, useState } from "react";
import styles from "../style/Style.module.css"
import chinaFlag from "../assets/China (CN).svg"
import indonesiFlag from "../assets/Indonesia (ID).svg"

type ClockProps = {
    country: "ID" | "CN";
};

export default function Clock({ country }: ClockProps) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timeZone = country === "ID" ? "Asia/Jakarta" : "Asia/Shanghai";
    const flag = country === "ID" ? indonesiFlag : chinaFlag;
    const timeState = country === "ID" ? "WIB" : "GMT+8"

    const time = new Intl.DateTimeFormat("en-us", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone,
    }).format(now);

    const date = new Intl.DateTimeFormat("en-us", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone,
    }).format(now);

    return (
        <div className={`${styles.clock} mx-10 sm:mx-0 rounded-2xl px-5 md:px-7 lg:px-8 py-3 md:py-4 lg:py-5`}>
            <div className="flex justify-between mb-10">
                <p className="text-2xl sm:text-2xl md:text-4xl font-bold">{country}</p>
                <img src={flag} alt="flag country" />
            </div>

            <div className="flex flex-col sm:gap-1 md:gap-3">
                <p className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">{time}</p>
                <p className="text-lg sm:text-lg md:text-xl lg:text-3xl opacity-60 font-light">{date} ({timeState})</p>
                <p></p>
            </div>

        </div>
    );
}
