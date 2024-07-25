export default function splitString(text: string, length: number) {
    if (length < 0 || length > text.length) {
        return [text, ""];
    }

    const firstPart = text.slice(0, length);
    const secondPart = text.slice(length);

    return [firstPart, secondPart];
}
