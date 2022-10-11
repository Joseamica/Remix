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
var JSON5 = require('json5');
var prettier = require('prettier');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);
var JSON5__default = /*#__PURE__*/_interopDefaultLegacy(JSON5);
var prettier__default = /*#__PURE__*/_interopDefaultLegacy(prettier);

const convertTSConfigs = projectDir => {
  let tsConfigPaths = glob__default["default"].sync("**/tsconfig.json", {
    absolute: true,
    cwd: projectDir,
    ignore: ["**/node_modules/**"]
  });
  tsConfigPaths.forEach(tsConfigPath => {
    let contents = fse.readFileSync(tsConfigPath, "utf8");
    let tsConfigJson = JSON5__default["default"].parse(contents);
    let newTSConfig = { ...tsConfigJson,
      include: (tsConfigJson.include || []).map(include => {
        if (include === "remix.env.d.ts") {
          return null;
        }

        if (include === "**/*.ts") {
          return "**/*.js";
        }

        if (include === "**/*.tsx") {
          return "**/*.jsx";
        }

        return include;
      }).filter(include => include !== null)
    };
    fse.writeFileSync(tsConfigPath, prettier__default["default"].format(JSON.stringify(newTSConfig, null, 2), {
      parser: "json"
    }), "utf8");
    let dir = path.dirname(tsConfigPath);
    fse.renameSync(tsConfigPath, path.join(dir, "jsconfig.json"));
  });
};

exports.convertTSConfigs = convertTSConfigs;
