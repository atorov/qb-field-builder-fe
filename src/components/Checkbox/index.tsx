import { type InputHTMLAttributes } from "react";
import styles from "./styles.module.css";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
    id: string;
    label: string;
    description?: string;
};

function Checkbox({ description, id, label, ...restProps }: CheckboxProps) {
    return (
        <div className={styles.container}>
            <input
                {...restProps}
                id={id}
                type="checkbox"
                className={styles.input}
            />

            <div className={styles.labelContainer}>
                <label htmlFor={id} className={styles.label}>
                    <span>{label}</span>
                </label>
                {description ? (
                    <span className={styles.description}>{description}</span>
                ) : null}
            </div>
        </div>
    );
}

export default Checkbox;
