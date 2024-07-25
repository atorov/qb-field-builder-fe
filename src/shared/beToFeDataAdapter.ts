import {
    type BeDataResponse,
    BeDataResponseSchema,
    FIELD_KEYS,
    INITIAL_STATE,
    INITIAL_STATE_VALIDATION,
    type State,
    StateSchema,
} from "../models";

export default function beToFeDataAdapter(
    data: BeDataResponse,
    prevState: State,
): State {
    const validatedData = BeDataResponseSchema.parse(data);

    return StateSchema.parse({
        ...prevState,
        fields: {
            [FIELD_KEYS.Choices]: {
                isUpdated: true,
                validation: INITIAL_STATE_VALIDATION,
                value: validatedData.choices,
            },
            [FIELD_KEYS.DefaultChoice]: {
                isUpdated: true,
                validation: INITIAL_STATE_VALIDATION,
                value: validatedData.default,
            },
            [FIELD_KEYS.DisplayOrder]: {
                isUpdated: true,
                validation: INITIAL_STATE_VALIDATION,
                value: validatedData.displayOrder,
            },
            [FIELD_KEYS.Label]: {
                isUpdated: true,
                validation: INITIAL_STATE_VALIDATION,
                value: validatedData.label,
            },
            [FIELD_KEYS.Multiselect]: {
                isUpdated: true,
                validation: INITIAL_STATE_VALIDATION,
                value: validatedData.multiselect,
            },
            [FIELD_KEYS.NewChoice]: {
                isUpdated: true,
                validation: INITIAL_STATE_VALIDATION,
                value: INITIAL_STATE.fields[FIELD_KEYS.NewChoice].value,
            },
            [FIELD_KEYS.Required]: {
                isUpdated: true,
                validation: INITIAL_STATE_VALIDATION,
                value: validatedData.required,
            },
        },
    });
}
