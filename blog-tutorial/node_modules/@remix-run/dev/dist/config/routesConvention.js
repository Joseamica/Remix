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

var fs = require('fs');
var path = require('path');
var minimatch = require('minimatch');
var routes = require('./routes.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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

var fs__namespace = /*#__PURE__*/_interopNamespace(fs);
var path__namespace = /*#__PURE__*/_interopNamespace(path);
var minimatch__default = /*#__PURE__*/_interopDefaultLegacy(minimatch);

const routeModuleExts = [".js", ".jsx", ".ts", ".tsx", ".md", ".mdx"];
function isRouteModuleFile(filename) {
  return routeModuleExts.includes(path__namespace.extname(filename));
}
/**
 * Defines routes using the filesystem convention in `app/routes`. The rules are:
 *
 * - Route paths are derived from the file path. A `.` in the filename indicates
 *   a `/` in the URL (a "nested" URL, but no route nesting). A `$` in the
 *   filename indicates a dynamic URL segment.
 * - Subdirectories are used for nested routes.
 *
 * For example, a file named `app/routes/gists/$username.tsx` creates a route
 * with a path of `gists/:username`.
 */

function defineConventionalRoutes(appDir, ignoredFilePatterns) {
  let files = {}; // First, find all route modules in app/routes

  visitFiles(path__namespace.join(appDir, "routes"), file => {
    if (ignoredFilePatterns && ignoredFilePatterns.some(pattern => minimatch__default["default"](file, pattern))) {
      return;
    }

    if (isRouteModuleFile(file)) {
      let routeId = routes.createRouteId(path__namespace.join("routes", file));
      files[routeId] = path__namespace.join("routes", file);
      return;
    }

    throw new Error(`Invalid route module file: ${path__namespace.join(appDir, "routes", file)}`);
  });
  let routeIds = Object.keys(files).sort(byLongestFirst);
  let uniqueRoutes = new Map(); // Then, recurse through all routes using the public defineRoutes() API

  function defineNestedRoutes(defineRoute, parentId) {
    let childRouteIds = routeIds.filter(id => findParentRouteId(routeIds, id) === parentId);

    for (let routeId of childRouteIds) {
      let routePath = createRoutePath(routeId.slice((parentId || "routes").length + 1));
      let isIndexRoute = routeId.endsWith("/index");
      let fullPath = createRoutePath(routeId.slice("routes".length + 1));
      let uniqueRouteId = (fullPath || "") + (isIndexRoute ? "?index" : "");

      if (uniqueRouteId) {
        if (uniqueRoutes.has(uniqueRouteId)) {
          throw new Error(`Path ${JSON.stringify(fullPath)} defined by route ${JSON.stringify(routeId)} conflicts with route ${JSON.stringify(uniqueRoutes.get(uniqueRouteId))}`);
        } else {
          uniqueRoutes.set(uniqueRouteId, routeId);
        }
      }

      if (isIndexRoute) {
        let invalidChildRoutes = routeIds.filter(id => findParentRouteId(routeIds, id) === routeId);

        if (invalidChildRoutes.length > 0) {
          throw new Error(`Child routes are not allowed in index routes. Please remove child routes of ${routeId}`);
        }

        defineRoute(routePath, files[routeId], {
          index: true
        });
      } else {
        defineRoute(routePath, files[routeId], () => {
          defineNestedRoutes(defineRoute, routeId);
        });
      }
    }
  }

  return routes.defineRoutes(defineNestedRoutes);
}
let escapeStart = "[";
let escapeEnd = "]"; // TODO: Cleanup and write some tests for this function

function createRoutePath(partialRouteId) {
  let result = "";
  let rawSegmentBuffer = "";
  let inEscapeSequence = 0;
  let skipSegment = false;

  for (let i = 0; i < partialRouteId.length; i++) {
    let char = partialRouteId.charAt(i);
    let lastChar = i > 0 ? partialRouteId.charAt(i - 1) : undefined;
    let nextChar = i < partialRouteId.length - 1 ? partialRouteId.charAt(i + 1) : undefined;

    function isNewEscapeSequence() {
      return !inEscapeSequence && char === escapeStart && lastChar !== escapeStart;
    }

    function isCloseEscapeSequence() {
      return inEscapeSequence && char === escapeEnd && nextChar !== escapeEnd;
    }

    function isStartOfLayoutSegment() {
      return char === "_" && nextChar === "_" && !rawSegmentBuffer;
    }

    if (skipSegment) {
      if (char === "/" || char === "." || char === path__namespace.win32.sep) {
        skipSegment = false;
      }

      continue;
    }

    if (isNewEscapeSequence()) {
      inEscapeSequence++;
      continue;
    }

    if (isCloseEscapeSequence()) {
      inEscapeSequence--;
      continue;
    }

    if (inEscapeSequence) {
      result += char;
      continue;
    }

    if (char === "/" || char === path__namespace.win32.sep || char === ".") {
      if (rawSegmentBuffer === "index" && result.endsWith("index")) {
        result = result.replace(/\/?index$/, "");
      } else {
        result += "/";
      }

      rawSegmentBuffer = "";
      continue;
    }

    if (isStartOfLayoutSegment()) {
      skipSegment = true;
      continue;
    }

    rawSegmentBuffer += char;

    if (char === "$") {
      result += typeof nextChar === "undefined" ? "*" : ":";
      continue;
    }

    result += char;
  }

  if (rawSegmentBuffer === "index" && result.endsWith("index")) {
    result = result.replace(/\/?index$/, "");
  }

  return result || undefined;
}

function findParentRouteId(routeIds, childRouteId) {
  return routeIds.find(id => childRouteId.startsWith(`${id}/`));
}

function byLongestFirst(a, b) {
  return b.length - a.length;
}

function visitFiles(dir, visitor, baseDir = dir) {
  for (let filename of fs__namespace.readdirSync(dir)) {
    let file = path__namespace.resolve(dir, filename);
    let stat = fs__namespace.lstatSync(file);

    if (stat.isDirectory()) {
      visitFiles(file, visitor, baseDir);
    } else if (stat.isFile()) {
      visitor(path__namespace.relative(baseDir, file));
    }
  }
}
/*
eslint
  no-loop-func: "off",
*/

exports.createRoutePath = createRoutePath;
exports.defineConventionalRoutes = defineConventionalRoutes;
exports.isRouteModuleFile = isRouteModuleFile;
