import { type TextEditor, type TextEditorEdit } from "vscode";
import { applyTransformationToSelection } from "../lib/vscode.js";

/**
 * VSCode command handler to escape the actively selected text so that it can
 * be thrown into a JSON string field.
 */
export const escapeSelectionCommandHandler = (
  editor: TextEditor,
  edit: TextEditorEdit,
): void => {
  applyTransformationToSelection({
    editor,
    edit,
    getTransformationToApply: ({ selectedText }) => ({
      // Slicing here to remove the double quotes that JSON.stringify will
      // automatically wrap around the given text.
      transformedText: JSON.stringify(selectedText).slice(1, -1),
    }),
  });
};
