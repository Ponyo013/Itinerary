import Styles from "../style/Style.module.css"
import { useEffect, useState } from "react"

type ItineraryItem = {
    "Tanggal": string;
    "Hari": string;
    "Waktu": string;
    "Kegiatan": string;
    "Lokasi / Catatan": string;
};

export default function Itinerary() {
    const [data, setData] = useState<ItineraryItem[]>([])

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
            acc[dateKey].push(item);

            if (item["Tanggal"]) lastValidDate = dateKey;

            return acc;
        }, {});
    };

    const groupedData = groupByFormattedDate(data);

    return (
        <div>
            {/* On Going */}

            
            {/* List Itinerary */}
            <div>
                <h1 className={`${Styles.itineraryhead} text-7xl text-white font-bold mb-12 text-center`}>Itinerary</h1>
                <div className={`${Styles.itinerarybody} flex flex-col gap-12`}>
                    {Object.entries(groupedData).map(([date, items], index) => (
                        <div key={date} className="flex flex-col bg-white rounded-xl p-10 gap-8">
                            <div className="flex flex-col gap-2 font-bold text-[#740001]">
                                <h1 className="text-4xl">Day {index + 1}</h1>
                                <h2 className="text-2xl opacity-60">{date}</h2>
                            </div>

                            <div className="flex flex-col gap-6">
                                {items.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-24 text-left pt-1">
                                            <p className="text-3xl">{item["Waktu"]}</p>
                                        </div>

                                        {/* timeline */}
                                        <div className="relative flex flex-col items-center w-4 mt-4">
                                            {/* The Dot */}
                                            <div className="w-2.5 h-2.5 bg-black rounded-full shrink-0" />

                                            {/* The Line */}
                                            {i !== items.length - 1 && (
                                                <div className="absolute top-2.5 w-0.5 h-20 bg-black" />
                                            )}
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="text-3xl">{item["Kegiatan"]}</div>
                                            <div className="text-xl opacity-50">{item["Lokasi / Catatan"]}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}