# json-toolbox README

`json-toolbox` is a work-in-progress VSCode extension that will provide some
common JSON-related utilities like minify, prettify, quote-escape,
and unquote-escape.

To be honest I'm only really making this extension since none of the
already-existing extensions which provide this functionality (that I know of)
meet the criteria to be used at my work (open-source and JS-only).

This extension has no dependencies, is written only in Typescript/Javascript,
and is less than 3KB.

## Commands

Find these in the command palette (`cmd+shift+p` or `ctrl+shift+p`)

### `JSON Toolbox: Prettify selection`
Format the highlighted JSON into something easy to read. The indentation used is
based on the current settings (tabs, 4-space, 2-spaces, etc.).

### `JSON Toolbox: Minify selection`
Take the highlighted JSON and make it into one minified line.

### `JSON Toolbox: Escape selection`
Escapes any characters in the highlighted text that are not allowed in a JSON
string.

### `JSON Toolbox: Unescape selection`
Unescape any escape character sequences in the highlighted body of text.

Unescaping is the only hand-written part of this extension, everything else
simply relies on `JSON.prettify` or `JSON.stringify`. Unescaping attempts to
follow the [ECMA 404 standard](https://ecma-international.org/wp-content/uploads/ECMA-404_2nd_edition_december_2017.pdf)
(section 9, "Strings", page 4).


## Requirements

None


## Extension settings

None


## Known issues

None (yet)


## Release notes

See [CHANGELOG.md](https://github.com/gspetrou/json-toolbox/blob/main/CHANGELOG.md)


## Development notes

See [DEVELOPMENT.md](https://github.com/gspetrou/json-toolbox/blob/main/DEVELOPMENT.md)
