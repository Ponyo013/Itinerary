import Styles from "../style/Style.module.css";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import InputField from "./ui/Inputfield";

const RATE_KEY = "last_rate";
const RECENT_KEY = "recent_rates";

export default function Kurs() {
    const [rate, setRate] = useState("");
    const [cny, setCny] = useState("");
    const [idr, setIdr] = useState("");

    const [rateError, setRateError] = useState("");

    const [recentRates, setRecentRates] = useState<number[]>([]);

    // Direction
    const [direction, setDirection] = useState<"CNY-IDR" | "IDR-CNY">("CNY-IDR")

    const cleanNumber = (value: string) => {
        const normalized = value
            .replace(/\./g, "")   // hapus pemisah ribuan
            .replace(",", ".");   // koma 

        return parseFloat(normalized);
    };

    const formatID = (value: number, decimals = 2) =>
        new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: decimals,
        }).format(value);

    // Load storage
    useEffect(() => {
        const savedRate = localStorage.getItem(RATE_KEY);
        const savedRecent = localStorage.getItem(RECENT_KEY);

        if (savedRate) {
            setRate(formatID(Number(savedRate)));
        }

        if (savedRecent) {
            setRecentRates(JSON.parse(savedRecent));
        }
    }, []);

    // Save Rate in local storage
    const saveRate = (value: number) => {
        localStorage.setItem(RATE_KEY, value.toString());

        setRecentRates(prev => {
            const updated = [value, ...prev.filter(r => r !== value)].slice(0, 5);
            localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    // Kurs: 1 CNY = ? IDR
    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawRate = cleanNumber(e.target.value);

        if (!rawRate) {
            setRate("");
            return;
        }

        setRate(formatID(rawRate));
        setRateError("");

        const cnyNum = cleanNumber(cny);
        const idrNum = cleanNumber(idr);

        if (cnyNum) {
            setIdr(formatID(cnyNum * rawRate));
        } else if (idrNum) {
            setCny(formatID(Math.floor(idrNum / rawRate)));
        }
    };

    // Hanya akan tersimpan jika dia keluar dari inputan
    const handleRateBlur = () => {
        const rateNum = cleanNumber(rate);

        if (!rateNum) return;

        saveRate(rateNum);
    };

    // Swap button
    const handleSwap = () => {
        const newDirection = direction === "CNY-IDR" ? "IDR-CNY" : "CNY-IDR";
        setDirection(newDirection);

        const rateNum = cleanNumber(rate);
        if (!rateNum) return;

        if (newDirection === "IDR-CNY") {
            const currentAmount = cleanNumber(cny);
            if (currentAmount) {
                setIdr(formatID(currentAmount, 2));
                setCny(formatID(currentAmount / rateNum, 2));
            }
        } else {
            const currentAmount = cleanNumber(idr);
            if (currentAmount) {
                setCny(formatID(currentAmount, 2));
                setIdr(formatID(currentAmount * rateNum, 2));
            }
        }
    };

    // 2. Simplified Input Handlers to prevent logic loops
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;

        // Hanya ambil angka dan titik desimal
        const sanitized = val.replace(/[^0-9,]/g, "");

        const dotCount = (sanitized.match(/\,/g) || []).length;

        if (dotCount > 1) {
            // kalau ada lebih dari 1 titik, jangan update
            return;
        }

        // Jika input kosong, reset state
        if (!sanitized) {
            setCny("");
            setIdr("");
            setRateError("");
            return;
        }

        // Ubah ke number
        const num = cleanNumber(sanitized);
        const rateNum = cleanNumber(rate);

        if (isNaN(num)) {
            setRateError("Hanya angka yang diperbolehkan");
            return;
        } else {
            setRateError("");
        }

        // Set state berdasarkan direction
        if (direction === "CNY-IDR") {
            setCny(sanitized);
            setIdr(rateNum ? formatID(num * rateNum, 2) : "");
        } else {
            setIdr(formatID(Number(sanitized)));
            setCny(rateNum ? formatID(num / rateNum, 2) : "");
        }
    };

    // 3. Handle conversion menggunakan langsung dari directionnya
    const handleConversionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        // Hanya ambil angka dan titik desimal
        const sanitized = val.replace(/[^0-9,]/g, "");

        const dotCount = (sanitized.match(/\,/g) || []).length;

        if (dotCount > 1) {
            // kalau ada lebih dari 1 titik, jangan update
            return;
        }

        // Jika input kosong, reset state
        if (!sanitized) {
            setCny("");
            setIdr("");
            setRateError("");
            return;
        }

        // Ubah ke number
        const num = cleanNumber(sanitized);
        const rateNum = cleanNumber(rate);

        if (isNaN(num)) {
            setRateError("Hanya angka yang diperbolehkan");
            return;
        } else {
            setRateError("");
        }

        // Set state berdasarkan direction
        if (direction === "CNY-IDR") {
            setIdr(formatID(Number(sanitized)));
            setCny(num && rateNum ? formatID(num / rateNum, 2) : "");
        } else {
            setCny(sanitized);
            setIdr(num && rateNum ? formatID(num * rateNum, 2) : "");
        }
    };

    // Recent change rate
    const handleSelectRecent = (value: number) => {
        setRate(formatID(value));
        saveRate(value);

        const cnyNum = cleanNumber(cny);
        if (cnyNum) {
            setIdr(formatID(cnyNum * value));
        }
    };

    return (
        <div>
            <h1 className={`${Styles.head} text-3xl sm:text-5xl md:text-7xl text-white font-bold mb-6 sm:mb-12 text-center`}>Kurs</h1>

            <div className="bg-white rounded-xl p-5 sm:p-8 flex flex-col mx-10 sm:mx-0 gap-6 md:w-lg">
                {/* Kurs */}
                <InputField
                    label="1 CNY = ? IDR"
                    country="CN"
                    value={rate}
                    onChange={handleRateChange}
                    onBlur={handleRateBlur}
                    placeholder="2.200"
                />

                {/* Amount */}
                <InputField
                    label="Amount"
                    value={direction === "CNY-IDR" ? cny : idr}
                    inputMode="text"
                    onChange={handleAmountChange}
                    country={direction === "CNY-IDR" ? "CN" : "ID"}
                />

                {/* error Message */}
                {rateError && (
                    <p className="text-sm text-red-600 -mt-3">
                        {rateError}
                    </p>
                )}

                {/* Recent Rates */}
                {recentRates.length > 0 && (
                    <div className="flex gap-2 flex-wrap text-sm">
                        {recentRates.map((r, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelectRecent(r)}
                                className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
                            >
                                {formatID(r)}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex justify-center">
                    <Icon
                        icon="hugeicons:arrow-up-down"
                        className="w-10 h-10 text-white bg-[#740001] rounded-full p-2 hover:grayscale-25 cursor-pointer"
                        onClick={handleSwap}
                    />
                </div>

                {/* IDR */}
                <InputField
                    label="Conversion"
                    value={direction === "CNY-IDR" ? idr : cny}
                    inputMode="text"
                    onChange={handleConversionChange}
                    country={direction === "CNY-IDR" ? "ID" : "CN"}
                />
            </div>
        </div>
    );
}
