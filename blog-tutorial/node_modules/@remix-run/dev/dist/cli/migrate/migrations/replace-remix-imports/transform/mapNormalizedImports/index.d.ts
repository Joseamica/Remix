import type { NormalizedImport } from "../normalizeImports";
import type { Adapter, Runtime } from "./packageExports";
export declare type MappedNormalizedImports = ReturnType<typeof mapNormalizedImports>;
export declare type MapNormalizedImportsArgs = {
    adapter?: Adapter;
    normalizedImports: NormalizedImport[];
    runtime: Runtime;
};
export declare const mapNormalizedImports: ({ adapter, normalizedImports, runtime, }: MapNormalizedImportsArgs) => {
    [x: string]: NormalizedImport[];
    react: NormalizedImport[];
    remix: NormalizedImport[];
};
