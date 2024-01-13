#!/usr/bin/env node

import path from "node:path";
import {fileURLToPath} from "node:url";
import {cp, readFile, writeFile} from "node:fs/promises";
import {glob} from "glob";
import color from "picocolors";
import prompts from "prompts";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import commons from "./utils/commons.js";

const {templates, extras} = commons;

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
  const {
    _: [initialName, initialProject],
  } = await args.argv;

  const project = await prompts(
    [
      {
        type: "text",
        name: "name",
        message: "What is the name of the project?",
        initial: initialName || "incu-app",
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
        initial: initialProject || 0,
        choices: templates,
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
  await cp(path.join(template, "project"), destination, {recursive: true});

  // Get the extras for the selected template
  let extrasArr: string[] = [];

  if (extras[project.template]) {
    const {extras: results} = await prompts({
      type: "multiselect",
      name: "extras",
      message: "Which extras would you like to add?",
      instructions: false,
      choices: extras[project.template],
    });

    // Assign to variable
    extrasArr = results;

    for await (const extra of extrasArr) {
      // Copy files from the extra folder to the current directory
      await cp(path.join(template, "extras", extra), destination, {recursive: true});
    }
  }

  // Get all files from the destination folder
  const files = await glob(`**/*`, {nodir: true, cwd: destination, absolute: true});

  // Read each file and replace the tokens
  for await (const file of files) {
    const data = await readFile(file, "utf8");
    const draft = data.replace(/{{name}}/g, project.name);

    await writeFile(file, draft, "utf8");
  }

  // Extras log
  if (extrasArr.length) {
    console.log(
      `\nCheck out the ${color.italic("README.md")} file inside ${color.green(
        extrasArr.join(", "),
      )} for more info on how to use it.`,
    );
  }

  // Log outro message
  console.log("✨ Project created ✨");
  console.log(`\n${color.yellow(`Next steps:`)}\n`);
  console.log(`${color.green(`cd`)} ${project.name}`);
  console.log(`${color.green(`yarn`)} or ${color.green(`npm i`)}`);
  console.log(`${color.green(`yarn dev`)} or ${color.green(`npm run dev`)}`);
}

main().catch(console.error);
