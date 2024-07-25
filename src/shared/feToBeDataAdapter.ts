/**
 * src/shared/feToBeDataAdapter.ts
 *
 * This function takes a frontend state, validates it, and adapts it to a backend data response format.
 */

import {
    type BeDataResponse,
    BeDataResponseSchema,
    type State,
    StateSchema,
} from "../models";

/**
 * Adapts frontend state to backend data response.
 *
 * @param {State} state - The current state of the frontend.
 * @returns {BeDataResponse} - The data formatted for the backend.
 */
export default function feToBeDataAdapter(state: State): BeDataResponse {
    StateSchema.parse(state);

    return BeDataResponseSchema.parse({
        choices: state.fields.choices.value,
        default: state.fields.defaultChoice.value,
        displayOrder: state.fields.displayOrder.value,
        label: state.fields.label.value,
        multiselect: state.fields.multiselect.value,
        required: state.fields.required.value,
    });
}
