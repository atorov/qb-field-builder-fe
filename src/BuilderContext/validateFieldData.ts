/**
 * src/BuilderContext/validateFieldData.ts
 *
 * This file defines the `validateFieldData` function, which performs validation on individual fields of the state.
 * The function checks the field value based on the provided key and the entire state.
 * It returns a validation object containing error and warning codes based on the validation rules.
 * Specific validations are performed for choices, default choice, label, and new choice fields,
 * checking for conditions such as required fields, maximum length, duplication, and exceeding maximum number of choices.
 */

import {
    CHOICES_MAX_NUMBER,
    type CommonField,
    ERROR_CODES,
    FIELD_KEYS,
    type State,
    TEXT_VALUE_MAX_LENGTH,
    WARN_CODES,
} from "../models";

export default function validateFieldData(
    key: keyof State["fields"],
    state: State,
): CommonField["validation"] {
    if (key === FIELD_KEYS.Choices) {
        const value = state.fields[FIELD_KEYS.Choices].value;

        if (!value.length) {
            return { errorCode: ERROR_CODES.Required, warnCode: WARN_CODES.Na };
        }

        if (value.some((it) => it.length > TEXT_VALUE_MAX_LENGTH)) {
            return {
                errorCode: ERROR_CODES.Na,
                warnCode: WARN_CODES.SomeTooLong,
            };
        }

        if (value.length >= CHOICES_MAX_NUMBER) {
            return {
                errorCode: ERROR_CODES.Na,
                warnCode: WARN_CODES.TooMany,
            };
        }
    } else if (key === FIELD_KEYS.DefaultChoice) {
        const value = state.fields[FIELD_KEYS.DefaultChoice].value;
        const choicesValue = state.fields[FIELD_KEYS.Choices].value;

        if (
            choicesValue.length >= CHOICES_MAX_NUMBER &&
            !choicesValue.includes(value) &&
            value
        ) {
            return {
                errorCode: ERROR_CODES.TooMany,
                warnCode: WARN_CODES.Na,
            };
        }

        if (value.length > TEXT_VALUE_MAX_LENGTH) {
            return {
                errorCode: ERROR_CODES.Na,
                warnCode: WARN_CODES.TooLong,
            };
        }
    } else if (key === FIELD_KEYS.Label) {
        const value = state.fields[FIELD_KEYS.Label].value;

        if (!value) {
            return { errorCode: ERROR_CODES.Required, warnCode: WARN_CODES.Na };
        }

        if (value.length > TEXT_VALUE_MAX_LENGTH) {
            return {
                errorCode: ERROR_CODES.Na,
                warnCode: WARN_CODES.TooLong,
            };
        }
    } else if (key === FIELD_KEYS.NewChoice) {
        const value = state.fields[FIELD_KEYS.NewChoice].value;
        const choicesValue = state.fields[FIELD_KEYS.Choices].value;

        if (choicesValue.includes(value)) {
            return {
                errorCode: ERROR_CODES.Duplicated,
                warnCode: WARN_CODES.Na,
            };
        }

        if (choicesValue.length >= CHOICES_MAX_NUMBER) {
            return {
                errorCode: ERROR_CODES.Na,
                warnCode: WARN_CODES.TooMany,
            };
        }

        if (value.length > TEXT_VALUE_MAX_LENGTH) {
            return {
                errorCode: ERROR_CODES.Na,
                warnCode: WARN_CODES.TooLong,
            };
        }
    }

    return { errorCode: ERROR_CODES.Na, warnCode: WARN_CODES.Na };
}
