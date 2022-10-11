import type { ServerBuild } from "./build";
import type { ServerRoute } from "./routes";
import type { RouteMatch } from "./routeMatching";
export declare function getDocumentHeaders(build: ServerBuild, matches: RouteMatch<ServerRoute>[], routeLoaderResponses: Record<string, Response>, actionResponse?: Response): Headers;
