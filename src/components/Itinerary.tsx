import Styles from "../style/Style.module.css"
import { useEffect, useState, useRef } from "react"

type ItineraryItem = {
    "Tanggal": string;
    "Hari": string;
    "Waktu": string;
    "Kegiatan": string;
    "Lokasi / Catatan": string;
};

export default function Itinerary() {
    let globalIndex = 0

    const [data, setData] = useState<ItineraryItem[]>([])

    const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [containerHeights, setContainerHeights] = useState<number[]>([]);

    useEffect(() => {
        const url = "https://script.google.com/macros/s/AKfycbyNC1kyP-4tT8dgGUZnuknEeGzHV5mZwl2X1MIOUL_3E_wcVYCO9l6joIRlQTuo4anW/exec?ts=" + new Date().getTime();

        const fetchData = () => {
            fetch(url)
                .then(res => res.json())
                .then((json: ItineraryItem[]) => setData(json))
                .catch(err => console.error("Fetch error:", err));
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const formatTanggal = (iso: string) => {
        return new Date(iso).toLocaleDateString("en-us", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    }

    const groupByFormattedDate = (items: ItineraryItem[]) => {
        let lastValidDate = "";

        return items.reduce<Record<string, ItineraryItem[]>>((acc, item) => {
            const dateKey = item["Tanggal"] ? formatTanggal(item["Tanggal"]) : lastValidDate;

            if (!dateKey) return acc;

            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push({
                ...item,
                "Lokasi / Catatan": item["Lokasi / Catatan"] || "-"
            });

            if (item["Tanggal"]) lastValidDate = dateKey;

            return acc;
        }, {});
    };

    const groupedData = groupByFormattedDate(data);

    // Calculate lines
    useEffect(() => {
        const heights = containerRefs.current.map(el => el?.offsetHeight ?? 0);
        setContainerHeights(heights);
    }, [groupedData]);

    return (
        <div>
            {/* List Itinerary */}
            <h1 className={`${Styles.head} text-3xl sm:text-5xl md:text-7xl text-white font-bold mb-6 sm:mb-12 text-center`}>Itinerary</h1>
            <div className={`${Styles.body} flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 mx-10 sm:mx-18 md:mx-24 lg:mx-36 xl:mx-64 mb-24`}>
                {Object.entries(groupedData).map(([date, items], index) => (
                    <div key={date} className="flex flex-col bg-white rounded-xl p-5 md:p-8 lg:p-10 gap-4">
                        <div className="flex flex-col md:gap-1 lg:gap-2 font-bold text-[#740001]">
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">Day {index + 1}</h1>
                            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl opacity-60">{date}</h2>
                        </div>

                        {items.map((item, i) => {
                            const currentIndex = globalIndex++;

                            return (
                                <div key={currentIndex} ref={el => { containerRefs.current[currentIndex] = el }} className="flex items-start wrap-break-word">
                                    <div className="max-w-150 wrap-break-word">
                                        <p className="text-lg sm:text-[22px] md:text-3xl w-20 sm:w-25 md:w-35">
                                            {item["Waktu"]}
                                        </p>
                                    </div>

                                    {/* Time line */}
                                    {item["Waktu"] && (
                                        <div className="relative flex flex-col">
                                            <div className="absolute right-4 sm:right-6 top-2 sm:top-3 w-2 h-2 md:w-2.5 md:h-2.5 bg-black rounded-full z-20" />
                                            {(items[i + 1]?.["Waktu"]) && (
                                                <div style={{ height: `${containerHeights[currentIndex] + 18}px` }} className={`absolute top-3 right-4.75 sm:right-6.75 md:right-7 bg-black opacity-70 w-[1.5px] md:w-0.5 z-10`} />
                                            )}

                                        </div>
                                    )}

                                    <div className="flex flex-col">
                                        <p className="text-xs sm:text-xl md:text-2xl lg:text-3xl wrap-break-word whitespace-normal leading-snug">{item["Kegiatan"]}</p>
                                        <p className="text-[10px] sm:text-[16px] sm:text-lg lg:text-xl opacity-50">{item["Kegiatan"] !== "" ? item["Lokasi / Catatan"] : ""}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}