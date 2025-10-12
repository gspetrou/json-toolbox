import { type TextEditor, type TextEditorEdit, window } from "vscode";
import {
  applyTransformationToSelection,
  getPreferredIndentation,
} from "../vscode-utils.js";

/**
 * Creates a VSCode text editor command handler function which formats the
 * actively selected text to the amount of `indentSpaces`.
 */
const createFormattedJsonCommandHandler =
  ({ getIndentation }: { readonly getIndentation: () => number | string }) =>
  (editor: TextEditor, edit: TextEditorEdit): void => {
    applyTransformationToSelection({
      editor,
      edit,
      getTransformationToApply: ({ selectedText }) => ({
        transformedText: JSON.stringify(
          JSON.parse(selectedText),
          null,
          getIndentation(),
        ),
      }),
    });

    window.showInformationMessage("Success!");
  };

export const minifySelectionCommandHandler = createFormattedJsonCommandHandler({
  getIndentation: () => 0,
});

export const prettifySelectionCommandHandler =
  createFormattedJsonCommandHandler({
    getIndentation: getPreferredIndentation,
  });
