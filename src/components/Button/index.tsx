import { type ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    colorKind?: "primary" | "secondary";
    kind?: "solid" | "outline";
    width?: "full" | "auto";
};

export default function Button({
    children,
    colorKind = "primary",
    kind = "solid",
    width = "auto",
    disabled,
    ...restProps
}: ButtonProps) {
    const className = `${styles.btn} ${styles[colorKind]} ${styles[kind]} ${styles[width]} ${disabled ? styles.disabled : ""}`;

    return (
        <button {...restProps} disabled={disabled} className={className}>
            {children}
        </button>
    );
}
