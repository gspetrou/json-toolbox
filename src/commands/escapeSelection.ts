import { type TextEditor, type TextEditorEdit, window } from "vscode";
import { applyTransformationToSelection } from "../vscode-utils.js";

/**
 * VSCode command handler to escape the actively selected text so that it can
 * be thrown into a JSON string field.
 */
const escapeSelectionCommandHandler = (
  editor: TextEditor,
  edit: TextEditorEdit,
): void => {
  applyTransformationToSelection({
    editor,
    edit,
    getTransformationToApply: ({ selectedText }) => ({
      transformedText: JSON.stringify(selectedText),
    }),
  });

  window.showInformationMessage("Success!");
};

export default escapeSelectionCommandHandler;
