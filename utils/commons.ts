const templates = [
  {
    title: "React v18, Tailwind, DaisyUI",
    value: "react-tw-daisyui",
  },
];

const extras = {
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
      `,
    },
    {
      title: "MobX",
      value: "mobx",
    },
  ],
};

export default {
  templates,
  extras,
};
