import updateEchoPackages from '@equinor/echo-update';
import chalk from 'chalk';
import * as fs from 'fs';
import Listr from 'listr';
import path from 'path';
import { projectInstall } from 'pkg-install';
import { promisify } from 'util';
import { createEchoModuleConfig } from '../../config/common/echoModuleConfig';
import { createEchoModuleId } from '../../config/common/echoModuleId';
import { TemplateDir } from '../../types/createTypes';
import { copyTemplateFiles } from './copyFile';
import { createAndSetTargetDir } from './createSetTargetDirectory';
import { getAppTemplateName } from './getAppTemplateName';
import { initGit } from './gitInit';
import { updatePackageConfig } from './updatePackageConfig';
import { updateReadme } from './updateReadme';

const access = promisify(fs.access);

export async function createProject(options: TemplateDir): Promise<boolean> {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || (await createAndSetTargetDir(options.key || ''))
    };

    try {
        options.templateDirectory = await getTemplateDir(options);
    } catch (error) {
        throw error;
    }

    const tasks = new Listr([
        {
            task: (): Promise<boolean> => copyTemplateFiles(options),
            title: 'Copy project files'
        },
        {
            enabled: (): boolean => (options.git ? true : false),
            task: (): Promise<unknown> => initGit(options.targetDirectory || ''),
            title: 'Initialize git'
        },
        {
            task: async (): Promise<void> => {
                await updatePackageConfig(options);
                await updateEchoPackages(options.targetDirectory || '', false);
            },
            title: 'Update package config'
        },
        {
            task: async (): Promise<void> => {
                await createEchoModuleConfig(options);
            },
            title: 'Create echo config'
        },
        {
            task: async (): Promise<void> => {
                await createEchoModuleId(options);
            },
            title: 'Create echo Id File'
        },
        {
            task: (): Promise<void> => updateReadme(options),
            title: 'Update Readme'
        },
        {
            skip: (): string | undefined =>
                !options.install ? 'Pass --install to automatically install dependencies' : undefined,
            task: (): Promise<unknown> =>
                projectInstall({
                    cwd: options.targetDirectory
                }),
            title: 'Install dependencies'
        }
    ]);

    console.log(
        `Creating ${chalk.cyan(getAppTemplateName(options.templateName))} named ${chalk.green.bold(options.name)}`,
        chalk.green.bold('START')
    );

    await tasks.run();
    console.log('%s App ready', chalk.green.bold('DONE'));
    return true;
}

async function getTemplateDir(options: TemplateDir): Promise<string> {
    const templateDir = path.resolve(__filename, `../../../../templates/${getAppTemplateName(options.templateName)}`);

    console.log(templateDir);
    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        if (err instanceof Error) {
            console.error('%s Invalid template name', chalk.red.bold('ERROR'));
            process.exit(1);
        } else {
            throw err;
        }
    }

    return templateDir;
}
