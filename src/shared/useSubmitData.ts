import { useMutation } from "@tanstack/react-query";
import useBuilder from "../BuilderContext/useBuilder";
import beToFeDataAdapter from "./beToFeDataAdapter";
import feToBeDataAdapter from "./feToBeDataAdapter";

export default function useSubmitData() {
    const { state, setNewState } = useBuilder();

    return useMutation({
        mutationFn: async () => {
            const data = feToBeDataAdapter(state);

            const res = await fetch(
                "https://qb-field-builder-api-production.up.railway.app/api/builder",
                // "http://localhost:3000/api/builder",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify(data),
                },
            );

            const resData = await res.json();

            if (!res.ok) {
                throw new Error(`${res.status} ${resData?.message}`);
            }

            return beToFeDataAdapter(resData, state);
        },
        onSuccess: (data) => {
            setNewState(data);
        },
    });
}
