const ESCAPED_TO_UNESCAPED_MAP = Object.freeze<Record<string, string>>({
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
 *
 * This does not include support for the control characters U+0000 to U+001F.
 */
export const unescapeJson = (escapedJsonStr: string): string => {
  let unescaped = escapedJsonStr;
  for (const [fromStr, toStr] of Object.entries(ESCAPED_TO_UNESCAPED_MAP)) {
    unescaped = unescaped.replaceAll(fromStr, toStr);
  }
  return unescaped;
};
