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

var Collection = require('jscodeshift/src/Collection');

const checkNoImpossibleImports = (j, allImports) => {
  let defaultImports = allImports.find(j.ImportDefaultSpecifier);

  if (defaultImports.length > 0) {
    throw Error("There shouldn't be any default imports for `remix`. Please remove the default imports and try again.");
  }

  let sideEffectImports = allImports.filter(({
    node: {
      specifiers
    }
  }) => !specifiers || specifiers.length === 0);

  if (sideEffectImports.length > 0) {
    throw Error("There shouldn't be any side-effect imports for `remix`. Please remove the side-effect imports and try again.");
  }
};

const checkNoInvalidImports = (j, allImports) => {
  let namespaceImports = allImports.find(j.ImportNamespaceSpecifier);

  if (namespaceImports.length > 0) {
    throw Error("There shouldn't be any namespace imports for `remix`. Please replace the namespace imports with named imports and try again.");
  }
};

const getRemixImports = (j, root) => {
  let allRemixImports = root.find(j.ImportDeclaration, {
    source: {
      value: "remix"
    }
  });

  if (allRemixImports.length === 0) {
    return Collection.fromNodes([]);
  }

  checkNoImpossibleImports(j, allRemixImports);
  checkNoInvalidImports(j, allRemixImports);
  return allRemixImports;
};

exports.getRemixImports = getRemixImports;
