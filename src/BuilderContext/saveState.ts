/**
 * src/BuilderContext/saveState.ts
 *
 * This file defines a function `saveState` that saves the provided state to localStorage.
 * It attempts to serialize the state as a JSON string and store it under the given `itemKey`.
 * If any error occurs during the serialization or storage process, it logs the error to the console.
 */

import { type State } from "../models";

export default function saveState(state: State, itemKey: string) {
    try {
        const serialized = JSON.stringify(state);
        localStorage.setItem(itemKey, serialized);
    } catch (error) {
        console.error("::: Error! Could not save the state!", error);
    }
}
