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
 * import { foo } from "foo"
 * import { foo as bar } from "foo"
 * =>
 * const { foo } = require("foo")
 * const { foo: bar } = require("foo")
 */
const createVariableDeclarationObjectPattern = (j, {
  source,
  specifiers
}) => {
  let callExpression = j.callExpression(j.identifier("require"), [source]);
  return j.variableDeclaration("const", [j.variableDeclarator(j.objectPattern((specifiers || []
  /**
   * HACK: Can't use casts nor type guards in a `jscodeshift` transform
   * https://github.com/facebook/jscodeshift/issues/467
   *
   * So to narrow specifier type, we use `flatMap` instead.
   * (`filter` can't narrow type without type guards)
   */
  ).flatMap(specifier => specifier.type === "ImportSpecifier" ? specifier : []).map(({
    imported: {
      name
    },
    local
  }) => j.property.from({
    key: j.identifier(name),
    kind: "init",
    value: j.identifier((local === null || local === void 0 ? void 0 : local.name) || name),
    shorthand: true
  }))), callExpression)]);
};

exports.createVariableDeclarationObjectPattern = createVariableDeclarationObjectPattern;
