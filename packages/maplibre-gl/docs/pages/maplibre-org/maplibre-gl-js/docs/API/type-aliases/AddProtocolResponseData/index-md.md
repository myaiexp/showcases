<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/AddProtocolResponseData/index.md -->

# AddProtocolResponseData
> \*\*AddProtocolResponseData\*\* = `ArrayBuffer` | `ImageBitmap` | `HTMLImageElement` | `string` | `object`
Defined in: [util/config.ts:13]()
The `data` a protocol handler resolves with. Which member is expected follows `RequestParameters.type`:
- `'arrayBuffer'`: an `ArrayBuffer`, for example a non-compressed pbf vector tile.
- `'json'`: the parsed JSON value.
- `'string'`: a string.
- `'image'`: an `ImageBitmap` or `HTMLImageElement`, used as is, or an `ArrayBuffer` of encoded image bytes, which are decoded first. A handler that already holds decoded pixels should return them as an `ImageBitmap`, since encoding them only makes the library decode them again.
