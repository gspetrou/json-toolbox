import * as vscode from "vscode";

/**
 * Called when your extension is activated, when a command from the extension is
 * first executed.
 */
export const activate = (context: vscode.ExtensionContext): void => {
  console.log('Congratulations, your extension "json-toolbox" is now active!');

  const disposable = vscode.commands.registerCommand(
    "json-toolbox.helloWorld",
    () => {
      vscode.window.showInformationMessage("222Hello World from JSON Toolbox!");
    },
  );

  context.subscriptions.push(disposable);
};

/**
 * Called when your extension is deactivated.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const deactivate = (): void => {};
