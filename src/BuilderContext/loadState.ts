/**
 * src/BuilderContext/loadState.ts
 *
 * This file defines a function `loadState` that retrieves a saved state from localStorage.
 * It attempts to load and parse the state associated with the provided `itemKey`.
 * If successful, it merges the saved state with the `INITIAL_STATE` and returns the resulting state.
 * If any error occurs during loading or parsing, it logs the error and returns the `INITIAL_STATE`.
 */

import { INITIAL_STATE, type State } from "../models";
export default function loadState(itemKey: string) {
    let saved: State | undefined = undefined;

    try {
        const serialized = localStorage.getItem(itemKey);

        if (serialized) {
            saved = JSON.parse(serialized);
        }
    } catch (reason) {
        console.error("::: Error! Couldn't load the state!", reason);
    }

    return {
        ...INITIAL_STATE,
        ...saved,
    };
}
