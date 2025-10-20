import { vscodeTextTransformationTestSuite } from "./utils.js";

vscodeTextTransformationTestSuite({
  testSuiteName: "prettifySelection",
  testNamePrefix: "prettifies the expected text",
  commandToExecute: "json-toolbox.prettifySelection",
  testData: [
    (() => {
      const inputObject = { hello: "world" };
      return {
        input: JSON.stringify(inputObject, null, 0),
        expectedOutput: JSON.stringify(inputObject, null, 2),
        useSpaces: true,
        indentSize: 2,
      };
    })(),
  ],
});
