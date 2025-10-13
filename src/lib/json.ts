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

/**
 * Mapping from all unicode strings from 0x0000 to 0x001f, to the actual char
 * being represented.
 *
 * For example, a key may be `\u0x001B` and the value would be `char(0x001B)`,
 * which is the "escape" control character.
 */
const CONTROL_CHAR_UNESCAPE_MAPPING: Readonly<Record<string, string>> =
  Array.from({ length: 0x001f + 1 }, (_, i) => i).reduce<
    Readonly<Record<string, string>>
  >(
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
  // If Regex guru (or not regex) has a faster way of applying these changes lmk.
  for (const [fromStr, toStr] of Object.entries(ESCAPED_TO_UNESCAPED_MAP)) {
    unescaped = unescaped.replaceAll(fromStr, toStr);
  }
  return unescaped;
};
