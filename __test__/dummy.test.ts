// Added to experiment with the vitest setup

import { describe, expect, test } from "vitest";

describe("Just a dummy suite", () => {
    test("Just a dummy test", () => {
        expect(!false).not.toBeFalsy();
    });
});
