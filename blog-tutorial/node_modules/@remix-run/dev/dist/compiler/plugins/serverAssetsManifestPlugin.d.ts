import type { Plugin } from "esbuild";
export declare type AssetsManifestPromiseRef = {
    current?: Promise<unknown>;
};
/**
 * Creates a virtual module called `@remix-run/dev/assets-manifest` that exports
 * the assets manifest. This is used in the server entry module to access the
 * assets manifest in the server build.
 */
export declare function serverAssetsManifestPlugin(assetsManifestPromiseRef: AssetsManifestPromiseRef): Plugin;
