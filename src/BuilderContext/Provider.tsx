/**
 * src/BuilderContext/Provider.tsx
 *
 * This file defines a `Provider` component that sets up and manages the state for the builder application.
 * It uses `useReducer` to initialize the state with the saved state from localStorage or the initial state.
 * The state is debounced using the `useDebounce` hook to limit the frequency of state updates.
 * The debounced state is saved to localStorage whenever it changes.
 * The component provides the state and dispatch function to its children via the `BuilderContext`.
 */

import { useEffect, useReducer, type ReactNode } from "react";
import { DEBOUNCING_PERIOD, STORAGE_KEY } from "../models";
import useDebounce from "../shared/useDebounce";
import Context from "./Context";
import loadState from "./loadState";
import reducer from "./reducer";
import saveState from "./saveState";

export default function Provider(props: { children: ReactNode }) {
    const initState = loadState(STORAGE_KEY);

    const value = useReducer(reducer, initState);

    const state = value[0];

    const debState = useDebounce(state, DEBOUNCING_PERIOD);

    useEffect(() => {
        saveState(debState, STORAGE_KEY);
    }, [debState]);

    return (
        <Context.Provider value={value} {...props}>
            {props.children}
        </Context.Provider>
    );
}
