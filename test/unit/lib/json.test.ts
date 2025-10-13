import { describe, expect, it } from "vitest";
import { unescapeJson } from "../../../src/lib/json.js";

const CONTROL_CODES = {
  Backspace: String.fromCodePoint(0x0008),
  CarriageReturn: String.fromCodePoint(0x000d),
  Formfeed: String.fromCodePoint(0x000c),
  Newline: String.fromCodePoint(0x000a),
  Tab: String.fromCodePoint(0x0009),
} as const;

const numberToUnicode16String = (num: number): string => {
  const numHexStr = num.toString(16);
  const neededPadding = 4 - numHexStr.length;
  return `\\u` + "0".repeat(neededPadding) + numHexStr;
};

const CONTROL_CHAR_UNESCAPE_MAPPING = Array.from(
  { length: 0x001f + 1 },
  (_, i) => i,
).reduce<Record<string, string>>(
  (prevObj, controlCharUnicodeNumber) => ({
    ...prevObj,
    [numberToUnicode16String(controlCharUnicodeNumber)]: String.fromCharCode(
      controlCharUnicodeNumber,
    ),
  }),
  {},
);

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
      expectedUnescapedStr: CONTROL_CODES.Backspace,
    },
    {
      inputEscapedJsonStr: "\\r",
      expectedUnescapedStr: CONTROL_CODES.CarriageReturn,
    },
    {
      inputEscapedJsonStr: "\\n",
      expectedUnescapedStr: CONTROL_CODES.Newline,
    },
    {
      inputEscapedJsonStr: "\\f",
      expectedUnescapedStr: CONTROL_CODES.Formfeed,
    },
    {
      inputEscapedJsonStr: "\\t",
      expectedUnescapedStr: CONTROL_CODES.Tab,
    },
    ...Object.entries(CONTROL_CHAR_UNESCAPE_MAPPING).map(
      ([uncodeStr, controlChar]) => ({
        inputEscapedJsonStr: uncodeStr, // Ex: "\\u001f"
        expectedUnescapedStr: controlChar, // Ex: String.fromCodePoint(0x001f)
      }),
    ),
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
