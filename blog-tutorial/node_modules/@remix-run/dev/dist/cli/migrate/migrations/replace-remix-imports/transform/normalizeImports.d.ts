import type { Collection, ImportDeclaration } from "jscodeshift";
export declare type NormalizedImport = Pick<ImportDeclaration, "importKind"> & {
    alias: string;
    name: string;
};
export declare const normalizeImports: (allImports: Collection<ImportDeclaration>) => NormalizedImport[];
