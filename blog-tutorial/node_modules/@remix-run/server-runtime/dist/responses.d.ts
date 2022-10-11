export declare type JsonFunction = <Data extends unknown>(data: Data, init?: number | ResponseInit) => TypedResponse<Data>;
export declare type TypedResponse<T extends unknown = unknown> = Response & {
    json(): Promise<T>;
};
/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 *
 * @see https://remix.run/api/remix#json
 */
export declare const json: JsonFunction;
export declare type RedirectFunction = (url: string, init?: number | ResponseInit) => TypedResponse<never>;
/**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 *
 * @see https://remix.run/api/remix#redirect
 */
export declare const redirect: RedirectFunction;
export declare function isResponse(value: any): value is Response;
export declare function isRedirectResponse(response: Response): boolean;
export declare function isCatchResponse(response: Response): boolean;
