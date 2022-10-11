import type { AppState } from "./errors";
import type { RouteManifest, ServerRouteManifest, EntryRoute, ServerRoute } from "./routes";
import type { RouteData } from "./routeData";
import type { RouteMatch } from "./routeMatching";
import type { RouteModules, EntryRouteModule } from "./routeModules";
export interface EntryContext {
    appState: AppState;
    manifest: AssetsManifest;
    matches: RouteMatch<EntryRoute>[];
    routeData: RouteData;
    actionData?: RouteData;
    routeModules: RouteModules<EntryRouteModule>;
    serverHandoffString?: string;
}
export interface AssetsManifest {
    entry: {
        imports: string[];
        module: string;
    };
    routes: RouteManifest<EntryRoute>;
    url: string;
    version: string;
}
export declare function createEntryMatches(matches: RouteMatch<ServerRoute>[], routes: RouteManifest<EntryRoute>): RouteMatch<EntryRoute>[];
export declare function createEntryRouteModules(manifest: ServerRouteManifest): RouteModules<EntryRouteModule>;
