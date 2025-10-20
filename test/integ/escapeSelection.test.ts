import { vscodeTextTransformationTestSuite } from "./utils.js";

vscodeTextTransformationTestSuite({
  testSuiteName: "escapeSelection",
  testNamePrefix: "escapes the expected text",
  commandToExecute: "json-toolbox.escapeSelection",
  testData: [
    {
      input: '{"hello":\t"world"}',
      expectedOutput: '{\\"hello\\":\\t\\"world\\"}',
      useSpaces: true,
      indentSize: 2,
    },
    {
      input: '{"hello":\n"world"}',
      expectedOutput: '{\\"hello\\":\\n\\"world\\"}',
      useSpaces: true,
      indentSize: 2,
    },
  ],
});
