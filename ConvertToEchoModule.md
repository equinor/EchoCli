# Echo Module

I this document you will find all needed to convert any react project to a Echo module.
All form file that are needed to ba added to package.json setup.

## Converting from `Create React App`

The conversion form an create react app is probably the most severe one.

### 1. Install

We need to install echo-cli with the following command, this should be installed as a devDependency.

```
npm install @equinor/echo-cli -D
```

### 2. Delete Public folder

Now you have the basis of the app. Now we need to `delete the public` folder. This wil now be provided trough echo-cli.

### 3. Create echoModule.config.json

Now for the creation of echoModule.config.json the following will need to pre present. the bundler can be set to rollup or webpack, The rest can be set to your team's need.

```JSON

{
    "bundler": "rollup",
    "manifest": {
        "name": "My Echo App",
        "key": "myechoapp",
        "shortName": "my-echo-app",
        "path": "/myechoapp",
        "description": "Short description of my echo app",
        "private": false
    },
    "server": {
        "contentBase": "/build",
        "port": 3000,
        "open": true,
        "host": "localhost"
    }
}
```

### 4. package.json

In the package.json fil we need to do some proper clanup. Lets start with the scripts.

```JSON
{
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
}
```

replace the above scripts with the following. build will just do a simple module build ready for echo inField. build-client will add the developer client to the build. this can be used if the module will be published on its own app instance.
The start command wil build and serve the module trough the client provided form echo-cli.

`PS: we are not ready to run any of these commands yet`

```JSON
{
    "scripts": {
        "build": "echo-build",
        "build-client": "echo-build -c",
        "start": "echo-build -s -d",
    },
}
```

now for dependencies, devDependencies, peerDependencies. Lest start with the once we need to remove. the following can all be removed.

```JSON
    "react-scripts": "4.0.3",
    "typescript": "^4.1.2",
    "web-vitals": "^1.0.1"
```

the following list can all be moved to devDependencies.

```JSON
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "@types/jest": "^26.0.15",
    "@types/node": "^12.0.0",
    "@types/react": "^17.0.0",
    "@types/react-dom": "^17.0.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
```

Now lets install some echo packages. There are only two package that we need the rest are optional. The packages we need is echo-scripts and echo-core. this is to help with some typings and provide the EchoModuleAPI. Install them as a devDependency

```
npm install @equinor/echo-scripts @equinor/echo-core -D
```

optional packages are the following and should all be installed as devDependencies

-   @equinor/echo-base
-   @equinor/echo-components
-   @equinor/echo-utils

now lest add the peerDependencies. These are all the packages that the client will provide and will be striped from the bundled code.

```JSON
    "peerDependencies": {
        "react": "^17.0.2",
        "react-dom": "^17.0.2"
    },
```

now lets add main ant source

```JSON
 "main": "build/index.js",
 "source": "src/index.ts",
```

After some cleanup the the package.json should look like this.

```JSON
{
  "name": "echo-module-app",
  "version": "0.1.0",
  "private": true,
  "main": "build/index.js",
  "source": "src/index.ts",
  "dependencies": {},
  "scripts": {
    "build": "echo-build",
    "build-client": "echo-build -c",
    "start": "echo-build -s -d",
    "start-admin": "echo-build -s -d -a"
  },
  "devDependencies": {
    "@equinor/echo-cli": "^0.1.15",
    "@equinor/echo-scripts": "0.1.5",
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "@types/jest": "^26.0.15",
    "@types/node": "^12.0.0",
    "@types/react": "^17.0.0",
    "@types/react-dom": "^17.0.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "peerDependencies": {

    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}

```

### Cleanup `./src` folder

lets delete the following files sins they no longer needed.

-   index.css
-   logo.svg
-   react-app-env.d.ts
-   reportWebVitals.ts

now we should rename the index.tsx to index.ts and remove some code. the file should look like the following.

```TS

import { EchoModuleApi } from "@equinor/echo-core";
import App from "./App";

export function setup(api: EchoModuleApi) {
  api.registerApp(App);
}

```

### TSConfig

last step is to update the tsconfig file.
