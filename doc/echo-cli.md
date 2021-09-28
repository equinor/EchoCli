# Echo Cli

Echo Cli is one of the main tools for developing for echo. This allows you to create to a echo module.

## Templates

Echo Cli provide module templates with all the basics provided. To use it you will need a copy of @equinor/echo-cli or use NPX

```
> npm install -g @equinor/echo-cli
> echo-create
```

```
> npx -p  @equinor/echo-cli echo-create
```

these commands wil guide you trough the creation of a echo module in your current folder.

## Build and Run

Running you module is simple the following command should do the trick

```
> npm start
```

under the hood this runs `echo-build` command with with `-s` ans `-d`.

The command `-s` is for serve. this wil start up a server on port 3000.
The command `-d` is for development mode.

## Publish

This feature is not yet implemented in `@equinor/echo-cli` but here you can find a outline og what should be possible.

### Spec

There are several ways this could be done, and this is just one of the solutions.

### Admin Module

A administration module should be developed. In local development you should be able to run echo with then module attached. This can be don trough `-a` flag for administrator. this should add a copy of the admin module to the echo-manifest created when bundling the module. The administration app should be found in right menu under applications. The administrator app should have the following features.

1. Create new Module section
2. Application GUID reveal when nev module is created.
3. Edit Module
4. List of all Current modules.
5. View module Details
6. List of your local module which have not yet been created for fast module creation
7. Publish and un publish of modules.
8. Delete module.

### Publish

When development is done or you want to publish det module to echo. It's should be as simple as typing the following command

```
echo-publish
```

To be able to publish the module a moduleId world be requires. This is so that publishing trough github actions without the two factor authentication will work.

This moduleId should be added to github secrets for use with gitHub actions and in a echoModule.config.json file in the root of the project. This file should noe be published to github.

```Json
{
    "moduleId": "9f7f8ef9-2741-44cf-9618-322a89244920",
    "outputPath": "/build",
    "manifest": {
        "name": "My Echo App",
        "key": "myapp",
        "shortName": "myapp",
        "path": "/myapp",
        "version": "0.0.1",
        "requireRef": "echoDepLoader"
    }
}
```
