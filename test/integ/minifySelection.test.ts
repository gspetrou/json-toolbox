import { vscodeTextTransformationTestSuite } from "./utils.js";

vscodeTextTransformationTestSuite({
  testSuiteName: "minifySelection",
  commandToExecute: "json-toolbox.minifySelection",
  testData: [
    {
      testName: "minifies the given JSON",
      input: JSON.stringify({ hello: "world" }, null, 2),
      expectedOutput: '{"hello":"world"}',
      useSpaces: true,
      indentSize: 2,
    },
  ],
});
