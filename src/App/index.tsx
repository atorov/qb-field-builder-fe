/**
 * src/App/index.tsx
 *
 * This file sets up the main application component. It uses the `QueryClientProvider` from `@tanstack/react-query`
 * to provide the React Query client to the application. The `BuilderProvider` is used to wrap the `Builder` component,
 * providing context for the builder. Additionally, it includes the `ReactQueryDevtools` for debugging React Query.
 * The theme styles are imported from `theme.css`.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Builder from "../Builder";
import BuilderProvider from "../BuilderContext/Provider";
import "./theme.css";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BuilderProvider>
                <Builder />
            </BuilderProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
