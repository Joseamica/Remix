import type { ServerRouteModule } from "./routeModules";
export interface RouteManifest<Route> {
    [routeId: string]: Route;
}
export declare type ServerRouteManifest = RouteManifest<Omit<ServerRoute, "children">>;
interface Route {
    index?: boolean;
    caseSensitive?: boolean;
    id: string;
    parentId?: string;
    path?: string;
}
export interface EntryRoute extends Route {
    hasAction: boolean;
    hasLoader: boolean;
    hasCatchBoundary: boolean;
    hasErrorBoundary: boolean;
    imports?: string[];
    module: string;
}
export interface ServerRoute extends Route {
    children: ServerRoute[];
    module: ServerRouteModule;
}
export declare function createRoutes(manifest: ServerRouteManifest, parentId?: string): ServerRoute[];
export {};
