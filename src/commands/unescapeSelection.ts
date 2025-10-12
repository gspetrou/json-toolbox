import { type TextEditor, type TextEditorEdit } from "vscode";

/**
 * VSCode command handler to un-escape the actively selected text. Generally
 * useful when reading a string field from JSON that you also want to parse into
 * another JSON object.
 */
const unescapeSelectionCommandHandler = (
  _editor: TextEditor,
  _edit: TextEditorEdit,
): void => {
  throw new Error("not implemented");
};

export default unescapeSelectionCommandHandler;
