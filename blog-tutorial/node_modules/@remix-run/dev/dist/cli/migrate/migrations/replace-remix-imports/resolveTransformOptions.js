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

var inquirer = require('inquirer');
var colors = require('../../../../colors.js');
var dependency = require('./dependency.js');
var messages = require('./messages.js');
var remixSetup = require('./remixSetup.js');
var adapter = require('./transform/adapter.js');
var runtime = require('./transform/runtime.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var inquirer__default = /*#__PURE__*/_interopDefaultLegacy(inquirer);

const adapterToRuntime = {
  architect: "node",
  "cloudflare-pages": "cloudflare",
  "cloudflare-workers": "cloudflare",
  express: "node",
  netlify: "node",
  vercel: "node"
};

const autoDetectPostinstallRuntime = packageJson => {
  var _packageJson$scripts;

  let postinstall = (_packageJson$scripts = packageJson.scripts) === null || _packageJson$scripts === void 0 ? void 0 : _packageJson$scripts.postinstall;
  if (postinstall === undefined) return undefined;
  if (postinstall.match(remixSetup.remixSetup) === null) return undefined; // match `remix setup <runtime>` in `postinstall` script

  let runtimeMatch = postinstall.match(remixSetup.remixSetupRuntime);
  if (runtimeMatch === null) return "node";
  let runtime$1 = runtimeMatch[1];
  if (runtime.isRuntime(runtime$1)) return runtime$1;
  console.warn(`️⚠️  You have \`${runtime$1}\` in your \`postinstall\` script, but \`${runtime$1}\` is not a valid Remix server runtime.`);
  return undefined;
};

const detectedRuntime = runtime => {
  let runtimePackage = colors.blue(`@remix-run/${runtime}`);
  return messages.detected(`\`${runtimePackage}\` as your Remix server runtime`);
};

const resolveRuntime = async (packageJson, adapter) => {
  // match `remix setup <runtime>` in `postinstall` script
  let postinstallRuntime = autoDetectPostinstallRuntime(packageJson);

  if (postinstallRuntime) {
    console.log(detectedRuntime(postinstallRuntime));
    console.log(messages.because(`you had \`remix setup ${postinstallRuntime}\` in your \`postinstall\` script.`));
    return postinstallRuntime;
  } // infer runtime from adapter


  if (adapter) {
    let runtime = adapterToRuntime[adapter];
    console.log(detectedRuntime(runtime));
    let adapterPackage = colors.blue(`@remix-run/${adapter}`);
    console.log(messages.because(`you have \`${adapterPackage}\` installed.`));
    return runtime;
  } // @remix-run/serve uses node


  let deps = dependency.depsToEntries(packageJson.dependencies);
  let remixDeps = deps.filter(({
    name
  }) => dependency.isRemixPackage(name));

  if (remixDeps.map(({
    name
  }) => name).includes("@remix-run/serve")) {
    let runtime = "node";
    console.log(detectedRuntime(runtime));
    console.log(messages.because("you have `@remix-run/serve` installed."));
    return runtime;
  }

  console.log("🕵️  I couldn't infer your Remix server runtime."); // otherwise, ask user for runtime

  let {
    runtime: runtime$1
  } = await inquirer__default["default"].prompt([{
    name: "runtime",
    message: "Which server runtime is this project using?",
    type: "list",
    pageSize: runtime.runtimes.length + 1,
    choices: [...runtime.runtimes, {
      name: "Nevermind...",
      value: undefined
    }]
  }]);
  if (runtime$1 === undefined) process.exit(0);
  return runtime$1;
};

const resolveAdapter = packageJson => {
  // find adapter in package.json dependencies
  let deps = dependency.depsToEntries(packageJson.dependencies);
  let remixDeps = deps.filter(({
    name
  }) => dependency.isRemixPackage(name));
  let adapters = remixDeps.map(({
    name
  }) => name.replace(/^@remix-run\//, "")).filter(adapter.isAdapter);

  if (adapters.length > 1) {
    console.error("❌ I found more than one Remix server adapter your in dependencies:");
    console.log(adapters.map(adapter => `   - @remix-run/${adapter}`).join("\n"));
    console.log("👉 Uninstall unused adapters and try again.");
    process.exit(1);
  }

  if (adapters.length === 1) {
    let adapter = adapters[0];
    let adapterPackage = colors.blue(`@remix-run/${adapter}`);
    console.log(messages.detected(`\`${adapterPackage}\` as your Remix server adapter`));
    console.log(messages.because("it's in your dependencies."));
    return adapter;
  }

  return undefined;
};

const resolveTransformOptions = async packageJson => {
  let adapter = resolveAdapter(packageJson);
  return {
    adapter,
    runtime: await resolveRuntime(packageJson, adapter)
  };
};

exports.resolveTransformOptions = resolveTransformOptions;
