import type { Flags } from "./flags";
declare type Options = Record<string, unknown>;
declare type Args<TransformOptions extends Options = Options> = {
    files: string[];
    flags: Flags;
    transformOptions?: TransformOptions;
    transformPath: string;
};
export declare const run: <TransformOptions extends Options = Options>({ files, flags: { debug, dry, print, runInBand }, transformOptions, transformPath, }: Args<TransformOptions>) => Promise<boolean>;
export {};
