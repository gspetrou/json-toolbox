import * as assert from "node:assert";
import { suite, test } from "mocha";
import * as vscode from "vscode";

// TODO: Write real tests lol

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
});
