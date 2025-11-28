import { describe, expect, it } from "vitest";
import { unescapeJson } from "../../../src/lib/json.js";
import {
  CONTROL_CHAR_AND_ESCAPED_PAIRS,
  COMMON_CONTROL_CHARS,
} from "../../common/control-chars.js";

describe("unescapeJson", () => {
  it.each<
    Readonly<{
      inputEscapedJsonStr: string;
      expectedUnescapedStr: string;
    }>
  >([
    { inputEscapedJsonStr: "", expectedUnescapedStr: "" },
    { inputEscapedJsonStr: "{}", expectedUnescapedStr: "{}" },
    { inputEscapedJsonStr: '\\"', expectedUnescapedStr: '"' },
    { inputEscapedJsonStr: "\\\\", expectedUnescapedStr: "\\" },
    { inputEscapedJsonStr: "\\/", expectedUnescapedStr: "/" },
    {
      inputEscapedJsonStr: "\\b",
      expectedUnescapedStr: COMMON_CONTROL_CHARS.Backspace,
    },
    {
      inputEscapedJsonStr: "\\r",
      expectedUnescapedStr: COMMON_CONTROL_CHARS.CarriageReturn,
    },
    {
      inputEscapedJsonStr: "\\n",
      expectedUnescapedStr: COMMON_CONTROL_CHARS.Newline,
    },
    {
      inputEscapedJsonStr: "\\f",
      expectedUnescapedStr: COMMON_CONTROL_CHARS.Formfeed,
    },
    {
      inputEscapedJsonStr: "\\t",
      expectedUnescapedStr: COMMON_CONTROL_CHARS.Tab,
    },
    ...CONTROL_CHAR_AND_ESCAPED_PAIRS.map(({ controlChar, escapedStr }) => ({
      inputEscapedJsonStr: escapedStr, // Ex: "\\u001f"
      expectedUnescapedStr: controlChar, // Ex: String.fromCodePoint(0x001f)
    })),
    {
      // No changes expected, encoded control chars only go up to 0x001f
      inputEscapedJsonStr: "\\u0020",
      expectedUnescapedStr: "\\u0020",
    },
  ])(
    "returns the expected output when given: $inputEscapedJsonStr",
    ({ inputEscapedJsonStr, expectedUnescapedStr }) => {
      expect(unescapeJson(inputEscapedJsonStr)).toEqual(expectedUnescapedStr);
    },
  );
});
