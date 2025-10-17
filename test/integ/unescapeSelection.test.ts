import * as assert from "node:assert";
import { suite, it } from "mocha";
import * as vscode from "vscode";
import {
  createActiveTextEditorWithContent,
  selectAllTextInEditor,
  setEditorIndentationOptions,
  sleepMs,
} from "./utils.js";

suite("unescapeSelection", () => {
  it("unescapes the input as expected", async function () {
    this.timeout(5000);

    const originalText = '{\\"hello\\":\\t\\"world\\"}';
    const editor = await createActiveTextEditorWithContent({
      content: originalText,
    });
    setEditorIndentationOptions({ editor, useSpaces: true, indentSize: 2 });
    selectAllTextInEditor({ editor });

    await sleepMs(500);

    vscode.commands.executeCommand("json-toolbox.unescapeSelection");

    await sleepMs(500);

    const updatedText = editor.document.getText();
    assert.strictEqual(updatedText, '{"hello":\t"world"}');
  });
});
