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

const remixSetup = /\s*remix\s+setup\s*/;
const remixSetupRuntime = /\s*remix\s+setup\s+(\w+)\s*/;
const onlyRemixSetup = new RegExp(`^${remixSetup.source}$`);
const onlyRemixSetupRuntime = new RegExp(`^${remixSetupRuntime.source}$`);

exports.onlyRemixSetup = onlyRemixSetup;
exports.onlyRemixSetupRuntime = onlyRemixSetupRuntime;
exports.remixSetup = remixSetup;
exports.remixSetupRuntime = remixSetupRuntime;
