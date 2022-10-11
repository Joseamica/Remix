import type { ComponentType, ReactNode } from "react";
import type { Params } from "react-router";
import type { RouteModules, ShouldReloadFunction } from "./routeModules";
import type { Submission } from "./transition";
export interface RouteManifest<Route> {
    [routeId: string]: Route;
}
interface Route {
    caseSensitive?: boolean;
    id: string;
    path?: string;
    index?: boolean;
}
export interface EntryRoute extends Route {
    hasAction: boolean;
    hasLoader: boolean;
    hasCatchBoundary: boolean;
    hasErrorBoundary: boolean;
    imports?: string[];
    module: string;
    parentId?: string;
}
export declare type RouteDataFunction = {
    (args: {
        /**
         * Parsed params from the route path
         */
        params: Params;
        /**
         * The url to be loaded, resolved to the matched route.
         */
        url: URL;
        /**
         * Will be present if being called from `<Form>` or `useSubmit`
         */
        submission?: Submission;
        /**
         * Attach this signal to fetch (or whatever else) to abort your
         * implementation when a load/action is aborted.
         */
        signal: AbortSignal;
    }): Promise<any> | any;
};
export interface ClientRoute extends Route {
    loader?: RouteDataFunction;
    action: RouteDataFunction;
    shouldReload?: ShouldReloadFunction;
    ErrorBoundary?: any;
    CatchBoundary?: any;
    children?: ClientRoute[];
    element: ReactNode;
    module: string;
    hasLoader: boolean;
}
declare type RemixRouteComponentType = ComponentType<{
    id: string;
}>;
export declare function createClientRoute(entryRoute: EntryRoute, routeModulesCache: RouteModules, Component: RemixRouteComponentType): ClientRoute;
export declare function createClientRoutes(routeManifest: RouteManifest<EntryRoute>, routeModulesCache: RouteModules, Component: RemixRouteComponentType, parentId?: string): ClientRoute[];
export {};
