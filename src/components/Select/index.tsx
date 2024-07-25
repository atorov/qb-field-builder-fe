import { SelectHTMLAttributes } from "react";
import styles from "./styles.module.css";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    options: string[];
    optionLabels?: string[];
};

export default function Select({
    id,
    label,
    options,
    optionLabels = [],
    required,
    ...restProps
}: SelectProps) {
    return (
        <div className={styles.container}>
            <label htmlFor={id} className={styles.label}>
                {label}
                {required && <span className={styles.required}>&nbsp;*</span>}
            </label>
            <select {...restProps} id={id} className={styles.select}>
                {options.map((option, index) => (
                    <option key={`${option}-${index}`} value={option}>
                        {optionLabels[index] ?? option}
                    </option>
                ))}
            </select>
        </div>
    );
}
