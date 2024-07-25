import {
    type BeDataResponse,
    BeDataResponseSchema,
    type State,
    StateSchema,
} from "../models";

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
