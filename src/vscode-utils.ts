import { type TextEditor, Range, type TextEditorEdit, window } from "vscode";

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
 * simply needs to transforms the currently highlighted text in the active
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
  } catch (_error) {
    window.showErrorMessage("Failure!");
    return;
  }

  edit.replace(selectedRange, transformedText);
};
