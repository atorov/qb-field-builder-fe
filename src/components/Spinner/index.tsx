import { FaSpinner } from "react-icons/fa";
import styles from "./styles.module.css";

export default function Spinner() {
    return (
        <div className={styles.container}>
            <FaSpinner className={styles.icon} />
        </div>
    );
}
