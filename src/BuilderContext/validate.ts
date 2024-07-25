/**
 * src/BuilderContext/validate.ts
 *
 * This file defines the `validate` function, which validates the entire state by
 * iterating over each field key in `FIELD_KEYS`. It uses the `validateFieldData`
 * function to perform validation on each field and updates the state's validation
 * object accordingly. The function returns the new validated state.
 */

import { FIELD_KEYS, State } from "../models";
import validateFieldData from "./validateFieldData";

export default function validate(state: State): State {
    return Object.values(FIELD_KEYS).reduce(
        (newState, key) => ({
            ...newState,
            fields: {
                ...newState.fields,
                [key]: {
                    ...newState.fields[key],
                    validation: validateFieldData(key, newState),
                },
            },
        }),
        { ...state },
    );
}
