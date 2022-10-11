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
var config = require('../../../../config.js');
var jscodeshift = require('../../jscodeshift.js');
var cleanupPackageJson = require('./cleanupPackageJson.js');
var convertTSConfigs = require('./convertTSConfigs.js');
var index = require('./convertTSFilesToJS/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);

const TRANSFORM_PATH = path.join(__dirname, "transform");
const convertToJavaScript = async (projectDir, flags = {}) => {
  let config$1 = await config.readConfig(projectDir); // 1. Rename all tsconfig.json files to jsconfig.json

  convertTSConfigs.convertTSConfigs(config$1.rootDirectory); // 2. Remove @types/* & TypeScript dependencies + `typecheck` script from `package.json`

  await cleanupPackageJson.cleanupPackageJson(config$1.rootDirectory); // 3. Run codemod

  let files = glob__default["default"].sync("**/*.+(ts|tsx)", {
    absolute: true,
    cwd: config$1.rootDirectory,
    ignore: [`./${config$1.appDirectory}/**/*`, "**/node_modules/**"]
  });
  let codemodOk = await jscodeshift.run({
    files,
    flags,
    transformPath: TRANSFORM_PATH
  });

  if (!codemodOk) {
    console.error("❌ I couldn't update your imports to JS.");

    if (flags.interactive && !flags.debug) {
      console.log("👉 Try again with the `--debug` flag to see what failed.");
    }

    process.exit(1);
  } // 4. Convert all .ts files to .js


  index.convertTSFilesToJS(config$1.rootDirectory);

  if (flags.interactive) {
    console.log("✅ Your JavaScript looks good!");
    console.log("\n🚚 I've successfully migrated your project! 🎉");
  }
};

exports.convertToJavaScript = convertToJavaScript;
