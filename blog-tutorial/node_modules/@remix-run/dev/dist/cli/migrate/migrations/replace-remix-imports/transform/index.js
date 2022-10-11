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

var getNewImportDeclarations = require('./getNewImportDeclarations.js');
var getRemixImports = require('./getRemixImports.js');
var index$1 = require('./mapNormalizedImports/index.js');
var normalizeImports = require('./normalizeImports.js');

const transform = (file, api, options) => {
  let j = api.jscodeshift;
  let root = j(file.source);
  let remixImports = getRemixImports.getRemixImports(j, root);

  if (remixImports.length === 0) {
    // This transform doesn't need to run if there are no `remix` imports
    return null;
  } // https://github.com/facebook/jscodeshift/blob/main/recipes/retain-first-comment.md


  let getFirstNode = () => root.find(j.Program).get("body", 0).node;

  let oldFirstNode = getFirstNode();
  let normalizedImports = normalizeImports.normalizeImports(remixImports);
  let mappedNormalizedImports = index$1.mapNormalizedImports({
    adapter: options.adapter,
    normalizedImports,
    runtime: options.runtime
  });
  let newImportDeclarations = getNewImportDeclarations.getNewImportDeclarations(j, mappedNormalizedImports);
  let firstRemixImport = remixImports.at(0);
  newImportDeclarations.forEach(newImportDeclaration => {
    firstRemixImport.insertBefore(newImportDeclaration);
  });
  remixImports.forEach(oldRemixImport => {
    j(oldRemixImport).remove();
  }); // If the first node has been modified or deleted, reattach the comments

  let newFirstNode = getFirstNode();

  if (newFirstNode !== oldFirstNode) {
    newFirstNode.comments = oldFirstNode.comments;
  }

  return root.toSource(options);
};

exports["default"] = transform;
