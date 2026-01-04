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
        fetch("https://script.google.com/macros/s/AKfycbyNC1kyP-4tT8dgGUZnuknEeGzHV5mZwl2X1MIOUL_3E_wcVYCO9l6joIRlQTuo4anW/exec")
            .then(res => res.json())
            .then((json: ItineraryItem[]) => setData(json));
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
        <div className="flex flex-col gap-12">
            <h1 className={`${Styles.itineraryhead} text-7xl text-white font-bold`}>Itinerary</h1>

            {/* List Itinerary */}
            {Object.entries(groupedData).map(([date, items]) => (
                <div key={date}>
                    <h2>{date}</h2>

                    {items.map((item, i) => (
                        <div key={i}>
                            <span>{item["Waktu"]}</span>
                            {" - "}
                            {item["Kegiatan"]}
                        </div>
                    ))}

                </div>
            ))}
        </div>
    )
}