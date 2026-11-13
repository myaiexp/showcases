<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MissingStyleImageResolver/index.md -->

# MissingStyleImageResolver
> \*\*MissingStyleImageResolver\*\* = (`id`: `string`) =\> `void` | `Promise`\<`void`\>
Defined in: [ui/map.ts:486]()
Callback used by [Map.setMissingStyleImageResolver]() to resolve missing style images, typically by calling [Map.addImage](). MapLibre awaits the returned promise before treating the image as missing.
## Parameters
| Parameter | Type |
| --- | --- |
| `id` | `string` |
## Returns
`void` | `Promise`\<`void`\>
