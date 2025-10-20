import assert from "node:assert";
import { type Suite, before, describe, test } from "mocha";
import {
  type TextEditor,
  Range,
  window,
  workspace,
  Selection,
  commands,
} from "vscode";

/** Sleeps for the given milliseconds. */
const sleepMs = (sleepTimeMillisec: number) =>
  new Promise((resolve) => setTimeout(resolve, sleepTimeMillisec));

/**
 * Selects all text in the given editor's document.
 */
const selectAllTextInEditor = ({
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
const setEditorIndentationOptions = ({
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
 * Replaces all the text in the given editor with the given content.
 */
const replaceAllTextInEditorWith = ({
  editor,
  content,
}: {
  readonly editor: TextEditor;
  readonly content: string;
}) =>
  editor.edit((edit) => {
    edit.replace(
      editor.document.validateRange(
        new Range(0, 0, editor.document.lineCount, 0),
      ),
      content,
    );
  });

/**
 * Runs the callback until it returns a value instead of throwing. If the
 * callback throws `totalAttempts` times then the error bubbles up.
 */
const waitFor = async <T>(
  cb: () => T,
  opts?: {
    readonly delayMs: number;
    readonly totalAttempts: number;
  },
): Promise<T> => {
  const { delayMs = 10, totalAttempts = 3 } = opts ?? {};
  for (
    let attemptsRemaining = totalAttempts;
    attemptsRemaining > 0;
    attemptsRemaining--
  ) {
    try {
      return cb();
    } catch (error) {
      if (attemptsRemaining === 1) {
        throw error;
      }
      await sleepMs(delayMs);
    }
  }
  throw new Error("Reached unreachable code in waitFor!");
};

/**
 * Defines a test suite with a set of parametrized tests. These tests test a
 * VSCode text editor command that applies a text transformation.
 */
export const vscodeTextTransformationTestSuite = (args: {
  readonly testSuiteName: string;
  readonly testNamePrefix: string;
  readonly commandToExecute: string;
  readonly testData: ReadonlyArray<{
    readonly input: string;
    readonly expectedOutput: string;
    readonly useSpaces: boolean;
    readonly indentSize: number | "auto";
  }>;
}): Suite =>
  describe(args.testSuiteName, () => {
    let editor: TextEditor;

    before("create a VSCode editor and set it as active", async () => {
      const textDocument = await workspace.openTextDocument();
      editor = await window.showTextDocument(textDocument);
    });

    args.testData.forEach((testArgs) => {
      const testTitle =
        args.testNamePrefix
        + " when the input is: "
        + testArgs.input.slice(0, 100)
        + (testArgs.input.length > 100 ? "..." : "");

      test(testTitle, async () => {
        setEditorIndentationOptions({
          editor,
          useSpaces: testArgs.useSpaces,
          indentSize: testArgs.indentSize,
        });
        replaceAllTextInEditorWith({ editor, content: testArgs.input });

        await waitFor(() => {
          const initialText = editor.document.getText();
          assert.strictEqual(initialText, testArgs.input);
        });

        selectAllTextInEditor({ editor });
        commands.executeCommand(args.commandToExecute);

        await waitFor(() => {
          const updatedText = editor.document.getText();
          assert.strictEqual(updatedText, testArgs.expectedOutput);
        });
      });
    });
  });
