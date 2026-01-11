import type React from "react";
import chinaFlag from "../../assets/China (CN)_Rounded.svg";
import indonesiFlag from "../../assets/Indonesia (ID)_Rounded.svg";

type CountryCode = "ID" | "CN";

type InputFieldProps = {
    label: string;
    name?: string;
    inputMode?: "numeric" | "text";
    prefix?: React.ReactNode;
    country?: CountryCode;
    type?: string;
    min?: number;
    readOnly?: boolean;
    required?: boolean;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

const COUNTRY_MAP: Record<
    CountryCode,
    { flag: string; suffix: string }
> = {
    ID: {
        flag: indonesiFlag,
        suffix: "IDR",
    },
    CN: {
        flag: chinaFlag,
        suffix: "CNY",
    },
};

export default function InputField({
    label,
    name,
    inputMode = "numeric",
    prefix,
    country,
    type = "text",
    min,
    readOnly = false,
    required = false,
    value,
    onChange,
    onBlur,
    placeholder = "",
}: InputFieldProps) {
    const countryData = country ? COUNTRY_MAP[country] : null;

    return (
        <div className="space-y-2 sm:space-y-2.5">
            <p className="text-md sm:text-lg md:text-xl text-gray-800 font-bold">{label}</p>

            <div className="relative">
                {/* PREFIX */}
                {prefix && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-800 pointer-events-none">
                        {prefix}
                    </span>
                )}

                {/* SUFFIX / FLAG */}
                {countryData && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <img
                            src={countryData.flag}
                            alt={country}
                            className="h-4 w-4 md:h-6 md:w-6"
                        />
                        <span className="text-md sm:text-lg md:text-2xl font-bold">
                            {countryData.suffix}
                        </span>
                    </span>
                )}

                {/* INPUT */}
                <input
                    type={type}
                    name={name}
                    inputMode={inputMode}
                    min={min}
                    readOnly={readOnly}
                    required={required}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={`
                        w-full sm:h-14
                        h-10
                        ${prefix ? "pl-14" : "px-3 sm:px-4"}
                        ${countryData ? "pr-24" : "pr-4"}
                        sm:text-xl
                        text-md
                        border-2 border-gray-500 rounded-lg
                        focus:outline-none focus:border-[#7b3a3b]
                        focus:ring-1 focus:ring-[#7b3a3b]
                        [appearance:textfield]
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                    `}
                />
            </div>
        </div>
    );
}
