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
var os = require('os');
var child_process = require('child_process');
var fse = require('fs-extra');
var exitHook = require('exit-hook');
var ora = require('ora');
var prettyMs = require('pretty-ms');
var WebSocket = require('ws');
var getPort = require('get-port');
var esbuild = require('esbuild');
var build$1 = require('../build.js');
var colors = require('../colors.js');
var compiler = require('../compiler.js');
var config = require('../config.js');
var format = require('../config/format.js');
var env = require('../env.js');
var logging = require('../logging.js');
var create$1 = require('./create.js');
var getPreferredPackageManager = require('./getPreferredPackageManager.js');
var setup$1 = require('./setup.js');
require('inquirer');
require('./migrate/migrations/convert-to-javascript/index.js');
require('./migrate/migrations/replace-remix-imports/index.js');

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

var path__namespace = /*#__PURE__*/_interopNamespace(path);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var fse__namespace = /*#__PURE__*/_interopNamespace(fse);
var exitHook__default = /*#__PURE__*/_interopDefaultLegacy(exitHook);
var ora__default = /*#__PURE__*/_interopDefaultLegacy(ora);
var prettyMs__default = /*#__PURE__*/_interopDefaultLegacy(prettyMs);
var WebSocket__default = /*#__PURE__*/_interopDefaultLegacy(WebSocket);
var getPort__default = /*#__PURE__*/_interopDefaultLegacy(getPort);
var esbuild__namespace = /*#__PURE__*/_interopNamespace(esbuild);

