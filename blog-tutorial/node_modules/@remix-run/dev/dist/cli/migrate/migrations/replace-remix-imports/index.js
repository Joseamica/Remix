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
var path = require('path');
var NpmCliPackageJson = require('@npmcli/package-json');
var glob = require('fast-glob');
var lodash = require('lodash');
var semver = require('semver');
var colors = require('../../../../colors.js');
var config = require('../../../../config.js');
var getPreferredPackageManager = require('../../../getPreferredPackageManager.js');
var jscodeshift = require('../../jscodeshift.js');
var dependency = require('./dependency.js');
var messages = require('./messages.js');
var remixSetup = require('./remixSetup.js');
var resolveTransformOptions = require('./resolveTransformOptions.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var NpmCliPackageJson__default = /*#__PURE__*/_interopDefaultLegacy(NpmCliPackageJson);
var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);
var semver__default = /*#__PURE__*/_interopDefaultLegacy(semver);

const TRANSFORM_PATH = path.join(__dirname, "transform");

const getRemixVersionSpec = remixDeps => {
  let candidate = lodash.maxBy(remixDeps, dep => semver__default["default"].minVersion(dep.versionSpec));

  if (candidate === undefined) {
    console.error("❌ I couldn't find versions for your Remix packages.");
    process.exit(1);
  }

  let candidateMin = semver__default["default"].minVersion(candidate.versionSpec);

  if (candidateMin === null) {
    console.error("❌ I couldn't find versions for your Remix packages.");
    process.exit(1);
  }

  if (semver__default["default"].lt(candidateMin, "1.3.3")) {
    console.log("⬆️  I'm upgrading your Remix dependencies");
    console.log(messages.because("this migration requires v1.3.3 or newer."));
    return "^1.3.3";
  }

  console.log(messages.detected(`\`${colors.blue(candidate.versionSpec)}\` as the best Remix version to use`));
  console.log(messages.because("you're already using a compatible Remix version."));
  return candidate.versionSpec;
};

const shouldKeepPostinstall = original => {
  if (original === undefined) {
    return false;
  }

  if (remixSetup.onlyRemixSetup.test(original) || remixSetup.onlyRemixSetupRuntime.test(original)) {
    console.log("🗑  I'm removing `remix setup` from your `postinstall` script.");
    return false;
  }

  let hasRemixSetup = remixSetup.remixSetup.test(original);

  if (hasRemixSetup) {
    console.warn("⚠️  I couldn't remove `remix setup` from your `postinstall script");
    console.log(messages.because("your `postinstall` script is too complex."));
    console.warn("👉 You need to manually remove `remix setup` from your `postinstall` script.");
  }

  return true;
};

const replaceRemixImports = async (projectDir, flags = {}) => {
  var _pkg$content$scripts;

  let pkg = await NpmCliPackageJson__default["default"].load(projectDir); // 0. resolve runtime and adapter

  let {
    adapter,
    runtime
  } = await resolveTransformOptions.resolveTransformOptions(pkg.content);
  let deps = dependency.depsToEntries(pkg.content.dependencies);
  let remixDeps = deps.filter(({
    name
  }) => dependency.isRemixPackage(name));
  let otherDeps = deps.filter(({
    name
  }) => !dependency.isRemixPackage(name));
  let devDeps = dependency.depsToEntries(pkg.content.devDependencies);
  let remixDevDeps = devDeps.filter(({
    name
  }) => dependency.isRemixPackage(name));
  let otherDevDeps = devDeps.filter(({
    name
  }) => !dependency.isRemixPackage(name));
  let remixServeInstalled = remixDeps.map(({
    name
  }) => name).includes("@remix-run/serve");

  if (remixServeInstalled) {
    let servePackage = colors.blue("@remix-run/serve");
    console.log(messages.detected(`\`${servePackage}\` as your Remix server`));
    console.log(messages.because("it is in your dependencies."));
  } // 1. upgrade Remix package, remove unused Remix packages


  console.log("\n💿 I'm checking your Remix dependencies");
  console.log(messages.because("the `remix` package is deprecated."));
  let remixVersionSpec = getRemixVersionSpec([...remixDeps, ...remixDevDeps]);
  pkg.update({
    dependencies: { ...dependency.depsToObject(otherDeps),
      "@remix-run/react": remixVersionSpec,
      [`@remix-run/${runtime}`]: remixVersionSpec,
      ...(adapter ? {
        [`@remix-run/${adapter}`]: remixVersionSpec
      } : {}),
      ...(remixServeInstalled ? {
        [`@remix-run/serve`]: remixVersionSpec
      } : {})
    },
    devDependencies: { ...dependency.depsToObject(otherDevDeps),
      ...dependency.depsToObject(remixDevDeps.map(({
        name
      }) => ({
        name,
        versionSpec: remixVersionSpec
      }))),
      [`@remix-run/dev`]: remixVersionSpec
    }
  });
  console.log("✅ Your Remix dependencies look good!"); // 2. Remove `remix setup` from postinstall

  console.log("\n💿 I'm checking your `package.json` scripts");
  console.log(messages.because("calling `remix setup` in `postinstall` is deprecated."));

  if (!shouldKeepPostinstall((_pkg$content$scripts = pkg.content.scripts) === null || _pkg$content$scripts === void 0 ? void 0 : _pkg$content$scripts.postinstall)) {
    pkg.update({
      scripts: Object.fromEntries(Object.entries(pkg.content.scripts || {}).filter(([script]) => script !== "postinstall"))
    });
  }

  console.log("✅ Your `package.json` scripts looks good!"); // write updates to package.json

  await pkg.save(); // 3. Update lockfile for new dependencies by reinstalling

  console.log("\n💿 I'm updating your lockfile");
  console.log(messages.because("your dependencies changed."));
  let packageManager = getPreferredPackageManager.getPreferredPackageManager();
  child_process.execSync(`${packageManager} install`, {
    cwd: projectDir,
    stdio: "inherit"
  });
  console.log("✅ Your lockfile looks good!"); // 4. Run codemod

  console.log("\n💿 I'm replacing any `remix` imports");
  console.log(messages.because("importing from `remix` is deprecated."));
  let config$1 = await config.readConfig(projectDir);
  let files = glob__default["default"].sync("**/*.+(js|jsx|ts|tsx)", {
    absolute: true,
    cwd: config$1.appDirectory
  });
  let codemodOk = await jscodeshift.run({
    files,
    flags,
    transformOptions: {
      adapter,
      runtime
    },
    transformPath: TRANSFORM_PATH
  });

  if (!codemodOk) {
    console.error("❌ I couldn't replace all of your `remix` imports.");

    if (!flags.debug) {
      console.log("👉 Try again with the `--debug` flag to see what failed.");
    }

    process.exit(1);
  }

  console.log("✅ Your Remix imports look good!");
  console.log("\n🚚 I've successfully migrated your project! 🎉");
};

exports.replaceRemixImports = replaceRemixImports;
