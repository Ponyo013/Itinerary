import { useEffect, useState } from "react";
import styles from "../style/Style.module.css";

type CountdownProps = {
    targetDate: string;
};

type TimeParts = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export default function Countdown({ targetDate }: CountdownProps) {
    const getRemainingSeconds = (): number => {
        const now = new Date();
        const target = new Date(targetDate);
        return Math.max(
            0,
            Math.floor((target.getTime() - now.getTime()) / 1000)
        );
    };

    const [time, setTime] = useState<number>(getRemainingSeconds());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getTimeParts = (seconds: number): TimeParts => ({
        days: Math.floor(seconds / 86400),
        hours: Math.floor((seconds % 86400) / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
        seconds: seconds % 60,
    });

    const { days, hours, minutes, seconds } = getTimeParts(time);

    const pad = (n: number) => String(n).padStart(2, "0");

    const timeUnits = [
        { label: "Days", value: days },
        { label: "Hours", value: hours },
        { label: "Minutes", value: minutes },
        { label: "Seconds", value: seconds },
    ]

    return (
        <div className={`${styles.countdown} flex`}>
            {timeUnits.map(({ label, value }, index) => (
                <div key={label} className="flex items-center">
                    <div className="flex flex-col gap-4 items-center">
                        <p className="text-9xl font-normal">{pad(value)}</p>
                        <p className="text-3xl font-bold opacity-50">{label}</p>
                    </div>

                    {index !== timeUnits.length - 1 && (
                        <div className="mx-20 w-0.5 h-17.5 bg-gray-300" />
                    )}
                </div>
            ))}
        </div>
    );
}
