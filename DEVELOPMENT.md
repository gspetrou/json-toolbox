# DEVELOPMENT.md

This file contains a development guide.


## Prerequisites

- Install [pnpm](https://pnpm.io/) and Node, see what versions you need
in `package.json`.
- In VSCode, open the `json-toolbox.code-workspace` workspace and install
any extensions you are recommended.
  - When working in this repo you should do it from the workspace.


## Building and testing

As with most Node packages, look in `package.json` to see available commands.
The important ones:
- `pnpm install` - Install dependencies
- `pnpm release` - Typecheck, lint, build, and test


### Running/debugging the extension locally
With the VSSCode workspace open hit `F5` or run the `Debug: Start Debugging`
command to open another instance of VSCode with the extension loaded.
- Note that this loads the last build output from `pnpm build`. You need to
build your changes before testing them.
- Debugging can work if you set breakpoints on the build output in the `dist/`
folder, though you may need to temporarily disable minification to do so.


## Reference

- [VSCode Extensions API](https://code.visualstudio.com/api)
- [VSCode Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [VSCode Command Docs](https://code.visualstudio.com/api/extension-guides/command)
- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)
