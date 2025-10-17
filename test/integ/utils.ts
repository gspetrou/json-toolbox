import assert from "node:assert";
import {
  type TextEditor,
  Range,
  window,
  workspace,
  Selection,
  commands,
} from "vscode";

/** Sleeps for the given milliseconds. */
export const sleepMs = (sleepTimeMillisec: number) =>
  new Promise((resolve) => setTimeout(resolve, sleepTimeMillisec));

/**
 * Creates a new text document in VSCode, makes it the active editor, and sets
 * the contents of it.
 */
export const createActiveTextEditorWithContent = async ({
  content,
}: {
  readonly content: string;
}): Promise<TextEditor> => {
  const textDocument = await workspace.openTextDocument({
    content: content,
  });
  return window.showTextDocument(textDocument);
};

/**
 * Selects all text in the given editor's document.
 */
export const selectAllTextInEditor = ({
  editor,
}: {
  readonly editor: TextEditor;
}): void => {
  const document = editor.document;
  const fullRange = document.validateRange(
    new Range(0, 0, document.lineCount, 0),
  );
  editor.selection = new Selection(fullRange.start, fullRange.end);
};

/**
 * Configures whether to use tabs or spaces, and the size of an indent, in the
 * given editor.
 */
export const setEditorIndentationOptions = ({
  editor,
  useSpaces,
  indentSize,
}: {
  readonly editor: TextEditor;
  readonly useSpaces: boolean;
  readonly indentSize: number | "auto";
}): void => {
  editor.options.insertSpaces = useSpaces;
  editor.options.indentSize = indentSize;
  editor.options.tabSize = indentSize;
};

/**
 * High-level function which
 *   1. Defines an active text editor in VSCode prepopulated with `initialText`.
 *   2. Configures the editor to the given spacing/tabbing options.
 *   3. Runs the given `commandToExecute`.
 *   4. Checks the contents of the editor now matches `expectedOutput`.
 */
export const expectVscodeTextCommandTransformation = async (args: {
  readonly initialText: string;
  readonly expectedOutput: string;
  readonly commandToExecute: string;
  readonly useSpaces: boolean;
  readonly indentSize: number | "auto";
}): Promise<void> => {
  const editor = await createActiveTextEditorWithContent({
    content: args.initialText,
  });
  setEditorIndentationOptions({
    editor,
    useSpaces: args.useSpaces,
    indentSize: args.indentSize,
  });
  selectAllTextInEditor({ editor });

  await sleepMs(100);

  commands.executeCommand(args.commandToExecute);

  await sleepMs(100);

  const updatedText = editor.document.getText();
  assert.strictEqual(updatedText, args.expectedOutput);
};
