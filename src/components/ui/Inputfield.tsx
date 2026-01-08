import chinaFlag from "../../assets/China (CN)_Rounded.svg"
import indonesiFlag from "../../assets/Indonesia (ID)_Rounded.svg"

type InputFieldProps = {
    label: string;
    inputMode?: "numeric" | "text";
    prefix?: string;
    country?: "ID" | "CN";
    type?: string;
    min?: number;
    readOnly?: boolean;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string;
};

export default function InputField({
    label,
    inputMode = "numeric",
    prefix,
    country,
    type = "text",
    min,
    readOnly = false,
    value,
    onChange,
    onBlur,
    placeholder = "",
}: InputFieldProps) {
    const flag =
        country === "ID"
            ? indonesiFlag
            : country === "CN"
                ? chinaFlag
                : null;

    const suffix =
        country === "ID"
            ? "IDR"
            : country === "CN"
                ? "CNY"
                : "";

    return (
        <div className="space-y-2.5">
            <p className="text-xl text-gray-800 font-bold">{label}</p>

            <div className="relative">
                {prefix && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 font-bold text-xl pointer-events-none">
                        {prefix}
                    </span>
                )}

                {flag && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <img src={flag} alt={country} />
                        {suffix && <span className="text-2xl font-bold">{suffix}</span>}
                    </span>
                )}

                <input
                    type={type}
                    inputMode={inputMode}
                    min={min}
                    readOnly={readOnly}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={`
                        w-full h-14
                        ${prefix ? "pl-11" : "px-4"}
                        text-xl
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
