# Git Submodules

What is a submodule? A submodule is a git repository inside another git

You can read more about [here](https://www.atlassian.com/git/tutorials/git-submodule)

## Add a submodule

```bash
git submodule add <url> <path>
```

Example:

```bash
git submodule add git@github.com:jd-apprentice/React-Boilerplate.git templates/react-boilerplate
```

## Why use submodules?

- You can update the submodule independently
- You can use the submodule in other projects
- No need to have duplicated code