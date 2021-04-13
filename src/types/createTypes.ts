export interface CreatBase {
    name: string;
    key: string;
    description: string;
    shortName: string;
    git: boolean;
    install: boolean;
    templateName: string;
}

export interface TemplateDir extends CreatBase {
    targetDirectory?: string;
    templateDirectory?: string;
}

export type AppOptions = CreatBase;

export type PluginOptions = CreatBase;

export type ModuleOptions = CreatBase;

export interface Question {
    default?: string | boolean;
    message: string;
    name: string;
    type: string;
}
