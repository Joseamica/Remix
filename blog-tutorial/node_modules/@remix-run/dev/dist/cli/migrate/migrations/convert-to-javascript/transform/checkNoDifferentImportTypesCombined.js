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

const checkNoDifferentImportTypesCombined = ({
  source,
  specifiers
}) => {
  let specifierTypes = (specifiers || []).map(({
    type
  }) => type);

  if (specifierTypes.filter(type => type === specifierTypes[0]).length !== specifierTypes.length) {
    throw Error(`You shouldn't use different types of imports together in the same statement for ${source.value}. Please break them into multiple import statements and try again.`);
  }
};

exports.checkNoDifferentImportTypesCombined = checkNoDifferentImportTypesCombined;
