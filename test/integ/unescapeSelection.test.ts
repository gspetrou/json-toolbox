import { vscodeTextTransformationTestSuite } from "./utils.js";

vscodeTextTransformationTestSuite({
  testSuiteName: "unescapeSelection",
  commandToExecute: "json-toolbox.unescapeSelection",
  testData: [
    {
      testName: "unescapes the given JSON",
      input: '{\\"hello\\":\\t\\"world\\"}',
      expectedOutput: '{"hello":\t"world"}',
      useSpaces: true,
      indentSize: 2,
    },
  ],
});
