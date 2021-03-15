#!/usr/bin/env node
import { build } from "./tools/echo-build-rollup/build";
import { getInputOptions } from "./tools/echo-build-rollup/config/inputConfig.js";
import { getOutputOptions } from "./tools/echo-build-rollup/config/outputConfig.js";

const currentDir = process.cwd();
const [, , ...args] = process.argv;

const pkg = require(`${currentDir}/package.json`);
console.log(pkg);
const outputOptions = getOutputOptions({ output: pkg.main });
const inputOptions = getInputOptions({ input: pkg.source });

build(outputOptions, inputOptions);
