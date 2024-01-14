#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// index.ts
var import_node_path = __toESM(require("path"));
var import_node_url = require("url");
var import_promises = require("fs/promises");
var import_glob = require("glob");
var import_picocolors = __toESM(require("picocolors"));
var import_prompts = __toESM(require("prompts"));
var import_yargs = __toESM(require("yargs"));
var import_helpers = require("yargs/helpers");

// utils/commons.ts
var templates = [
  {
    title: "React v18, Tailwind, DaisyUI",
    value: "react-tw-daisyui"
  }
];
var extras = {
  "react-tw-daisyui": [
    {
      title: "Zustand",
      value: "zustand",
      markdown: `
## With Zustand (Slice pattern)

> [Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
> [Slice Patter](https://docs.pmnd.rs/zustand/guides/slices-pattern)

Install zustand with \`yarn add zustand\` or \`npm install zustand\`.

You can divide your main store intro smaller individual stores to achieve modularity. This is simple to accomplish in Zustand!

View the example in \`src/store\` and \`src/components/DemoZustand.tsx\` to see how it works.
      `
    },
    {
      title: "MobX",
      value: "mobx",
      markdown: ``
    }
  ]
};
var commons_default = {
  templates,
  extras
};

// index.ts
var { templates: templates2, extras: extras2 } = commons_default;
var args = (0, import_yargs.default)((0, import_helpers.hideBin)(process.argv)).options({
  name: {
    alias: "n",
    type: "string",
    description: "Name of the project"
  },
  template: {
    alias: "t",
    type: "string",
    description: "Template to use"
  }
});
import_prompts.default.override(args.argv);
async function main() {
  const {
    _: [initialName, initialProject]
  } = await args.argv;
  const project = await (0, import_prompts.default)(
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
        }
      },
      {
        type: "select",
        name: "template",
        message: `Which template would you like to use?`,
        initial: initialProject || 0,
        choices: templates2
      }
    ],
    {
      onCancel: () => {
        console.log("\nBye \u{1F44B}\n");
        process.exit(0);
      }
    }
  );
  const template = import_node_path.default.join(
    import_node_path.default.dirname((0, import_node_url.fileURLToPath)(importMetaUrl)),
    "templates",
    project.template
  );
  const destination = import_node_path.default.join(process.cwd(), project.name);
  await (0, import_promises.cp)(import_node_path.default.join(template, "project"), destination, { recursive: true });
  let extrasArr = [];
  if (extras2[project.template]) {
    const { extras: results } = await (0, import_prompts.default)({
      type: "select",
      name: "extras",
      message: "Which extras would you like to add?",
      choices: extras2[project.template]
    });
    extrasArr.push(results);
    for await (const extra of extrasArr) {
      await (0, import_promises.cp)(import_node_path.default.join(template, "extras", extra), destination, { recursive: true });
    }
  }
  const files = await (0, import_glob.glob)(`**/*`, { nodir: true, cwd: destination, absolute: true });
  let markdown = "";
  extras2[project.template].forEach((e) => {
    if (extrasArr.includes(e.value)) {
      markdown += e.markdown;
    }
  });
  for await (const file of files) {
    const data = await (0, import_promises.readFile)(file, "utf8");
    const draft = data.replace(/{{name}}/g, project.name).replace(/{{markdown}}/g, markdown);
    await (0, import_promises.writeFile)(file, draft, "utf8");
  }
  if (extrasArr.length) {
    console.log(
      `
Check out the ${import_picocolors.default.italic("README.md")} file inside ${project.name} for more info on how to use it.`
    );
  }
  console.log("\u2728 Project created \u2728");
  console.log(`
${import_picocolors.default.yellow(`Next steps:`)}
`);
  console.log(`${import_picocolors.default.green(`cd`)} ${project.name}`);
  console.log(`${import_picocolors.default.green(`yarn`)} or ${import_picocolors.default.green(`npm i`)}`);
  console.log(`${import_picocolors.default.green(`yarn dev`)} or ${import_picocolors.default.green(`npm run dev`)}`);
}
main().catch(console.error);
//# sourceMappingURL=index.js.map