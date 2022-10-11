export declare type Exports = {
    type: string[];
    value: string[];
};
export declare type Adapter = "architect" | "cloudflare-pages" | "cloudflare-workers" | "express" | "netlify" | "vercel";
export declare const adapters: Adapter[];
export declare type Runtime = "cloudflare" | "node";
export declare const runtimes: Runtime[];
export declare type Package = Adapter | Runtime | "react";
export declare const packageExports: Record<Package, Exports>;
