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

var inquirer = require('inquirer');
var checkGitStatus = require('../checkGitStatus.js');
var index = require('./migrations/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var inquirer__default = /*#__PURE__*/_interopDefaultLegacy(inquirer);

const resolveProjectDir = input => {
  return input || process.env.REMIX_ROOT || process.cwd();
};

const resolveMigrationId = async input => {
  if (input !== undefined) return input;
  let {
    migrationId
  } = await inquirer__default["default"].prompt([{
    name: "migrationId",
    message: "Which migration would you like to apply?",
    type: "list",
    pageSize: index.migrations.length + 1,
    choices: [...index.migrations.map(({
      id,
      description
    }) => ({
      name: `${id}: ${description}`,
      value: id
    })), {
      name: "Nevermind...",
      value: undefined
    }]
  }]);

  if (migrationId === undefined) {
    // user selected "Nevermind..."
    process.exit(0);
  }

  return migrationId;
};

const resolveInput = async (input, flags) => {
  let projectDir = resolveProjectDir(input.projectId);

  if (!flags.dry) {
    checkGitStatus.checkGitStatus(projectDir, {
      force: flags.force
    });
  }

  let migrationId = await resolveMigrationId(input.migrationId);
  return {
    projectDir,
    migrationId
  };
};

exports.resolveInput = resolveInput;
