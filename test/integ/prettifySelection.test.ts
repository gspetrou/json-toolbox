import { vscodeTextTransformationTestSuite } from "./utils.js";

vscodeTextTransformationTestSuite({
  testSuiteName: "prettifySelection",
  commandToExecute: "json-toolbox.prettifySelection",
  testData: [
    (() => {
      const inputObject = { hello: "world" };
      return {
        testName: "prettifies the given JSON",
        input: JSON.stringify(inputObject, null, 0),
        expectedOutput: JSON.stringify(inputObject, null, 2),
        useSpaces: true,
        indentSize: 2,
      };
    })(),
  ],
});
