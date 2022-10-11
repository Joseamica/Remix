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

exports.BuildMode = void 0;

(function (BuildMode) {
  BuildMode["Development"] = "development";
  BuildMode["Production"] = "production";
  BuildMode["Test"] = "test";
})(exports.BuildMode || (exports.BuildMode = {}));

function isBuildMode(mode) {
  return mode === exports.BuildMode.Development || mode === exports.BuildMode.Production || mode === exports.BuildMode.Test;
}
exports.BuildTarget = void 0;

(function (BuildTarget) {
  BuildTarget["Browser"] = "browser";
  BuildTarget["Server"] = "server";
  BuildTarget["CloudflareWorkers"] = "cloudflare-workers";
  BuildTarget["Node14"] = "node14";
})(exports.BuildTarget || (exports.BuildTarget = {}));

exports.isBuildMode = isBuildMode;
