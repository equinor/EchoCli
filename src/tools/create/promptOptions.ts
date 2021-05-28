import * as inquirer from 'inquirer';
import { Question, TemplateDir } from '../../types/createTypes';

export async function promptForMissingOptions(options: Partial<TemplateDir>): Promise<TemplateDir> {
    const questions: Question[] = [];
    const nameQuestion: Question[] = [];
    const templateQuestion: Question[] = [];

    if (!options.name || typeof options.name !== 'string') {
        nameQuestion.push({
            message: 'Please enter a app name',
            name: 'name',
            type: 'input'
        });
    }
    const selectedName = nameQuestion.length !== 0 ? await inquirer.prompt(nameQuestion) : options;
    if (!options.key) {
        questions.push({
            default: selectedName && slugify(selectedName.name),
            message: 'Please enter a app key',
            name: 'key',
            type: 'input'
        });
    }
    if (!options.shortName) {
        questions.push({
            default: selectedName.name,
            message: 'Please enter a app shortname',
            name: 'shortName',
            type: 'input'
        });
    }
    if (!options.description) {
        questions.push({
            default: '',
            message: 'Please enter a app description',
            name: 'description',
            type: 'input'
        });
    }

    if (!options.templateName) {
        templateQuestion.push({
            default: 'app',
            message: 'Please enter a app template (app | appTutorial)',
            name: 'template',
            type: 'input'
        });
    }

    const selectedTemplate = templateQuestion.length !== 0 ? await inquirer.prompt(templateQuestion) : options;

    if (!options.key) {
        questions.push({
            default: true,
            message: 'Initialize git?',
            name: 'git',
            type: 'confirm'
        });
    }
    if (!options.install) {
        questions.push({
            default: false,
            message: 'Install dependencies?',
            name: 'install',
            type: 'confirm'
        });
    }
    const answers = await inquirer.prompt(questions);
    console.log(selectedTemplate.template);
    return {
        ...options,
        description: options.description || answers.description,
        git: options.git || answers.git,
        install: options.install || answers.install,
        key: options.key || answers.key,
        name: selectedName.name,
        shortName: options.shortName || answers.shortName,
        templateName: selectedTemplate.template
    };
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}
