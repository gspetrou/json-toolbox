import { describe, it } from "mocha";
import { expectVscodeTextCommandTransformation } from "./utils.js";

describe("escapeSelection", () => {
  it("escapes the input as expected", async function () {
    this.timeout(5000);

    await expectVscodeTextCommandTransformation({
      initialText: '{"hello":\t"world"}',
      expectedOutput: '{\\"hello\\":\\t\\"world\\"}',
      commandToExecute: "json-toolbox.escapeSelection",
      useSpaces: true,
      indentSize: 2,
    });
  });
});
