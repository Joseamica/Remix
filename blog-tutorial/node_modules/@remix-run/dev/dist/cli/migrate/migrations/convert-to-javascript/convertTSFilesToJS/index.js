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

var path = require('path');
var glob = require('fast-glob');
var fse = require('fs-extra');
var convertTSFileToJS = require('./convertTSFileToJS.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);

const convertTSFilesToJS = projectDir => {
  let entries = glob__default["default"].sync("**/*.+(ts|tsx)", {
    absolute: true,
    cwd: projectDir,
    ignore: ["**/node_modules/**"]
  });
  entries.forEach(entry => {
    if (entry.endsWith(".d.ts")) {
      return fse.removeSync(entry);
    }

    let contents = fse.readFileSync(entry, "utf8");
    let filename = path.basename(entry);
    let javascript = convertTSFileToJS.convertTSFileToJS({
      filename,
      projectDir,
      source: contents
    });
    fse.writeFileSync(entry, javascript, "utf8");
    fse.renameSync(entry, entry.replace(".ts", ".js"));
  });
};

exports.convertTSFilesToJS = convertTSFilesToJS;
