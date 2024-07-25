/**
 * src/BuilderContext/Context.ts
 *
 * This file creates and exports a React context named `BuilderContext`.
 * The context is initialized with an array containing the `INITIAL_STATE` and a function that returns the `INITIAL_STATE`.
 * This context is used to manage and provide the state for the builder components throughout the application.
 */

import { createContext } from "react";
import { type ContextValue, INITIAL_STATE } from "../models";

const Context = createContext<ContextValue>([
    INITIAL_STATE,
    () => INITIAL_STATE,
]);
Context.displayName = "BuilderContext";

export default Context;
