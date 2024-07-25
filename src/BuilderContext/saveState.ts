import { type State } from "../models";

export default function saveState(state: State, itemKey: string) {
    try {
        const serialized = JSON.stringify(state);
        localStorage.setItem(itemKey, serialized);
    } catch (error) {
        console.error("::: Error! Could not save the state!", error);
    }
}
