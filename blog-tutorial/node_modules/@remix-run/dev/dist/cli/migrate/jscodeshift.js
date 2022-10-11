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

var Runner = require('jscodeshift/src/Runner');

// @ts-expect-error `@types/jscodeshift` doesn't have types for this

const toCLIOptions = (options = {}) => Object.entries(options).filter(([_key, value]) => Boolean(value)).map(([key, value]) => `--${key}${typeof value === "boolean" ? "" : `=${value}`}`);

const run = async ({
  files,
  flags: {
    debug,
    dry,
    print,
    runInBand
  },
  transformOptions,
  transformPath
}) => {
  let options = {
    babel: true,
    // without this, `jscodeshift` will not be able to parse TS transforms
    dry,
    extensions: "tsx,ts,jsx,js",
    failOnError: true,
    ignorePattern: ["**/node_modules/**", "**/.cache/**", "**/build/**"],
    parser: "tsx",
    print,
    runInBand,
    verbose: 2,
    ...transformOptions
  };

  if (debug) {
    console.log(`Executing command: jscodeshift ${toCLIOptions(options).join(" ")}`);
  }

  try {
    let {
      error
    } = await Runner.run(transformPath, files, options);
    return error === 0;
  } catch (error) {
    return false;
  }
};

exports.run = run;
