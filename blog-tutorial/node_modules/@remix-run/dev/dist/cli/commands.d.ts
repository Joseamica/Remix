import type { RemixConfig } from "../config";
export * as migrate from "./migrate";
export declare function create({ appTemplate, projectDir, remixVersion, installDeps, useTypeScript, githubToken, debug, }: {
    appTemplate: string;
    projectDir: string;
    remixVersion?: string;
    installDeps: boolean;
    useTypeScript: boolean;
    githubToken?: string;
    debug?: boolean;
}): Promise<void>;
declare type InitFlags = {
    deleteScript?: boolean;
};
export declare function init(projectDir: string, { deleteScript }?: InitFlags): Promise<void>;
export declare function setup(platformArg?: string): Promise<void>;
export declare function routes(remixRoot?: string, formatArg?: string): Promise<void>;
export declare function build(remixRoot: string, modeArg?: string, sourcemap?: boolean): Promise<void>;
declare type WatchCallbacks = {
    onRebuildStart?(): void;
    onInitialBuild?(): void;
};
export declare function watch(remixRootOrConfig: string | RemixConfig, modeArg?: string, callbacks?: WatchCallbacks): Promise<void>;
export declare function dev(remixRoot: string, modeArg?: string, portArg?: number): Promise<void>;
