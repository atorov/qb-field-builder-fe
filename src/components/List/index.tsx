import { type ReactNode } from "react";
import styles from "./styles.module.css";

type ListProps = {
    children: ReactNode;
    description?: string;
    error?: string;
    label?: string;
    required?: boolean;
    warning?: string;
};

export default function List({
    children,
    description,
    error,
    label,
    required,
    warning,
}: ListProps) {
    const message = error || warning || description;

    let messageClassName = styles.message;
    if (error) {
        messageClassName += ` ${styles.error}`;
    } else if (warning) {
        messageClassName += ` ${styles.warning}`;
    } else if (description) {
        messageClassName += ` ${styles.description}`;
    }

    return (
        <div className={styles.container}>
            {label ? (
                <label className={styles.label}>
                    {label}
                    {required ? (
                        <span className={styles.required}>&nbsp;*</span>
                    ) : null}
                </label>
            ) : null}
            {children}
            {message ? (
                <span className={messageClassName}>{message}</span>
            ) : null}
        </div>
    );
}
