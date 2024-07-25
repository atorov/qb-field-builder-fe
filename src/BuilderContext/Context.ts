import { createContext } from "react";
import { type ContextValue, INITIAL_STATE } from "../models";

const Context = createContext<ContextValue>([
    INITIAL_STATE,
    () => INITIAL_STATE,
]);
Context.displayName = "BuilderContext";

export default Context;
