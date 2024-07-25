import {
    FaCheck,
    FaCheckCircle,
    FaExclamationCircle,
    FaExclamationTriangle,
    FaInfoCircle,
} from "react-icons/fa";
import styles from "./styles.module.css";

type BannerProps = {
    message: string;
    variant?: "error" | "default" | "info" | "success" | "warning";
};

const ICONS = {
    error: <FaExclamationCircle className={styles.icon} />,
    default: <FaCheck className={styles.icon} />,
    info: <FaInfoCircle className={styles.icon} />,
    success: <FaCheckCircle className={styles.icon} />,
    warning: <FaExclamationTriangle className={styles.icon} />,
};

export default function Banner({ message, variant = "default" }: BannerProps) {
    return (
        <div className={`${styles.container} ${styles[variant]}`}>
            {ICONS[variant]}
            <p className={styles.message}>{message}</p>
        </div>
    );
}
