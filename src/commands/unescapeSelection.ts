import { type TextEditor, type TextEditorEdit } from "vscode";
import { unescapeJson } from "../lib/json.js";
import { applyTransformationToSelection } from "../lib/vscode.js";

/**
 * VSCode command handler to un-escape the actively selected text. Generally
 * useful when reading a string field from JSON that you also want to parse into
 * another JSON object.
 */
export const unescapeSelectionCommandHandler = (
  editor: TextEditor,
  edit: TextEditorEdit,
): void => {
  applyTransformationToSelection({
    editor,
    edit,
    getTransformationToApply: ({ selectedText }) => ({
      transformedText: unescapeJson(selectedText),
    }),
  });
};
