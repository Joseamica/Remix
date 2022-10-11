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

var path = require('path');
var invariant = require('../invariant.js');
var routes = require('./routes.js');
var crypto = require('./utils/crypto.js');
var url = require('./utils/url.js');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespace(path);

async function createAssetsManifest(config, metafile) {
  function resolveUrl(outputPath) {
    return url.createUrl(config.publicPath, path__namespace.relative(config.assetsBuildDirectory, path__namespace.resolve(outputPath)));
  }

  function resolveImports(imports) {
    return imports.filter(im => im.kind === "import-statement").map(im => resolveUrl(im.path));
  }

  let entryClientFile = path__namespace.resolve(config.appDirectory, config.entryClientFile);
  let routesByFile = Object.keys(config.routes).reduce((map, key) => {
    let route = config.routes[key];
    map.set(route.file, route);
    return map;
  }, new Map());
  let entry;
  let routes$1 = {};

  for (let key of Object.keys(metafile.outputs).sort()) {
    let output = metafile.outputs[key];
    if (!output.entryPoint) continue; // When using yarn-pnp, esbuild-plugin-pnp resolves files under the pnp namespace, even entry.client.tsx

    let entryPointFile = output.entryPoint.replace(/^pnp:/, "");

    if (path__namespace.resolve(entryPointFile) === entryClientFile) {
      entry = {
        module: resolveUrl(key),
        imports: resolveImports(output.imports)
      }; // Only parse routes otherwise dynamic imports can fall into here and fail the build
    } else if (entryPointFile.startsWith("browser-route-module:")) {
      entryPointFile = entryPointFile.replace(/(^browser-route-module:|\?browser$)/g, "");
      let route = routesByFile.get(entryPointFile);
      invariant["default"](route, `Cannot get route for entry point ${output.entryPoint}`);
      let sourceExports = await routes.getRouteModuleExportsCached(config, route.id);
      routes$1[route.id] = {
        id: route.id,
        parentId: route.parentId,
        path: route.path,
        index: route.index,
        caseSensitive: route.caseSensitive,
        module: resolveUrl(key),
        imports: resolveImports(output.imports),
        hasAction: sourceExports.includes("action"),
        hasLoader: sourceExports.includes("loader"),
        hasCatchBoundary: sourceExports.includes("CatchBoundary"),
        hasErrorBoundary: sourceExports.includes("ErrorBoundary")
      };
    }
  }

  invariant["default"](entry, `Missing output for entry point`);
  optimizeRoutes(routes$1, entry.imports);
  let version = crypto.getHash(JSON.stringify({
    entry,
    routes: routes$1
  })).slice(0, 8);
  return {
    version,
    entry,
    routes: routes$1
  };
}

function optimizeRoutes(routes, entryImports) {
  // This cache is an optimization that allows us to avoid pruning the same
  // route's imports more than once.
  let importsCache = Object.create(null);

  for (let key in routes) {
    optimizeRouteImports(key, routes, entryImports, importsCache);
  }
}

function optimizeRouteImports(routeId, routes, parentImports, importsCache) {
  if (importsCache[routeId]) return importsCache[routeId];
  let route = routes[routeId];

  if (route.parentId) {
    parentImports = parentImports.concat(optimizeRouteImports(route.parentId, routes, parentImports, importsCache));
  }

  let routeImports = (route.imports || []).filter(url => !parentImports.includes(url)); // Setting `route.imports = undefined` prevents `imports: []` from showing up
  // in the manifest JSON when there are no imports.

  route.imports = routeImports.length > 0 ? routeImports : undefined; // Cache so the next lookup for this route is faster.

  importsCache[routeId] = routeImports;
  return routeImports;
}

exports.createAssetsManifest = createAssetsManifest;
