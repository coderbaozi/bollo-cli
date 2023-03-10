import fs from "fs-extra"
import path from "path"
import inquirer from "inquirer"
import Generator from "./generator.js"

export async function create(name, options) {
  const cwd = process.cwd();
  const targetDir = path.join(cwd, name);

  if (fs.existsSync(targetDir)) {
    if (options.force) {
      fs.removeSync(targetDir);
    } else {
      let { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "Target directory already exists Pick an action",
          choices: [
            {
              name: "Overwrite",
              value: "overwrite",
            },
            {
              name: "Cancel",
              value: false,
            },
          ],
        },
      ]);

      if (!action) {
        return;
      } else if (action == "overwrite") {
        fs.removeSync(targetDir);
      }
    }
  }

  const generator = new Generator(name,targetDir)

  // create project
  generator.create()
}
