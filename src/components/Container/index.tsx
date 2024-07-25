import { type ReactNode } from "react";
import styles from "./styles.module.css";

type ContainerProps = {
    children: ReactNode;
    title: string;
};

export default function Container({ children, title }: ContainerProps) {
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>{title}</h2>
            <div className={styles.body}>{children}</div>
        </div>
    );
}
