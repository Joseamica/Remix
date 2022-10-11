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

const normalizeImports = allImports => allImports.nodes().flatMap(({
  importKind,
  specifiers
}) => {
  if (!specifiers) return [];
  return specifiers
  /**
   * HACK: Can't use casts nor type guards in a `jscodeshift` transform
   * https://github.com/facebook/jscodeshift/issues/467
   *
   * So to narrow specifier type, we use `flatMap` instead.
   * (`filter` can't narrow type without type guards)
   */
  .flatMap(specifier => {
    return specifier.type === "ImportSpecifier" ? specifier : [];
  }).map(specifier => ({ ...specifier,
    importKind
  }));
}).map(({
  imported: {
    name
  },
  importKind,
  local
}) => ({
  alias: (local === null || local === void 0 ? void 0 : local.name) || name,
  importKind,
  name
}));

exports.normalizeImports = normalizeImports;
