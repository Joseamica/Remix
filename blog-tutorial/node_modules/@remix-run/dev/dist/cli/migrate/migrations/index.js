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

var index = require('./convert-to-javascript/index.js');
var index$1 = require('./replace-remix-imports/index.js');

const migrations = [{
  id: "convert-to-javascript",
  description: "Converts your TS project to a JS project",
  function: index.convertToJavaScript
}, {
  id: "replace-remix-imports",
  description: "Replaces `remix` imports with `@remix-run/*` imports",
  function: index$1.replaceRemixImports
}];

exports.migrations = migrations;
