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

var child_process = require('child_process');
var colors = require('../colors.js');

const checkGitStatus = (projectDir, {
  force = false
}) => {
  let clean = false;
  let errorMessage = "Unable to determine if git directory is clean";

  try {
    clean = isGitClean(projectDir);
    errorMessage = "Git directory is not clean";
  } catch (err) {
    var _err$stderr;

    if ((err === null || err === void 0 ? void 0 : (_err$stderr = err.stderr) === null || _err$stderr === void 0 ? void 0 : _err$stderr.indexOf("Not a git repository")) >= 0) {
      clean = true;
    }
  }

  if (clean) {
    return;
  }

  if (force) {
    console.log(colors.warning(`WARNING: ${errorMessage}. Forcibly continuing.`));
  } else {
    console.log(colors.warning("\nBefore we continue, please stash or commit your git changes."));
    console.log("\nYou may use the --force flag to override this safety check.");
    process.exit(1);
  }
};
const TEN_MEBIBYTE = 1024 * 1024 * 10;

const isGitClean = (dir = process.cwd()) => {
  var _execFileSync;

  return (// Simplified version of `sync` method of `is-git-clean` package
    !((_execFileSync = child_process.execFileSync("git", ["status", "--porcelain"], {
      cwd: dir,
      encoding: "utf8",
      maxBuffer: TEN_MEBIBYTE
    })) !== null && _execFileSync !== void 0 && _execFileSync.trim())
  );
};

exports.checkGitStatus = checkGitStatus;
