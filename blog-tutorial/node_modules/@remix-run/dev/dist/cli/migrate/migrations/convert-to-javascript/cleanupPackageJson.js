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

var NpmCliPackageJson = require('@npmcli/package-json');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var NpmCliPackageJson__default = /*#__PURE__*/_interopDefaultLegacy(NpmCliPackageJson);

const removeUnusedDevDependencies = (devDependencies = {}) => Object.fromEntries(Object.entries(devDependencies).filter(([name]) => !name.startsWith("@types/") && name !== "typescript"));

const cleanupPackageJson = async projectDir => {
  let packageJson = await NpmCliPackageJson__default["default"].load(projectDir);
  let {
    devDependencies,
    scripts: {
      typecheck,
      ...scripts
    } = {}
  } = packageJson.content;
  packageJson.update({
    devDependencies: removeUnusedDevDependencies(devDependencies),
    scripts
  }); // write updates to package.json

  return packageJson.save();
};

exports.cleanupPackageJson = cleanupPackageJson;
