import * as assert from "node:assert";
import { suite, it } from "mocha";
import * as vscode from "vscode";
import {
  createActiveTextEditorWithContent,
  selectAllTextInEditor,
  sleepMs,
} from "./utils.js";

suite("minifySelection", () => {
  it("minifies the input as expected", async function () {
    this.timeout(5000);

    const originalText = JSON.stringify({ hello: "world" }, null, 2);
    const editor = await createActiveTextEditorWithContent({
      content: originalText,
    });
    selectAllTextInEditor({ editor });

    await sleepMs(500);

    vscode.commands.executeCommand("json-toolbox.minifySelection");

    await sleepMs(500);

    const updatedText = editor.document.getText();
    assert.strictEqual(updatedText, '{"hello":"world"}');
  });
});
