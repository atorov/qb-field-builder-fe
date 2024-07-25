/**
 * src/BuilderContext/reducer.ts
 *
 * This file defines the `reducer` function for managing state updates in the builder application.
 * The reducer handles various action types to update the state, including adding and removing choices,
 * resetting the state, setting default choices, display order, label, multiselect, new choice,
 * required fields, and setting a new state. Each action type triggers state validation and updates
 * the `updatedAt` timestamp. The reducer integrates with the `validate` function to ensure the state
 * remains consistent and adheres to the defined validation rules.
 */

import {
    ACTION_TYPE,
    FIELD_KEYS,
    INITIAL_STATE,
    type Action,
    type State,
} from "../models";
import validate from "./validate";

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ACTION_TYPE.AddNewChoice: {
            const newChoice = state.fields[FIELD_KEYS.NewChoice].value;
            const choices = state.fields[FIELD_KEYS.Choices].value;

            return validate({
                ...state,
                fields: {
                    ...state.fields,
                    [FIELD_KEYS.Choices]: {
                        ...state.fields[FIELD_KEYS.Choices],
                        isUpdated: true,
                        value: [...choices, newChoice],
                    },
                    [FIELD_KEYS.NewChoice]: {
                        ...state.fields[FIELD_KEYS.NewChoice],
                        isUpdated: true,
                        value: "",
                    },
                },
                updatedAt: Date.now(),
            });
        }

        case ACTION_TYPE.RemoveChoice: {
            const choices = state.fields[FIELD_KEYS.Choices].value;

            return validate({
                ...state,
                fields: {
                    ...state.fields,
                    [FIELD_KEYS.Choices]: {
                        ...state.fields[FIELD_KEYS.Choices],
                        isUpdated: true,
                        value: choices.filter((_, idx) => idx !== action.value),
                    },
                },
                updatedAt: Date.now(),
            });
        }

        case ACTION_TYPE.ResetAll:
            return INITIAL_STATE;

        case ACTION_TYPE.SetDefaultChoice:
            return validate({
                ...state,
                fields: {
                    ...state.fields,
                    [FIELD_KEYS.DefaultChoice]: {
                        ...state.fields[FIELD_KEYS.DefaultChoice],
                        isUpdated: true,
                        value: action.value,
                    },
                },
                updatedAt: Date.now(),
            });

        case ACTION_TYPE.SetDisplayOrder:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [FIELD_KEYS.DisplayOrder]: {
                        ...state.fields[FIELD_KEYS.DisplayOrder],
                        isUpdated: true,
                        value: action.value,
                    },
                },
                updatedAt: Date.now(),
            };

        case ACTION_TYPE.SetLabel:
            return validate({
                ...state,
                fields: {
                    ...state.fields,
                    [FIELD_KEYS.Label]: {
                        ...state.fields[FIELD_KEYS.Label],
                        isUpdated: true,
                        value: action.value,
                    },
                },
                updatedAt: Date.now(),
            });

        case ACTION_TYPE.SetMultiselect:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [FIELD_KEYS.Multiselect]: {
                        ...state.fields[FIELD_KEYS.Multiselect],
                        isUpdated: true,
                        value: action.value,
                    },
                },
                updatedAt: Date.now(),
            };

        case ACTION_TYPE.SetNewChoice:
            return validate({
                ...state,
                fields: {
                    ...state.fields,
                    [FIELD_KEYS.NewChoice]: {
                        ...state.fields[FIELD_KEYS.NewChoice],
                        isUpdated: true,
                        value: action.value,
                    },
                },
                updatedAt: Date.now(),
            });

        case ACTION_TYPE.SetNewState:
            return validate({
                ...state,
                ...action.value,
                updatedAt: Date.now(),
            });

        case ACTION_TYPE.SetRequired:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [FIELD_KEYS.Required]: {
                        ...state.fields[FIELD_KEYS.Required],
                        isUpdated: true,
                        value: action.value,
                    },
                },
                updatedAt: Date.now(),
            };
    }
}
