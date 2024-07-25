import splitString from "./splitString";

describe("shared/splitString()", () => {
    it("should split the string at the given length", () => {
        const result = splitString("hello world", 5);
        expect(result).toEqual(["hello", " world"]);
    });

    it("should return the original string and an empty string if length is less than 0", () => {
        const result = splitString("hello world", -1);
        expect(result).toEqual(["hello world", ""]);
    });

    it("should return the original string and an empty string if length is greater than string length", () => {
        const result = splitString("hello world", 20);
        expect(result).toEqual(["hello world", ""]);
    });

    it("should handle empty string correctly", () => {
        const result = splitString("", 5);
        expect(result).toEqual(["", ""]);
    });

    it("should handle length of 0 correctly", () => {
        const result = splitString("hello world", 0);
        expect(result).toEqual(["", "hello world"]);
    });
});
