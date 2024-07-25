/**
 * src/shared/splitString.ts
 *
 * This function takes a string and a length, and splits the string into two parts based on the given length.
 * If the length is out of bounds, it returns the original string as the first part and an empty string as the second part.
 *
 * @param {string} text - The string to be split.
 * @param {number} length - The length at which to split the string.
 * @returns {[string, string]} - An array containing the two parts of the split string.
 */

export default function splitString(text: string, length: number) {
    if (length < 0 || length > text.length) {
        return [text, ""];
    }

    const firstPart = text.slice(0, length);
    const secondPart = text.slice(length);

    return [firstPart, secondPart];
}
