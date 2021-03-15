import chalk from "chalk";
import * as fs from "fs";
import Listr from "listr";
import path from "path";
import { projectInstall } from "pkg-install";
import { promisify } from "util";
import { TemplateDir } from "../../types/createTypes";
import { copyTemplateFiles } from "./copyFile";
import { createAndSetTargetDir } from "./createSetTargetDirectory";
import { initGit } from "./gitInit";
import { updatePackageConfig } from "./updatePackageConfig";

const access = promisify(fs.access);

export async function createProject(options: TemplateDir) {
  options = {
    ...options,
    targetDirectory:
      options.targetDirectory ||
      (await createAndSetTargetDir(options.key || "")),
  };

  try {
    options.templateDirectory = await getTemplateDir(options);
  } catch (error) {
    throw error;
  }

  const tasks = new Listr([
    {
      task: () => copyTemplateFiles(options),
      title: "Copy project files",
    },
    {
      enabled: () => (options.git ? true : false),
      task: () => initGit(options.targetDirectory || ""),
      title: "Initialize git",
    },
    {
      task: () => updatePackageConfig(options),
      title: "Update package config",
    },
    {
      skip: () =>
        !options.install
          ? "Pass --install to automatically install dependencies"
          : undefined,
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        }),
      title: "Install dependencies",
    },
  ]);

  console.log(
    `%s Creating ${chalk.cyan(options.templateName)} named ${chalk.green.bold(
      options.name
    )}`,
    chalk.green.bold("START")
  );

  await tasks.run();
  console.log("%s App ready", chalk.green.bold("DONE"));
  return true;
}

async function getTemplateDir(options: TemplateDir) {
  const templateDir = path.resolve(
    __filename,
    `../../../../templates/${options.templateName}`
  );

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    if (err instanceof Error) {
      console.error("%s Invalid template name", chalk.red.bold("ERROR"));
      process.exit(1);
    } else {
      throw err;
    }
  }

  return templateDir;
}
