/** Enum for "common" control chars. */
export const COMMON_CONTROL_CHARS = {
  Backspace: String.fromCodePoint(0x0008),
  CarriageReturn: String.fromCodePoint(0x000d),
  Formfeed: String.fromCodePoint(0x000c),
  Newline: String.fromCodePoint(0x000a),
  Tab: String.fromCodePoint(0x0009),
} as const;

/** Pairs of "common" control chars and their escaped string. */
export const COMMON_CONTROL_CHAR_AND_ESCAPED_PAIRS: ReadonlyArray<{
  readonly commonControlChar: string;
  readonly escapedStr: string;
}> = [
  {
    commonControlChar: COMMON_CONTROL_CHARS.Backspace,
    escapedStr: "\b",
  },
  {
    commonControlChar: COMMON_CONTROL_CHARS.CarriageReturn,
    escapedStr: "\r",
  },
  {
    commonControlChar: COMMON_CONTROL_CHARS.Formfeed,
    escapedStr: "\f",
  },
  {
    commonControlChar: COMMON_CONTROL_CHARS.Newline,
    escapedStr: "\n",
  },
  {
    commonControlChar: COMMON_CONTROL_CHARS.Tab,
    escapedStr: "\t",
  },
] as const;

const numberToUnicode16String = (num: number): string => {
  const numHexStr = num.toString(16);
  const neededPadding = 4 - numHexStr.length;
  return `\\u` + "0".repeat(neededPadding) + numHexStr;
};

/**
 * Array of pairs, all control code characters and their JSON-escaped
 * Unicode-16 encoded strings.
 */
export const CONTROL_CHAR_AND_ESCAPED_PAIRS: ReadonlyArray<{
  readonly controlChar: string;
  readonly escapedStr: string;
}> = Array.from({ length: 0x001f + 1 }, (_, i) => i).map(
  (controlCharUnicodeNumber) => ({
    controlChar: String.fromCharCode(controlCharUnicodeNumber),
    escapedStr: numberToUnicode16String(controlCharUnicodeNumber),
  }),
);
