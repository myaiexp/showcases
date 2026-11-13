<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/StyleOptions/ -->

# StyleOptions

> **StyleOptions** = `object`

Defined in: style/style.ts:97

The options object related to the Map's style related methods

## Properties

### globalState?

> `optional` **globalState?**: `Record`<`string`, `any`>

Defined in: style/style.ts:113

Defines an initial global state for the map style. It overrides the defaults defined in the map style, as if Map.setGlobalStateProperty was called after loading the style.

---

### localIdeographFontFamily?

> `optional` **localIdeographFontFamily?**: `string` | `false`

Defined in: style/style.ts:109

Defines a CSS
font-family for locally overriding generation of Chinese, Japanese, and Korean characters.
For these characters, font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
Set to `false`, to enable font settings from the map's style for these glyph ranges.
Forces a full update.

---

### validate?

> `optional` **validate?**: `boolean`

Defined in: style/style.ts:101

If false, style validation will be skipped. Useful in production environment.
