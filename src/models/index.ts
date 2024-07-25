/**
 * src/models/index.ts
 *
 * This file contains various constants, types, and validation schemas used throughout the application.
 *
 * Constants:
 * - `CHOICES_MAX_NUMBER`: The maximum number of choices allowed.
 * - `DEBOUNCING_PERIOD`: The period in milliseconds used for debouncing.
 * - `STORAGE_KEY`: The key used for storing state in localStorage.
 * - `TEXT_VALUE_MAX_LENGTH`: The maximum length of text values.
 * - `DISPLAY_ORDER`: An object containing possible display order values.
 * - `DISPLAY_ORDER_VALUES`: An array of display order values.
 * - `DISPLAY_ORDER_LABELS`: An object mapping display order values to their respective labels.
 * - `ERROR_CODES`: An object containing possible error codes.
 * - `ERROR_CODE_VALUES`: An array of error code values.
 * - `WARN_CODES`: An object containing possible warning codes.
 * - `WARN_CODE_VALUES`: An array of warning code values.
 *
 * Types:
 * - `CommonField`: A type representing the common field schema.
 * - `State`: A type representing the overall application state.
 * - `Action`: A type representing possible actions in the application.
 * - `ContextValue`: A type representing the context value, which includes the state and dispatch function.
 * - `BeDataResponse`: A type representing the backend data response.
 *
 * Schemas:
 * - `CommonFieldSchema`: A Zod schema for validating common fields.
 * - `StateSchema`: A Zod schema for validating the overall state.
 * - `BeDataResponseSchema`: A Zod schema for validating the backend data response.
 *
 * Initial State:
 * - `INITIAL_STATE_VALIDATION`: An object representing the initial validation state.
 * - `INITIAL_STATE`: An object representing the initial state of the application.
 *
 * Action Types:
 * - `ACTION_TYPE`: An object containing possible action types for state management.
 */

import { type Dispatch } from "react";
import { z } from "zod";

export const CHOICES_MAX_NUMBER = 5; // TODO: 50

export const DEBOUNCING_PERIOD = 2_500; // ms

export const STORAGE_KEY = "qb_field_builder_2024";

export const TEXT_VALUE_MAX_LENGTH = 40;

export const DISPLAY_ORDER = {
    AlphabeticallyAscending: "alphabetically_ascending",
    AlphabeticallyDescending: "alphabetically_descending",
    Predefined: "predefined",
    NaturalNumberAscending: "natural_number_ascending",
    NaturalNumberDescending: "natural_number_descending",
} as const;

export const DISPLAY_ORDER_VALUES = [
    DISPLAY_ORDER.AlphabeticallyAscending,
    DISPLAY_ORDER.AlphabeticallyDescending,
    DISPLAY_ORDER.Predefined,
    DISPLAY_ORDER.NaturalNumberAscending,
    DISPLAY_ORDER.NaturalNumberDescending,
] as const;

export const DISPLAY_ORDER_LABELS = {
    [DISPLAY_ORDER.AlphabeticallyAscending]: "Alphabetically Ascending (A-Z)",
    [DISPLAY_ORDER.AlphabeticallyDescending]: "Alphabetically Descending (Z-A)",
    [DISPLAY_ORDER.NaturalNumberAscending]:
        "Natural Number Ascending (1, 2, 10)",
    [DISPLAY_ORDER.NaturalNumberDescending]:
        "Natural Number Descending (10, 2, 1)",
    [DISPLAY_ORDER.Predefined]: "Predefined Order",
} as const;

export const ERROR_CODES = {
    Duplicated: "duplicated",
    Na: "",
    Required: "required",
    TooMany: "too_many",
} as const;

const ERROR_CODE_VALUES = [
    ERROR_CODES.Duplicated,
    ERROR_CODES.Na,
    ERROR_CODES.Required,
    ERROR_CODES.TooMany,
] as const;

export const WARN_CODES = {
    Na: "",
    SomeTooLong: "some_too_long",
    TooLong: "too_long",
    TooMany: "too_many",
} as const;

const WARN_CODE_VALUES = [
    WARN_CODES.Na,
    WARN_CODES.SomeTooLong,
    WARN_CODES.TooLong,
    WARN_CODES.TooMany,
] as const;

const CommonFieldSchema = z.object({
    isUpdated: z.boolean(),
    validation: z.object({
        errorCode: z.enum(ERROR_CODE_VALUES),
        warnCode: z.enum(WARN_CODE_VALUES),
    }),
});

export type CommonField = z.infer<typeof CommonFieldSchema>;

export const FIELD_KEYS = {
    Choices: "choices",
    DefaultChoice: "defaultChoice",
    DisplayOrder: "displayOrder",
    Label: "label",
    Multiselect: "multiselect",
    NewChoice: "newChoice",
    Required: "required",
} as const;

