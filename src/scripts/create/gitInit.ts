import execa = require("execa");
import * as fs from "fs";
import path = require("path");

export async function initGit(targetDirectory: string): Promise<unknown> {
  const init = await execa("git", ["init"], {
    cwd: targetDirectory,
  });
  if (init.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  const gitIgnorePath = path.join(targetDirectory || "", "/.gitignore");
  await fs.writeFile(gitIgnorePath, "node_modules\r\n./dist", (err: any) => {
    if (err) {
      return Promise.reject(new Error("Failed to create .gitignore file"));
    }
  });
  return;
}
