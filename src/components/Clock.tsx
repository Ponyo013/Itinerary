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
        <div className={`${styles.clock} flex flex-col gap-10 rounded-2xl px-10 py-5`}>
            <div className="flex justify-between">
                <p className="text-4xl font-bold">{country}</p>
                <img src={flag} alt="flag country" />
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-7xl font-bold">{time}</p>
                <p className="text-3xl opacity-60 font-light">{date} ({timeState})</p>
                <p></p>
            </div>

        </div>
    );
}
