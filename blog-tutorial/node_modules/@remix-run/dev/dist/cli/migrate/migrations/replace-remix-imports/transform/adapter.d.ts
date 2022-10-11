/**
 * `jscodeshift` doesn't support Typescript casting, nor typeguards.
 * https://github.com/facebook/jscodeshift/issues/467
 *
 * Do not import from this file for the `jscodeshift` transform.
 */
declare const adapters: readonly ["architect", "cloudflare-pages", "cloudflare-workers", "express", "netlify", "vercel"];
export declare type Adapter = typeof adapters[number];
export declare const isAdapter: (maybe: string) => maybe is "netlify" | "vercel" | "cloudflare-pages" | "cloudflare-workers" | "express" | "architect";
export {};
