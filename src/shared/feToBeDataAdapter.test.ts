import { FIELD_KEYS, INITIAL_STATE, type State } from "../models";
import feToBeDataAdapter from "./feToBeDataAdapter";

describe("shared/feToBeDataAdapter()", () => {
    it("should correctly adapt frontend state to backend data", () => {
        const state: State = {
            ...INITIAL_STATE,
            fields: {
                ...INITIAL_STATE.fields,
                choices: {
                    ...INITIAL_STATE.fields[FIELD_KEYS.Choices],
                    value: ["choice1", "choice2"],
                },
                defaultChoice: {
                    ...INITIAL_STATE.fields[FIELD_KEYS.DefaultChoice],
                    value: "choice1",
                },
                displayOrder: {
                    ...INITIAL_STATE.fields[FIELD_KEYS.DisplayOrder],
                    value: "alphabetically_ascending",
                },
                label: {
                    ...INITIAL_STATE.fields[FIELD_KEYS.Label],
                    value: "Test Label",
                },
                multiselect: {
                    ...INITIAL_STATE.fields[FIELD_KEYS.Multiselect],
                    value: true,
                },
                required: {
                    ...INITIAL_STATE.fields[FIELD_KEYS.Required],
                    value: true,
                },
            },
        };

        const backendData = feToBeDataAdapter(state);

        expect(backendData.choices).toEqual(state.fields.choices.value);
        expect(backendData.default).toEqual(state.fields.defaultChoice.value);
        expect(backendData.displayOrder).toEqual(
            state.fields.displayOrder.value,
        );
        expect(backendData.label).toEqual(state.fields.label.value);
        expect(backendData.multiselect).toEqual(state.fields.multiselect.value);
        expect(backendData.required).toEqual(state.fields.required.value);
    });

    it("should validate the frontend state before adapting", () => {
        const invalidState = {
            ...INITIAL_STATE,
            fields: {
                ...INITIAL_STATE.fields,
                label: {
                    ...INITIAL_STATE.fields[FIELD_KEYS.Label],
                    value: "", // <-- Invalid state: label cannot be empty
                },
            },
        };

        expect(() => feToBeDataAdapter(invalidState)).toThrow();
    });
});
