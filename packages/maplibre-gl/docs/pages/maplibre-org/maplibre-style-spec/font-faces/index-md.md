<!-- source: https://maplibre.org/maplibre-style-spec/font-faces/index.md -->

# Font-faces
The `font-faces` property can be used to specify what font files to use for rendering text. Font faces contain information needed to render complex texts such as [Devanagari](), [Khmer]() among many others.
## Unicode range
The optional `unicode-range` property can be used to only use a particular font file for characters within the specified unicode range(s). Its value should be an array of strings, each indicating a start and end of a unicode range, similar to the [CSS descriptor with the same name](). This allows specifying multiple non-consecutive unicode ranges. When not specified, the default value is `U+0-10FFFF`, meaning the font file will be used for all unicode characters.
Refer to the [Unicode Character Code Charts]() to see ranges for scripts supported by Unicode. To see what unicode code-points are available in a font, use a tool like [FontDrop]().
## Font Resolution
For every name in a symbol layer’s [`text-font`]() array, characters are matched if they are covered one of the by the font files in the corresponding entry of the `font-faces` map. Any still-unmatched characters then fall back to the [`glyphs`]() URL if provided.
## Supported Fonts
What type of fonts are supported is implementation-defined. Unsupported fonts are ignored.
```json
"font-faces": {
"Noto Sans Regular": [
{
"url": "https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io/fonts/NotoSansKhmer/hinted/ttf/NotoSansKhmer-Regular.ttf",
"unicode-range": ["U+1780-17FF"]
},
{
"url": "https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io/fonts/NotoSansDevanagari/hinted/ttf/NotoSansDevanagari-Regular.ttf",
"unicode-range": ["U+0900-097F"]
},
{
"url": "https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io/fonts/NotoSansMyanmar/hinted/ttf/NotoSansMyanmar-Regular.ttf",
"unicode-range": ["U+1000-109F"]
},
{
"url": "https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io/fonts/NotoSansEthiopic/hinted/ttf/NotoSansEthiopic-Regular.ttf",
"unicode-range": ["U+1200-137F"]
}
],
"Unifont": "https://ftp.gnu.org/gnu/unifont/unifont-15.0.01/unifont-15.0.01.ttf"
}
```
---
| SDK Support | MapLibre GL JS | MapLibre Native  
Android | MapLibre Native  
iOS |
| --- | --- | --- | --- |
| basic functionality | ❌ ([\#6637]()) | 11.13.0 | 6.18.0 |
