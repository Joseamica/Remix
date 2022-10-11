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

var packageExports = require('./packageExports.js');

const getFilteredNormalizedImportsForPackage = (normalizedImports, packageName) => normalizedImports.filter(({
  name
}) => packageExports.packageExports[packageName].type.includes(name) || packageExports.packageExports[packageName].value.includes(name));

const getRemainingNormalizedImports = (normalizedImports, filteredNormalizedImports) => {
  let filteredNormalizedImportNames = filteredNormalizedImports.map(({
    name
  }) => name);
  return normalizedImports.filter(({
    name
  }) => !filteredNormalizedImportNames.includes(name));
}; // export type MappedNormalizedImports = {
//   [adapter: Adapter]: NormalizedImport[] | undefined;
//   [client: Client]: NormalizedImport[];
//   [runtime: Runtime]: NormalizedImport[];
// };


const mapNormalizedImports = ({
  adapter,
  normalizedImports,
  runtime
}) => {
  let filteredAdapterNormalizedImports = adapter ? getFilteredNormalizedImportsForPackage(normalizedImports, adapter) : [];
  let filteredReactNormalizedImports = getFilteredNormalizedImportsForPackage(normalizedImports, "react");
  let filteredRuntimeNormalizedImports = getFilteredNormalizedImportsForPackage(normalizedImports, runtime);
  return { ...(adapter ? {
      [adapter]: filteredAdapterNormalizedImports
    } : {}),
    react: filteredReactNormalizedImports,
    [runtime]: filteredRuntimeNormalizedImports,
    remix: getRemainingNormalizedImports(normalizedImports, [...filteredAdapterNormalizedImports, ...filteredReactNormalizedImports, ...filteredRuntimeNormalizedImports])
  };
};

exports.mapNormalizedImports = mapNormalizedImports;
