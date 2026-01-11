import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function DateInput({ value, onChange }: Props) {

    return (
        <div>
            <p className="text-md sm:text-lg md:text-xl text-gray-800 font-bold mb-2 sm:mb-2.5">
                Date
            </p>

            <div className="relative">
                <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={(date: Date | null) => {
                        if (!date) return;
                        onChange(date.toISOString().split("T")[0]);
                    }}
                    dateFormat="dd/MM/yyyy"
                    className="px-3 sm:px-4 sm:text-xl text-md border-2 border-gray-500
                               rounded-lg focus:outline-none focus:border-[#7b3a3b]
                               focus:ring-1 focus:ring-[#7b3a3b] w-full sm:w-md h-11 sm:h-14"
                    wrapperClassName="w-full"
                    placeholderText="dd/MM/yyyy"
                    required
                />

                <Icon
                    icon="stash:data-date-duotone"
                    className="h-6 w-6 sm:h-8 sm:w-8 absolute top-1/4 right-4"
                />
            </div>
        </div>
    );
}
