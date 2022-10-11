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

/**
 * `jscodeshift` doesn't support Typescript casting, nor typeguards.
 * https://github.com/facebook/jscodeshift/issues/467
 *
 * Do not import from this file for the `jscodeshift` transform.
 */
const adapters = ["architect", "cloudflare-pages", "cloudflare-workers", "express", "netlify", "vercel"];
const isAdapter = maybe => {
  return adapters.includes(maybe);
};

exports.isAdapter = isAdapter;
