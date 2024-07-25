/**
 * src/BuilderContext/useBuilder.ts
 *
 * This file defines the `useBuilder` hook, which provides access to the builder context and
 * various state management functions. The hook ensures it is used within a `Provider`,
 * and provides utility functions to interact with the builder state, including adding,
 * removing, and resetting choices, as well as setting various field values. It also
 * includes state validation to check for errors and warnings, and logs the state changes
 * to the console.
 */

import { useCallback, useContext } from "react";
import { ACTION_TYPE, type State } from "../models";
import Context from "./Context";

export default function useBuilder() {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error("::: Error! Must be used within a Provider!");
    }

    const [state, dispatch] = context;

    const hasErrors = Object.values(state.fields).some(
        ({ validation }) => validation.errorCode,
    );

    const hasWarns = Object.values(state.fields).some(
        ({ validation }) => validation.warnCode,
    );

    const addNewChoice = useCallback(() => {
        dispatch({ type: ACTION_TYPE.AddNewChoice });
    }, [dispatch]);

    const removeChoice = useCallback(
        (value: number) => {
            dispatch({ type: ACTION_TYPE.RemoveChoice, value });
        },
        [dispatch],
    );

    const resetAll = useCallback(() => {
        dispatch({ type: ACTION_TYPE.ResetAll });
    }, [dispatch]);

    const setDefaultChoice = useCallback(
        (value: State["fields"]["defaultChoice"]["value"]) => {
            dispatch({
                type: ACTION_TYPE.SetDefaultChoice,
                value,
            });
        },
        [dispatch],
    );

    const setDisplayOrder = useCallback(
        (value: State["fields"]["displayOrder"]["value"]) => {
            dispatch({
                type: ACTION_TYPE.SetDisplayOrder,
                value,
            });
        },
        [dispatch],
    );

    const setLabel = useCallback(
        (value: State["fields"]["label"]["value"]) => {
            dispatch({
                type: ACTION_TYPE.SetLabel,
                value,
            });
        },
        [dispatch],
    );

    const setMultiselect = useCallback(
        (value: State["fields"]["multiselect"]["value"]) => {
            dispatch({
                type: ACTION_TYPE.SetMultiselect,
                value,
            });
        },
        [dispatch],
    );

    const setNewChoice = useCallback(
        (value: State["fields"]["newChoice"]["value"]) => {
            dispatch({
                type: ACTION_TYPE.SetNewChoice,
                value,
            });
        },
        [dispatch],
    );

    const setNewState = useCallback(
        (value: State) => {
            dispatch({
                type: ACTION_TYPE.SetNewState,
                value,
            });
        },
        [dispatch],
    );

    const setRequired = useCallback(
        (value: State["fields"]["required"]["value"]) => {
            dispatch({
                type: ACTION_TYPE.SetRequired,
                value,
            });
        },
        [dispatch],
    );

    return {
        addNewChoice,
        hasErrors,
        hasWarns,
        state,
        removeChoice,
        resetAll,
        setDefaultChoice,
        setDisplayOrder,
        setLabel,
        setMultiselect,
        setNewChoice,
        setNewState,
        setRequired,
    };
}
