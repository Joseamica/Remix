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
 * import "foo"
 * =>
 * require("foo")
 */
const createImportExpressionStatement = (j, {
  source
}) => {
  let callExpression = j.callExpression(j.identifier("require"), [source]);
  return j.expressionStatement(callExpression);
};

exports.createImportExpressionStatement = createImportExpressionStatement;
