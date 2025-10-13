/**
 * Converts a number like 1 to \u0001 or 18 to \u0012.
 *
 * This is not some battle-tested function, its only really a helper specific to
 * the range 0000-001F.
 */
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

const ESCAPED_TO_UNESCAPED_MAP = Object.freeze<Record<string, string>>({
  ...CONTROL_CHAR_UNESCAPE_MAPPING,
  ['\\"']: '"',
  ["\\\\"]: "\\",
  ["\\/"]: "/",
  ["\\b"]: String.fromCodePoint(0x0008), // backspace
  ["\\f"]: String.fromCodePoint(0x000c), // form-feed
  ["\\n"]: String.fromCodePoint(0x000a), // new-line,
  ["\\r"]: String.fromCodePoint(0x000d), // carriage-return
  ["\\t"]: String.fromCodePoint(0x0009), // tab
});

/**
 * Converts JSON escape chars in the input string to their non-escaped
 * counterparts. This is based on the ECMA standard, see the link below,
 * section "9 String", on page 4.
 *
 * https://ecma-international.org/wp-content/uploads/ECMA-404_2nd_edition_december_2017.pdf
 */
export const unescapeJson = (escapedJsonStr: string): string => {
  let unescaped = escapedJsonStr;
  for (const [fromStr, toStr] of Object.entries(ESCAPED_TO_UNESCAPED_MAP)) {
    unescaped = unescaped.replaceAll(fromStr, toStr);
  }
  return unescaped;
};
