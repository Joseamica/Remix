import type { Submission } from "./transition";
export declare type AppData = any;
export declare type FormMethod = "get" | "post" | "put" | "patch" | "delete";
export declare type FormEncType = "application/x-www-form-urlencoded" | "multipart/form-data";
export declare function isCatchResponse(response: any): boolean;
export declare function isErrorResponse(response: any): boolean;
export declare function isRedirectResponse(response: any): boolean;
export declare function fetchData(url: URL, routeId: string, signal: AbortSignal, submission?: Submission): Promise<Response | Error>;
export declare function extractData(response: Response): Promise<AppData>;
