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

var fse = require('fs-extra');
var colors = require('../../colors.js');
var index = require('./migrations/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fse__default = /*#__PURE__*/_interopDefaultLegacy(fse);

const parseMigration = migrationId => {
  let migration = index.migrations.find(({
    id
  }) => id === migrationId);

  if (migration === undefined) {
    throw Error(`
${colors.error("Invalid migration. Pick one of:")}
${index.migrations.map(m => colors.error(`- ${m.id}`)).join("\n")}
    `);
  }

  return migration;
};

const checkProjectDir = projectDir => {
  if (!fse__default["default"].existsSync(projectDir)) {
    throw Error(`Project path does not exist: ${projectDir}`);
  }

  if (!fse__default["default"].lstatSync(projectDir).isDirectory()) {
    throw Error(`Project path is not a directory: ${projectDir}`);
  }

  return projectDir;
};

const run = async input => {
  let projectDir = checkProjectDir(input.projectDir);
  let migration = parseMigration(input.migrationId);
  return migration.function(projectDir, input.flags);
};

exports.run = run;
