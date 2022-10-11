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

/**
 * import foo from "foo"
 * import * as foo from "foo"
 * =>
 * const foo = require("foo").default
 * const foo = require("foo")
 */
const createVariableDeclarationIdentifier = (j, {
  source,
  specifiers
}) => {
  var _flatMap$0$local;

  let callExpression = j.callExpression(j.identifier("require"), [source]);
  let isDefaultImport = (specifiers || []).some(({
    type
  }) => type === "ImportDefaultSpecifier");
  return j.variableDeclaration("const", [j.variableDeclarator(j.identifier(((_flatMap$0$local = (specifiers || []
  /**
   * HACK: Can't use casts nor type guards in a `jscodeshift` transform
   * https://github.com/facebook/jscodeshift/issues/467
   *
   * So to narrow specifier type, we use `flatMap` instead.
   * (`filter` can't narrow type without type guards)
   */
  ).flatMap(specifier => specifier.type === "ImportDefaultSpecifier" || specifier.type === "ImportNamespaceSpecifier" ? specifier : [])[0].local) === null || _flatMap$0$local === void 0 ? void 0 : _flatMap$0$local.name) || ""), isDefaultImport ? j.memberExpression(callExpression, j.identifier("default")) : callExpression)]);
};

exports.createVariableDeclarationIdentifier = createVariableDeclarationIdentifier;
