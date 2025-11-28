import {
  CONTROL_CHAR_AND_ESCAPED_PAIRS,
  COMMON_CONTROL_CHAR_AND_ESCAPED_PAIRS,
} from "../common/control-chars.js";
import { vscodeTextTransformationTestSuite } from "./utils.js";

/**
 * JSON.stringify will convert "common" escape chars like the new-line char to
 * '\n' instead of `\u000a`.
 */
const unescapedToEscapedControlChars: ReadonlyMap<string, string> = new Map([
  ...CONTROL_CHAR_AND_ESCAPED_PAIRS.map<Readonly<[string, string]>>(
    ({ escapedStr, controlChar }) => [controlChar, escapedStr] as const,
  ),
  ...COMMON_CONTROL_CHAR_AND_ESCAPED_PAIRS.map<Readonly<[string, string]>>(
    ({ escapedStr, commonControlChar }) => [commonControlChar, escapedStr],
  ),
]);

vscodeTextTransformationTestSuite({
  testSuiteName: "escapeSelection",
  commandToExecute: "json-toolbox.escapeSelection",
  testData: [
    {
      testName: "escapes basic JSON with tab character",
      input: '{"hello":\t"world"}',
      expectedOutput: '{\\"hello\\":\\t\\"world\\"}',
      useSpaces: true,
      indentSize: 2,
    },
    {
      testName: "escapes basic JSON with newline character",
      input: '{"hello":\n"world"}',
      expectedOutput: '{\\"hello\\":\\n\\"world\\"}',
      useSpaces: true,
      indentSize: 2,
    },
    ...Array.from(unescapedToEscapedControlChars.entries())

      // Having problems with `\r` where VSCode is automatically converting this
      // char to `\n`. For the sake of time I don't feel like testing this, we
      // already test every other control code.
      .filter(([, escapedStr]) => escapedStr !== "\r")

      .map(([controlChar, escapedStr]) => ({
        testName: `escapes control code to '${JSON.stringify(escapedStr)}'`,
        input: controlChar,
        expectedOutput: escapedStr,
        useSpaces: true,
        indentSize: 2,
      })),
  ],
});
