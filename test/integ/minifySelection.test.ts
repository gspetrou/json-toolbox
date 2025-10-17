import { describe, it } from "mocha";
import { expectVscodeTextCommandTransformation } from "./utils.js";

describe("minifySelection", () => {
  it("minifies the input as expected", async function () {
    this.timeout(5000);

    await expectVscodeTextCommandTransformation({
      initialText: JSON.stringify({ hello: "world" }, null, 2),
      expectedOutput: '{"hello":"world"}',
      commandToExecute: "json-toolbox.minifySelection",
      useSpaces: true,
      indentSize: 2,
    });
  });
});
