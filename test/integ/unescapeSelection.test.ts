import { describe, it } from "mocha";
import { expectVscodeTextCommandTransformation } from "./utils.js";

describe("unescapeSelection", () => {
  it("unescapes the input as expected", async function () {
    this.timeout(5000);

    await expectVscodeTextCommandTransformation({
      initialText: '{\\"hello\\":\\t\\"world\\"}',
      expectedOutput: '{"hello":\t"world"}',
      commandToExecute: "json-toolbox.unescapeSelection",
      useSpaces: true,
      indentSize: 2,
    });
  });
});
