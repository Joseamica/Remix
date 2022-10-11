/**
 * @remix-run/dev v1.7.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const orgName = "@remix-run";

const getImportDeclarationForImportKind = ({
  importKind,
  imports,
  j,
  packageName
}) => {
  let importsForKind = imports.filter(imprt => imprt.importKind === importKind);

  if (importsForKind.length === 0) {
    return null;
  }

  return j.importDeclaration(importsForKind.sort((a, b) => a.name.localeCompare(b.name)).map(({
    alias,
    name
  }) => j.importSpecifier(j.identifier(name), j.identifier(alias))), j.stringLiteral(packageName === "remix" ? packageName : `${orgName}/${packageName}`), importKind);
};

const getNewImportDeclarations = (j, mappedNormalizedImports) => Object.entries(mappedNormalizedImports).sort(([packageAName], [packageBName]) => packageAName.localeCompare(packageBName)).flatMap(([packageName, imports]) => [getImportDeclarationForImportKind({
  importKind: "type",
  imports,
  j,
  packageName
}), getImportDeclarationForImportKind({
  importKind: "value",
  imports,
  j,
  packageName
})]);

exports.getNewImportDeclarations = getNewImportDeclarations;
