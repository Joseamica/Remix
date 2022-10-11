export declare enum BuildMode {
    Development = "development",
    Production = "production",
    Test = "test"
}
export declare function isBuildMode(mode: any): mode is BuildMode;
export declare enum BuildTarget {
    Browser = "browser",
    Server = "server",
    CloudflareWorkers = "cloudflare-workers",
    Node14 = "node14"
}
export declare function isBuildTarget(target: any): target is BuildTarget;
export interface BuildOptions {
    mode: BuildMode;
    target: BuildTarget;
}
