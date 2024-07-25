import { type BeDataResponse, INITIAL_STATE, type State } from "../models";
import { FIELD_KEYS } from "./../models/index";
import beToFeDataAdapter from "./beToFeDataAdapter";

describe("shared/beToFeDataAdapter()", () => {
    it("should correctly adapt backend data to frontend state", () => {
        const backendData: BeDataResponse = {
            choices: ["choice1", "choice2"],
            default: "choice1",
            displayOrder: "alphabetically_ascending",
            label: "Test Label",
            multiselect: true,
            required: true,
        };

        const previousState: State = {
            ...INITIAL_STATE,
        };

        const newState = beToFeDataAdapter(backendData, previousState);

        expect(newState.fields[FIELD_KEYS.Choices].value).toEqual(
            backendData.choices,
        );
        expect(newState.fields[FIELD_KEYS.DefaultChoice].value).toEqual(
            backendData.default,
        );
        expect(newState.fields[FIELD_KEYS.DisplayOrder].value).toEqual(
            backendData.displayOrder,
        );
        expect(newState.fields[FIELD_KEYS.Label].value).toEqual(
            backendData.label,
        );
        expect(newState.fields[FIELD_KEYS.Multiselect].value).toEqual(
            backendData.multiselect,
        );
        expect(newState.fields[FIELD_KEYS.Required].value).toEqual(
            backendData.required,
        );
        expect(newState.fields[FIELD_KEYS.NewChoice].value).toEqual(
            INITIAL_STATE.fields[FIELD_KEYS.NewChoice].value,
        );
    });

    it("should set isUpdated to true for all fields", () => {
        const backendData: BeDataResponse = {
            choices: ["choice1", "choice2"],
            default: "choice1",
            displayOrder: "alphabetically_ascending",
            label: "Test Label",
            multiselect: true,
            required: true,
        };

        const previousState: State = {
            ...INITIAL_STATE,
        };

        const newState = beToFeDataAdapter(backendData, previousState);

        for (const key of Object.keys(newState.fields)) {
            expect(
                newState.fields[key as keyof State["fields"]].isUpdated,
            ).toBe(true);
        }
    });
});