export const StateSchema = z.object({
    fields: z.object({
        [FIELD_KEYS.Choices]: CommonFieldSchema.extend({
            value: z.array(z.string()).min(1),
        }),
        [FIELD_KEYS.DefaultChoice]: CommonFieldSchema.extend({
            value: z.string(),
        }),
        [FIELD_KEYS.DisplayOrder]: CommonFieldSchema.extend({
            value: z.enum(DISPLAY_ORDER_VALUES),
        }),
        [FIELD_KEYS.Label]: CommonFieldSchema.extend({
            value: z.string(),
        }),
        [FIELD_KEYS.Multiselect]: CommonFieldSchema.extend({
            value: z.boolean(),
        }),
        [FIELD_KEYS.NewChoice]: CommonFieldSchema.extend({
            value: z.string(),
        }),
        [FIELD_KEYS.Required]: CommonFieldSchema.extend({
            value: z.boolean(),
        }),
    }),
    updatedAt: z.number().nullable(),
});

export type State = z.infer<typeof StateSchema>;

export const INITIAL_STATE_VALIDATION: CommonField["validation"] = {
    errorCode: ERROR_CODES.Na,
    warnCode: WARN_CODES.Na,
};

export const INITIAL_STATE: State = {
    fields: {
        [FIELD_KEYS.Choices]: {
            isUpdated: false,
            validation: {
                errorCode: ERROR_CODES.Required,
                warnCode: WARN_CODES.Na,
            },
            value: [],
        },
        [FIELD_KEYS.DefaultChoice]: {
            isUpdated: false,
            validation: {
                errorCode: ERROR_CODES.Required,
                warnCode: WARN_CODES.Na,
            },
            value: "",
        },
        [FIELD_KEYS.DisplayOrder]: {
            isUpdated: false,
            validation: INITIAL_STATE_VALIDATION,
            value: DISPLAY_ORDER.AlphabeticallyAscending,
        },
        [FIELD_KEYS.Label]: {
            isUpdated: false,
            validation: {
                errorCode: ERROR_CODES.Required,
                warnCode: WARN_CODES.Na,
            },
            value: "",
        },
        [FIELD_KEYS.Multiselect]: {
            isUpdated: false,
            validation: INITIAL_STATE_VALIDATION,
            value: false,
        },
        [FIELD_KEYS.NewChoice]: {
            isUpdated: false,
            validation: INITIAL_STATE_VALIDATION,
            value: "",
        },
        [FIELD_KEYS.Required]: {
            isUpdated: false,
            validation: INITIAL_STATE_VALIDATION,
            value: true,
        },
    },
    updatedAt: null,
};

export const ACTION_TYPE = {
    AddNewChoice: "add_new_choice",
    RemoveChoice: "remove_choice",
    ResetAll: "resetAll",
    SetDefaultChoice: "set_default_choice",
    SetDisplayOrder: "set_display_order",
    SetLabel: "set_label",
    SetMultiselect: "set_multiselect",
    SetNewChoice: "set_new_choice",
    SetNewState: "set_new_state",
    SetRequired: "set_required",
} as const;

export type Action =
    | {
          type: typeof ACTION_TYPE.AddNewChoice;
      }
    | {
          type: typeof ACTION_TYPE.RemoveChoice;
          value: number;
      }
    | {
          type: typeof ACTION_TYPE.ResetAll;
      }
    | {
          type: typeof ACTION_TYPE.SetDefaultChoice;
          value: State["fields"]["defaultChoice"]["value"];
      }
    | {
          type: typeof ACTION_TYPE.SetDisplayOrder;
          value: State["fields"]["displayOrder"]["value"];
      }
    | {
          type: typeof ACTION_TYPE.SetLabel;
          value: State["fields"]["label"]["value"];
      }
    | {
          type: typeof ACTION_TYPE.SetMultiselect;
          value: State["fields"]["multiselect"]["value"];
      }
    | {
          type: typeof ACTION_TYPE.SetNewChoice;
          value: State["fields"]["newChoice"]["value"];
      }
    | {
          type: typeof ACTION_TYPE.SetNewState;
          value: State;
      }
    | {
          type: typeof ACTION_TYPE.SetRequired;
          value: State["fields"]["required"]["value"];
      };
export type ContextValue = [State, Dispatch<Action>];

export const BeDataResponseSchema = z
    .object({
        choices: z
            .array(z.string())
            .min(1, { message: "Provide at least one choice." }),
        default: z.string(),
        displayOrder: z.enum(DISPLAY_ORDER_VALUES, {
            message: "Invalid display order selected.",
        }),
        label: z
            .string()
            // TODO: Disabled just for testing purposes to reproduce a failing API requests
            // .min(2, { message: "Label must be at least 2 characters long." })
            .min(1, { message: "Label cannot be empty." }),
        multiselect: z.boolean({
            message: "Multiselect must be a boolean value.",
        }),
        required: z.boolean({ message: "Required must be a boolean value." }),
    })
    .refine(
        (data) => {
            const uniqueValues = new Set([...data.choices, data.default]);
            return uniqueValues.size <= 5;
        },
        {
            message:
                "Choices and default must form a set of unique values with up to 5 elements.",
            path: ["choices", "default"],
        },
    );

export type BeDataResponse = z.infer<typeof BeDataResponseSchema>;
