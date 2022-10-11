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

var index = require('./convert-to-javascript/transform/index.js');
var index$1 = require('./replace-remix-imports/transform/index.js');



exports.ConvertToJavaScriptTransform = index;
exports.ReplaceRemixImportsTransform = index$1;
