#!/usr/bin/env node

import path from "node:path";
import {fileURLToPath} from "node:url";
import {cp, readFile, writeFile} from "node:fs/promises";
import {glob} from "glob";
import color from "picocolors";
import prompts from "prompts";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";

// Specify CLI arguments
const args = yargs(hideBin(process.argv)).options({
  name: {
    alias: "n",
    type: "string",
    description: "Name of the project",
  },
  template: {
    alias: "t",
    type: "string",
    description: "Template to use",
  },
});

// Orverride arguments passed on the CLI
prompts.override(args.argv);

async function main() {
  const project = await prompts(
    [
      {
        type: "text",
        name: "name",
        message: "What is the name of your project?",
        initial: "sarasa-project",
        validate: (value) => {
          if (value.match(/[^a-zA-Z0-9-_]+/g))
            return "Project name can only contain letters, numbers, dashes and underscores";

          return true;
        },
      },
      {
        type: "select",
        name: "template",
        message: `Which template would you like to use?`,
        initial: 0,
        choices: [
          {
            title: "React v18 + ChakraUI + MobX-State-Tree + Formik (with Vite)",
            value: "react-chakra-mobx-formik"
          },
          {
            title: "React v18 + Tailwind + ShadcnUI + MobX-State-Tree + Formik (with Vite)",
            value: "react-tw-shadcn-mobx-formik"
          },
          {
            title: "Next v13 + Tailwind + ShadcnUI + Formik (with app dir)",
            value: "next-tw-shadcn-formik-app"
          },
        ],
      },
    ],
    {
      onCancel: () => {
        console.log("\nBye 👋\n");

        process.exit(0);
      },
    },
  );

  const template = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "templates",
    project.template,
  );
  const destination = path.join(process.cwd(), project.name);

  // Copy files from the template folder to the current directory
  await cp(template, destination, {recursive: true});

  // Get all files from the destination folder
  const files = await glob(`**/*`, {nodir: true, cwd: destination, absolute: true});

  // Read each file and replace the tokens
  for await (const file of files) {
    const data = await readFile(file, "utf8");
    const draft = data.replace(/{{name}}/g, project.name);

    await writeFile(file, draft, "utf8");
  }

  // Log outro message
  console.log("✨ Project created ✨");
  console.log(`\n${color.yellow(`Next steps:`)}\n`);
  console.log(`${color.green(`cd`)} ${project.name}`);
  console.log(`${color.green(`yarn`)} install`);
  console.log(`${color.green(`yarn`)} dev`);
}

main().catch(console.error);