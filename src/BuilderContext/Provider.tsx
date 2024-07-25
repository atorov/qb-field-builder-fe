import { useReducer, type ReactNode } from "react";
import { INITIAL_STATE } from "../models";
import Context from "./Context";
import reducer from "./reducer";

export default function Provider(props: { children: ReactNode }) {
    const value = useReducer(reducer, INITIAL_STATE);

    return (
        <Context.Provider value={value} {...props}>
            {props.children}
        </Context.Provider>
    );
}
