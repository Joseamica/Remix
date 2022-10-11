import * as esbuild from "esbuild";
import { BuildMode, BuildTarget } from "./build";
import type { RemixConfig } from "./config";
interface BuildConfig {
    mode: BuildMode;
    target: BuildTarget;
    sourcemap: boolean;
}
export declare type BuildError = Error | esbuild.BuildFailure;
export declare function formatBuildFailure(failure: BuildError): void;
interface BuildOptions extends Partial<BuildConfig> {
    onWarning?(message: string, key: string): void;
    onBuildFailure?(failure: Error | esbuild.BuildFailure): void;
}
export declare function build(config: RemixConfig, { mode, target, sourcemap, onWarning, onBuildFailure, }?: BuildOptions): Promise<void>;
interface WatchOptions extends BuildOptions {
    onRebuildStart?(): void;
    onRebuildFinish?(): void;
    onFileCreated?(file: string): void;
    onFileChanged?(file: string): void;
    onFileDeleted?(file: string): void;
    onInitialBuild?(): void;
}
export declare function watch(config: RemixConfig, { mode, target, sourcemap, onWarning, onBuildFailure, onRebuildStart, onRebuildFinish, onFileCreated, onFileChanged, onFileDeleted, onInitialBuild, }?: WatchOptions): Promise<() => Promise<void>>;
export {};
