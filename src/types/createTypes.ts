export interface CreateBase {
    name: string;
    key: string;
    description: string;
    shortName: string;
    path: string;
    git: boolean;
    install: boolean;
    templateName: string;
}

export interface TemplateDir extends CreateBase {
    targetDirectory?: string;
    templateDirectory?: string;
}

export type AppOptions = CreateBase;

export type PluginOptions = CreateBase;

export type ModuleOptions = CreateBase;

export interface Question {
    default?: string | boolean;
    message: string;
    name: string;
    type: string;
}
