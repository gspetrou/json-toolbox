import { describe, it } from "mocha";
import { expectVscodeTextCommandTransformation } from "./utils.js";

describe("prettifySelection", () => {
  it("prettifies the input as expected", async function () {
    this.timeout(5000);

    const inputObject = { hello: "world" };
    await expectVscodeTextCommandTransformation({
      initialText: JSON.stringify(inputObject, null, 0),
      expectedOutput: JSON.stringify(inputObject, null, 2),
      commandToExecute: "json-toolbox.prettifySelection",
      useSpaces: true,
      indentSize: 2,
    });
  });
});
