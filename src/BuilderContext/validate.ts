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
