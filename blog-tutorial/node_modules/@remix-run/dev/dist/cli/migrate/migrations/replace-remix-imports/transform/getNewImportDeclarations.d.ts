import type { JSCodeshift } from "jscodeshift";
import type { MappedNormalizedImports } from "./mapNormalizedImports";
export declare const getNewImportDeclarations: (j: JSCodeshift, mappedNormalizedImports: MappedNormalizedImports) => (import("ast-types").namedTypes.ImportDeclaration | null)[];
