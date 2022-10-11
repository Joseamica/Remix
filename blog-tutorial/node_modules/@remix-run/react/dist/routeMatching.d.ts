import type { Location } from "history";
import type { Params } from "react-router";
import type { ClientRoute } from "./routes";
export interface RouteMatch<Route> {
    params: Params;
    pathname: string;
    route: Route;
}
export declare function matchClientRoutes(routes: ClientRoute[], location: Location | string): RouteMatch<ClientRoute>[] | null;
