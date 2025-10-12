import { type ExtensionContext, commands } from "vscode";
import escapeSelectionCommandHandler from "./commands/escapeSelection.js";
import {
  minifySelectionCommandHandler,
  prettifySelectionCommandHandler,
} from "./commands/minifyPrettifySelection.js";
import unescapeSelectionCommandHandler from "./commands/unescapeSelection.js";

/**
 * Called when the extension is activated, when a command from the extension is
 * first executed.
 */
export const activate = (context: ExtensionContext): void => {
  context.subscriptions.push(
    commands.registerTextEditorCommand(
      "json-toolbox.escapeSelection",
      escapeSelectionCommandHandler,
    ),
  );

  context.subscriptions.push(
    commands.registerTextEditorCommand(
      "json-toolbox.prettifySelection",
      prettifySelectionCommandHandler,
    ),
  );

  context.subscriptions.push(
    commands.registerTextEditorCommand(
      "json-toolbox.minifySelection",
      minifySelectionCommandHandler,
    ),
  );

  context.subscriptions.push(
    commands.registerTextEditorCommand(
      "json-toolbox.unescapeSelection",
      unescapeSelectionCommandHandler,
    ),
  );
};
