import { type InputHTMLAttributes, type RefObject } from "react";
import styles from "./styles.module.css";

type SearchWithSuggestionsProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "value" | "onSelect"
> & {
    id: string;
    isDropdownVisible: boolean;
    label: string;
    inputRef: RefObject<HTMLInputElement>;
    suggestions: string[];
    onSelect: (value: string) => void;
    description?: string;
    error?: string;
    value?: string;
    warning?: string;
};

export default function SearchWithSuggestions({
    description,
    error,
    id,
    inputRef,
    isDropdownVisible,
    label,
    required,
    suggestions,
    value = "",
    warning,
    onSelect,
    ...restProps
}: SearchWithSuggestionsProps) {
    const message = error || warning || description;

    let messageClassName = styles.message;
    if (error) {
        messageClassName += ` ${styles.error}`;
    } else if (warning) {
        messageClassName += ` ${styles.warning}`;
    } else if (description) {
        messageClassName += ` ${styles.description}`;
    }

    const handleSelect = (suggestion: string) => {
        onSelect(suggestion);
    };

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
                    {...restProps}
                    ref={inputRef}
                    id={id}
                    type="text"
                    value={value}
                    className={styles.input}
                />
                {isDropdownVisible && (
                    <ul className={styles.suggestions}>
                        {suggestions.map((suggestion, idx) => (
                            <li
                                key={`${suggestion}-${idx}`}
                                className={styles.suggestion}
                                onClick={() => handleSelect(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {message ? (
                <span className={messageClassName}>{message}</span>
            ) : null}
        </div>
    );
}
