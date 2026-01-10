import { useEffect, useState } from "react"
import Styles from "../style/Style.module.css"
import InputField from "./ui/Inputfield"
import { Icon } from "@iconify/react"

export default function Expense() {
    // Loading 
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    type ExpenseForm = {
        date: string;
        category: string;
        currency: string;
        amount: string;
        paymentType: string;
        notes: string;
    };

    const [form, setForm] = useState<ExpenseForm>({
        date: "",
        category: "Transportation",
        currency: "RMB",
        amount: "",
        paymentType: "Alipay",
        notes: "",
    });

    // Post Method
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return;
        setLoading(true);

        const url = "https://script.google.com/macros/s/AKfycbyJ9vZ2FjjHUK6qdNEmyDMHPIOCQdcW30mmX5FrG86dTATi7WSEEvbtJ34g4ZFZ6x5i/exec"
        try {
            const res = await fetch(url,
                {
                    method: "POST",
                    body: JSON.stringify(payload),
                }
            );

            const data = await res.json();
            console.log(data)
        } catch (err) {
            console.error("Error saving expense", err);
        } finally {
            setLoading(false)
            setShowModal(true)
        }
    };

    const cleanNumber = (value: string) => {
        const normalized = value
            .replace(/\./g, "")   // hapus pemisah ribuan
            .replace(",", ".");   // koma 

        return Number(normalized);
    };

    const formatID = (value: number, decimals = 2) =>
        new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: decimals,
        }).format(value);


    const formatDateShort = (dateStr: string) => {
        if (!dateStr) return "";

        const date = new Date(dateStr);

        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
        }).format(date);
    };

    const payload = {
        ...form,
        date: formatDateShort(form.date),
        amount: cleanNumber(form.amount),
    };

    // Mapping ke dalam form expense
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        if (name === "amount") {
            const raw = cleanNumber(value);
            const formatted = isNaN(raw) ? "" : formatID(raw);

            setForm(prev => ({
                ...prev,
                amount: formatted,
            }));
            return;
        }

        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <h1 className={`${Styles.head} text-3xl sm:text-5xl md:text-7xl text-white font-bold mb-6 sm:mb-12 text-center`}>Expenses</h1>

            <form onSubmit={handleSubmit} id="expense-form" className="bg-white rounded-xl p-8 flex flex-col gap-6 w-lg">
                {/* Date */}
                <InputField
                    label="Date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />

                {/* Category Expenses */}
                <div>
                    <p className="text-xl text-gray-800 font-bold mb-2.5">Category</p>

                    <div className="relative">
                        <select name="category" value={form.category}
                            onChange={handleChange} className="
                            cursor-pointer
                            px-4
                            text-xl 
                            border-2 border-gray-500 
                            rounded-lg 
                            focus:outline-none focus:border-[#7b3a3b] focus:ring-1 focus:ring-[#7b3a3b] 
                            w-full h-14">
                            <option value="Transportation">Transportation</option>
                            <option value="Foods">Foods</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Other">Other</option>
                        </select>
                        <Icon icon="line-md:chevron-down" className="h-6 w-6 absolute top-1/3 right-4" />
                    </div>
                </div>

                {/* Currency Dropdown */}
                <div>
                    <p className="text-xl text-gray-800 font-bold mb-2.5">Currency</p>

                    <div className="relative">
                        <select value={form.currency}
                            onChange={handleChange} name="currency" id="select" className="
                            cursor-pointer
                            px-4
                            text-xl 
                            border-2 border-gray-500 
                            rounded-lg 
                            focus:outline-none focus:border-[#7b3a3b] focus:ring-1 focus:ring-[#7b3a3b] 
                            w-full h-14">

                            <option value="IDR">IDR</option>
                            <option value="RMB">RMB</option>
                        </select>
                        <Icon icon="line-md:chevron-down" className="h-6 w-6 absolute top-1/3 right-4" />
                    </div>
                </div>

                <InputField
                    label="Amount"
                    name="amount"
                    type="numeric"
                    value={form.amount}
                    onChange={handleChange}
                    required
                />

                {/* Category Payment */}
                <div>
                    <p className="text-xl text-gray-800 font-bold mb-2.5">Payment Type</p>

                    <div className="relative">
                        <select value={form.paymentType}
                            onChange={handleChange} name="paymentType" id="select" className="
                            cursor-pointer
                            px-4
                            text-xl 
                            border-2 border-gray-500 
                            rounded-lg 
                            focus:outline-none focus:border-[#7b3a3b] focus:ring-1 focus:ring-[#7b3a3b] 
                            w-full h-14">
                            <option value="Alipay">Ali pay</option>
                            <option value="CC">CC</option>
                            <option value="Cash">Cash</option>
                        </select>
                        <Icon icon="line-md:chevron-down" className="h-6 w-6 absolute top-1/3 right-4" />
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <p className="text-xl text-gray-800 font-bold mb-2.5">Notes</p>
                    <textarea value={form.notes}
                        onChange={handleChange} name="notes" id="notes" form="expense-form" rows={5} className="
                        p-3
                        text-xl 
                        border-2 border-gray-500 
                        rounded-lg 
                        focus:outline-none focus:border-[#7b3a3b] focus:ring-1 focus:ring-[#7b3a3b] 
                            w-full"></textarea>
                </div>

                <button type="submit" disabled={loading} className="flex justify-center text-xl font-medium p-3 text-white bg-[#5A090A] rounded-xl hover:grayscale-25 cursor-pointer">
                    {loading ? (
                        <>
                            <div className=" w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

                        </>
                    ) : (
                        "Submit"
                    )}
                </button>

            </form>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-xl p-6 w-80 text-center">
                        <h2 className="text-xl font-bold mb-2">Success</h2>
                        <p className="text-gray-600 mb-4">
                            Data successfully submitted
                        </p>

                        <button
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 bg-green-600 font-bold text-white rounded-lg cursor-pointer hover:grayscale-25 "
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}



        </div >
    )
}