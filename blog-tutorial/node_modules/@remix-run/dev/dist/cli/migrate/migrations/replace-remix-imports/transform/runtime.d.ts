/**
 * `jscodeshift` doesn't support Typescript casting, nor typeguards.
 * https://github.com/facebook/jscodeshift/issues/467
 *
 * Do not import from this file for the `jscodeshift` transform.
 */
export declare const runtimes: readonly ["cloudflare", "node"];
export declare type Runtime = typeof runtimes[number];
export declare const isRuntime: (maybe: string) => maybe is "node" | "cloudflare";
