export function getAppTemplate(templateName: string): string {
  let template = "echoAppTemplate";
  switch (templateName) {
    case "app":
      template = "echoAppTemplate";
      break;
    case "plugin":
      template = "echoPluginTemplate";
      break;
    case "library":
      template = "echoLibraryTemplate";
      break;
    default:
      template = "echoAppTemplate";
      break;
  }

  return `../../../templates/${template}`;
}