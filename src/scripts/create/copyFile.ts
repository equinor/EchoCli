import * as fs from "fs";
import * as ncp from "ncp";
import { promisify } from "util";
import { TemplateDir } from "../../types/createTypes";
import path = require("path");

const copy = promisify(ncp);

export async function copyTemplateFiles(
  options: TemplateDir
): Promise<boolean> {
  const success = await copy(
    options.templateDirectory,
    options.targetDirectory,
    {
      clobber: false,
    }
  );

  const indexJsPath = path.join(
    options.targetDirectory || "",
    "src",
    "index.tsx"
  );
  const indexJsContent = fs.readFileSync(indexJsPath).toString();

  let indexJsContentReplaced = indexJsContent.replace(
    "{appKey}",
    options.key || "app-key"
  );

  fs.writeFileSync(indexJsPath, indexJsContentReplaced);

  return success;
}
