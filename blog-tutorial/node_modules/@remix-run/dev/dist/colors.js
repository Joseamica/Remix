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

var chalk = require('chalk');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

const useColor = chalk.supportsColor && // https://no-color.org/
!process.env.NO_COLOR;

const K = x => x;

const heading = useColor ? chalk__default["default"].underline : K;
const arg = useColor ? chalk__default["default"].yellowBright : K;
const error = useColor ? chalk__default["default"].red : K;
const warning = useColor ? chalk__default["default"].yellow : K;
useColor ? chalk__default["default"].blue : K;
const logoBlue = useColor ? chalk__default["default"].blueBright : K;
const logoGreen = useColor ? chalk__default["default"].greenBright : K;
const logoYellow = useColor ? chalk__default["default"].yellowBright : K;
const logoPink = useColor ? chalk__default["default"].magentaBright : K;
const logoRed = useColor ? chalk__default["default"].redBright : K;
const gray = useColor ? chalk__default["default"].gray : K;
const blue = useColor ? chalk__default["default"].blue : K;
const bold = useColor ? chalk__default["default"].bold : K;

exports.arg = arg;
exports.blue = blue;
exports.bold = bold;
exports.error = error;
exports.gray = gray;
exports.heading = heading;
exports.logoBlue = logoBlue;
exports.logoGreen = logoGreen;
exports.logoPink = logoPink;
exports.logoRed = logoRed;
exports.logoYellow = logoYellow;
exports.useColor = useColor;
exports.warning = warning;
