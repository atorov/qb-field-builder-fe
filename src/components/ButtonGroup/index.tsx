import { type ReactNode } from "react";
import styles from "./styles.module.css";

type ButtonGroupProps = {
    children: ReactNode;
};

export default function ButtonGroup({ children }: ButtonGroupProps) {
    return <div className={styles.buttonGroup}>{children}</div>;
}
