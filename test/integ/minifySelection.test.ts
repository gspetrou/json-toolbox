import { vscodeTextTransformationTestSuite } from "./utils.js";

vscodeTextTransformationTestSuite({
  testSuiteName: "minifySelection",
  testNamePrefix: "minifies the expected text",
  commandToExecute: "json-toolbox.minifySelection",
  testData: [
    {
      input: JSON.stringify({ hello: "world" }, null, 2),
      expectedOutput: '{"hello":"world"}',
      useSpaces: true,
      indentSize: 2,
    },
  ],
});
