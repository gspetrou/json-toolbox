import { type TextEditor, type TextEditorEdit, window } from "vscode";
import { applyTransformationToSelection } from "../vscode-utils.js";

/**
 * Creates a VSCode text editor command handler function which formats the
 * actively selected text to the amount of `indentSpaces`.
 */
const createFormattedJsonCommandHandler =
  ({ indentSpaces }: { readonly indentSpaces: 0 | 2 }) =>
  (editor: TextEditor, edit: TextEditorEdit): void => {
    applyTransformationToSelection({
      editor,
      edit,
      getTransformationToApply: ({ selectedText }) => ({
        transformedText: JSON.stringify(
          JSON.parse(selectedText),
          null,
          indentSpaces,
        ),
      }),
    });

    window.showInformationMessage("Success!");
  };

export const minifySelectionCommandHandler = createFormattedJsonCommandHandler({
  indentSpaces: 0,
});
export const prettifySelectionCommandHandler =
  createFormattedJsonCommandHandler({
    indentSpaces: 2, // TODO: Make this the editor's indent size
  });
