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
