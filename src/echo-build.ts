#!/usr/bin/env node

import { inputOptions, outputOptions } from "./config/config";
import { echoBundle } from "./tools/build/build";

echoBundle(inputOptions, outputOptions);
