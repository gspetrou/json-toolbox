import { vscodeTextTransformationTestSuite } from "./utils.js";

vscodeTextTransformationTestSuite({
  testSuiteName: "unescapeSelection",
  testNamePrefix: "unescapes the expected text",
  commandToExecute: "json-toolbox.unescapeSelection",
  testData: [
    {
      input: '{\\"hello\\":\\t\\"world\\"}',
      expectedOutput: '{"hello":\t"world"}',
      useSpaces: true,
      indentSize: 2,
    },
  ],
});
