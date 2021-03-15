#!/usr/bin/env node

import { build } from "./tools/build/build";
import { getInputOptions } from "./tools/config/inputConfig";
import { getOutputOptions } from "./tools/config/outputConfig";

const currentDir = process.cwd();
const [, , ...args] = process.argv;

const pkg = require(`${currentDir}/package.json`);

console.log(pkg);
const outputOptions = getOutputOptions({ output: pkg.main });
const inputOptions = getInputOptions({ input: pkg.source });

build(outputOptions, inputOptions);