async function create({
  appTemplate,
  projectDir,
  remixVersion,
  installDeps,
  useTypeScript,
  githubToken,
  debug
}) {
  let spinner = ora__default["default"]("Creating your app…").start();
  await create$1.createApp({
    appTemplate,
    projectDir,
    remixVersion,
    installDeps,
    useTypeScript,
    githubToken,
    debug
  });
  spinner.stop();
  spinner.clear();
}
async function init(projectDir, {
  deleteScript = true
} = {}) {
  let initScriptDir = path__namespace.join(projectDir, "remix.init");
  let initScriptTs = path__namespace.resolve(initScriptDir, "index.ts");
  let initScript = path__namespace.resolve(initScriptDir, "index.js");

  if (await fse__namespace.pathExists(initScriptTs)) {
    await esbuild__namespace.build({
      entryPoints: [initScriptTs],
      format: "cjs",
      platform: "node",
      outfile: initScript
    });
  }

  if (!(await fse__namespace.pathExists(initScript))) {
    return;
  }

  let initPackageJson = path__namespace.resolve(initScriptDir, "package.json");
  let isTypeScript = fse__namespace.existsSync(path__namespace.join(projectDir, "tsconfig.json"));
  let packageManager = getPreferredPackageManager.getPreferredPackageManager();

  if (await fse__namespace.pathExists(initPackageJson)) {
    child_process.execSync(`${packageManager} install`, {
      cwd: initScriptDir,
      stdio: "ignore"
    });
  }

  let initFn = require(initScript);

  if (typeof initFn !== "function" && initFn.default) {
    initFn = initFn.default;
  }

  try {
    await initFn({
      isTypeScript,
      packageManager,
      rootDirectory: projectDir
    });

    if (deleteScript) {
      await fse__namespace.remove(initScriptDir);
    }
  } catch (error) {
    if (error instanceof Error) {
      error.message = `${colors.error("🚨 Oops, remix.init failed")}\n\n${error.message}`;
    }

    throw error;
  }
}
async function setup(platformArg) {
  let platform;

  if (platformArg === "cloudflare-workers" || platformArg === "cloudflare-pages") {
    console.warn(`Using '${platformArg}' as a platform value is deprecated. Use ` + "'cloudflare' instead.");
    console.log("HINT: check the `postinstall` script in `package.json`");
    platform = setup$1.SetupPlatform.Cloudflare;
  } else {
    platform = setup$1.isSetupPlatform(platformArg) ? platformArg : setup$1.SetupPlatform.Node;
  }

  await setup$1.setupRemix(platform);
  logging.log(`Successfully setup Remix for ${platform}.`);
}
async function routes(remixRoot, formatArg) {
  let config$1 = await config.readConfig(remixRoot);
  let format$1 = format.isRoutesFormat(formatArg) ? formatArg : format.RoutesFormat.jsx;
  console.log(format.formatRoutes(config$1.routes, format$1));
}
async function build(remixRoot, modeArg, sourcemap = false) {
  let mode = build$1.isBuildMode(modeArg) ? modeArg : build$1.BuildMode.Production;
  logging.log(`Building Remix app in ${mode} mode...`);

  if (modeArg === build$1.BuildMode.Production && sourcemap) {
    console.warn("\n⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️");
    console.warn("You have enabled source maps in production. This will make your " + "server-side code visible to the public and is highly discouraged! If " + "you insist, please ensure you are using environment variables for " + "secrets and not hard-coding them into your source!");
    console.warn("⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️\n");
  }

  let start = Date.now();
  let config$1 = await config.readConfig(remixRoot);
  fse__namespace.emptyDirSync(config$1.assetsBuildDirectory);
  await compiler.build(config$1, {
    mode: mode,
    sourcemap,
    onBuildFailure: failure => {
      compiler.formatBuildFailure(failure);
      throw Error();
    }
  });
  logging.log(`Built in ${prettyMs__default["default"](Date.now() - start)}`);
}
async function watch(remixRootOrConfig, modeArg, callbacks) {
  let {
    onInitialBuild,
    onRebuildStart
  } = callbacks || {};
  let mode = build$1.isBuildMode(modeArg) ? modeArg : build$1.BuildMode.Development;
  console.log(`Watching Remix app in ${mode} mode...`);
  let start = Date.now();
  let config$1 = typeof remixRootOrConfig === "object" ? remixRootOrConfig : await config.readConfig(remixRootOrConfig);
  let wss = new WebSocket__default["default"].Server({
    port: config$1.devServerPort
  });

  function broadcast(event) {
    setTimeout(() => {
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket__default["default"].OPEN) {
          client.send(JSON.stringify(event));
        }
      });
    }, config$1.devServerBroadcastDelay);
  }

  function log(_message) {
    let message = `💿 ${_message}`;
    console.log(message);
    broadcast({
      type: "LOG",
      message
    });
  }

  let closeWatcher = await compiler.watch(config$1, {
    mode,
    onInitialBuild,

    onRebuildStart() {
      start = Date.now();
      onRebuildStart === null || onRebuildStart === void 0 ? void 0 : onRebuildStart();
      log("Rebuilding...");
    },

    onRebuildFinish() {
      log(`Rebuilt in ${prettyMs__default["default"](Date.now() - start)}`);
      broadcast({
        type: "RELOAD"
      });
    },

    onFileCreated(file) {
      log(`File created: ${path__namespace.relative(process.cwd(), file)}`);
    },

    onFileChanged(file) {
      log(`File changed: ${path__namespace.relative(process.cwd(), file)}`);
    },

    onFileDeleted(file) {
      log(`File deleted: ${path__namespace.relative(process.cwd(), file)}`);
    }

  });
  console.log(`💿 Built in ${prettyMs__default["default"](Date.now() - start)}`);
  let resolve;
  exitHook__default["default"](() => {
    resolve();
  });
  return new Promise(r => {
    resolve = r;
  }).then(async () => {
    wss.close();
    await closeWatcher();
    fse__namespace.emptyDirSync(config$1.assetsBuildDirectory);
    fse__namespace.rmSync(config$1.serverBuildPath);
  });
}
async function dev(remixRoot, modeArg, portArg) {
  let createApp;
  let express;

  try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    let serve = require("@remix-run/serve");

    createApp = serve.createApp;
    express = require("express");
  } catch (err) {
    throw new Error("Could not locate @remix-run/serve. Please verify you have it installed " + "to use the dev command.");
  }

  let config$1 = await config.readConfig(remixRoot);
  let mode = build$1.isBuildMode(modeArg) ? modeArg : build$1.BuildMode.Development;
  await env.loadEnv(config$1.rootDirectory);
  let port = await getPort__default["default"]({
    port: portArg ? Number(portArg) : process.env.PORT ? Number(process.env.PORT) : getPort.makeRange(3000, 3100)
  });

  if (config$1.serverEntryPoint) {
    throw new Error("remix dev is not supported for custom servers.");
  }

  let app = express();
  app.disable("x-powered-by");
  app.use((_, __, next) => {
    purgeAppRequireCache(config$1.serverBuildPath);
    next();
  });
  app.use(createApp(config$1.serverBuildPath, mode, config$1.publicPath, config$1.assetsBuildDirectory));
  let server = null;

  try {
    await watch(config$1, mode, {
      onInitialBuild: () => {
        let onListen = () => {
          var _Object$values$flat$f;

          let address = process.env.HOST || ((_Object$values$flat$f = Object.values(os__default["default"].networkInterfaces()).flat().find(ip => String(ip === null || ip === void 0 ? void 0 : ip.family).includes("4") && !(ip !== null && ip !== void 0 && ip.internal))) === null || _Object$values$flat$f === void 0 ? void 0 : _Object$values$flat$f.address);

          if (!address) {
            console.log(`Remix App Server started at http://localhost:${port}`);
          } else {
            console.log(`Remix App Server started at http://localhost:${port} (http://${address}:${port})`);
          }
        };

        server = process.env.HOST ? app.listen(port, process.env.HOST, onListen) : app.listen(port, onListen);
      }
    });
  } finally {
    var _server;

    (_server = server) === null || _server === void 0 ? void 0 : _server.close();
  }
}

function purgeAppRequireCache(buildPath) {
  for (let key in require.cache) {
    if (key.startsWith(buildPath)) {
      delete require.cache[key];
    }
  }
}

exports.build = build;
exports.create = create;
exports.dev = dev;
exports.init = init;
exports.routes = routes;
exports.setup = setup;
exports.watch = watch;
