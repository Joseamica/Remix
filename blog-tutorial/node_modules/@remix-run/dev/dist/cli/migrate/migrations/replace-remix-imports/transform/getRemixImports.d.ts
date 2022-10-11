import type { Collection, ImportDeclaration, JSCodeshift } from "jscodeshift";
export declare const getRemixImports: (j: JSCodeshift, root: Collection<any>) => Collection<ImportDeclaration>;
