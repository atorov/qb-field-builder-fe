import { FaDeleteLeft } from "react-icons/fa6";
import splitString from "../../shared/splitString";
import styles from "./styles.module.css";

type ItemProps = {
    name: string;
    maxLength: number;
    onDelete: () => void;
};

export default function Item({ maxLength, name, onDelete }: ItemProps) {
    const [firstPart, secondPart] = splitString(name, maxLength);

    return (
        <div className={styles.container}>
            <p className={styles.name}>
                <span className={styles.firstPart}>{firstPart}</span>
                <span className={styles.secondPart}>{secondPart}</span>
            </p>
            <button
                type="button"
                className={styles.deleteButton}
                onClick={onDelete}
            >
                <FaDeleteLeft />
            </button>
        </div>
    );
}
