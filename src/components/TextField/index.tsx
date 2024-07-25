import { type FC, type InputHTMLAttributes } from "react";
import styles from "./styles.module.css";

type TextFieldProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "value"
> & {
    id: string;
    inputButtonDisabled?: boolean;
    InputButtonIcon?: FC;
    inputButtonOnClick?: (value?: string) => void;
    label: string;
    border?: "solid" | "dashed";
    description?: string;
    error?: string;
    value?: string;
    warning?: string;
};

export default function TextField({
    border = "solid",
    description,
    error,
    id,
    inputButtonDisabled,
    InputButtonIcon,
    inputButtonOnClick,
    label,
    required,
    value,
    warning,
    ...restInputProps
}: TextFieldProps) {
    const inputBorderClassName = `${styles.input} ${border === "solid" ? styles.inputBorderSolid : styles.inputBorderDashed}`;

    const message = error || warning || description;

    let messageClassName = styles.message;
    if (error) {
        messageClassName += ` ${styles.error}`;
    } else if (warning) {
        messageClassName += ` ${styles.warning}`;
    } else if (description) {
        messageClassName += ` ${styles.description}`;
    }

    function handleInputButtonClick() {
        if (inputButtonOnClick) {
            inputButtonOnClick(value);
        }
    }

    return (
        <div className={styles.container}>
            <label htmlFor={id} className={styles.label}>
                {label}
                {required ? (
                    <span className={styles.required}>&nbsp;*</span>
                ) : null}
            </label>

            <div className={styles.inputContainer}>
                <input
                    {...restInputProps}
                    id={id}
                    type="text"
                    value={value}
                    className={inputBorderClassName}
                />
                {InputButtonIcon ? (
                    <button
                        type="button"
                        disabled={inputButtonDisabled}
                        className={styles.inputButton}
                        onClick={handleInputButtonClick}
                    >
                        <InputButtonIcon />
                    </button>
                ) : null}
            </div>

            {message ? (
                <span className={messageClassName}>{message}</span>
            ) : null}
        </div>
    );
}
