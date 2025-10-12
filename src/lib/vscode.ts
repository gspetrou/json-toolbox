import { inspect } from "node:util";
import { type TextEditor, Range, type TextEditorEdit, window } from "vscode";

/**
 * Default to indenting with this many spaces if we can't determine the
 * preferred space amount.
 */
const FALLBACK_INDENT_SPACE_AMOUNT = 2;

/**
 * Attempts to determine the user's config to either use tabs, or to the
 * number of spaces configured for indentation.
 */
export const getPreferredIndentation = (): string | number => {
  const editorOptions = window.activeTextEditor?.options;
  if (!editorOptions) {
    return FALLBACK_INDENT_SPACE_AMOUNT;
  }
  if (!editorOptions.insertSpaces) {
    return "\t";
  }
  return editorOptions.tabSize ?? FALLBACK_INDENT_SPACE_AMOUNT;
};

/**
 * Gets the currently selected {@link Range} of text from the given editor.
 */
export const getSelectedRangeFromEditor = ({
  editor,
}: {
  readonly editor: TextEditor | undefined;
}): Range | undefined => {
  const editorSelection = editor?.selection;
  if (!editorSelection || editorSelection.isEmpty) {
    return;
  }
  return new Range(
    editorSelection.start.line,
    editorSelection.start.character,
    editorSelection.end.line,
    editorSelection.end.character,
  );
};

/**
 * Makes it easy to create a VSCode text editor command handler function which
 * needs to transforms the currently highlighted text in the active
 * editor, to another piece of text.
 */
export const applyTransformationToSelection = (args: {
  readonly editor: TextEditor;
  readonly edit: TextEditorEdit;
  readonly getTransformationToApply: (args: {
    readonly selectedText: string;
  }) => {
    readonly transformedText: string;
  };
}): void => {
  const { editor, edit, getTransformationToApply } = args;
  const selectedRange = getSelectedRangeFromEditor({ editor });
  if (!selectedRange) {
    window.showErrorMessage("No text is selected.");
    return;
  }
  const selectedText = editor.document.getText(selectedRange);

  let transformedText: string;
  try {
    const transform = getTransformationToApply({ selectedText });
    transformedText = transform.transformedText;
  } catch (e: unknown) {
    // Visible by going to Help -> Toggle Developer Tools -> Console
    console.error(`JSON Toolbox command failure: ${inspect(e)}`);

    const errMsg =
      e instanceof Error ?
        `${e.name} - ${e.message}`
      : "Unknown, see DevTools.";
    window.showErrorMessage(`FAILURE: ${errMsg}`);
    return;
  }

  edit.replace(selectedRange, transformedText);
};
