<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/StyleSwapOptions/index.md -->

# StyleSwapOptions
> \*\*StyleSwapOptions\*\* = `object`
Defined in: [style/style.ts:190]()
The options object related to the [Map]()'s style related methods
## Properties
### diff?
> `optional` \*\*diff?\*\*: `boolean`
Defined in: [style/style.ts:195]()
If false, force a 'full' update, removing the current style and building the given one instead of attempting a diff-based update.
---
### transformStyle?
> `optional` \*\*transformStyle?\*\*: [`TransformStyleFunction`]()
Defined in: [style/style.ts:200]()
TransformStyleFunction is a convenience function that allows to modify a style after it is fetched but before it is committed to the map state. Refer to [TransformStyleFunction]().
