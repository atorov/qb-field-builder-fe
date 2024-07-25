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
