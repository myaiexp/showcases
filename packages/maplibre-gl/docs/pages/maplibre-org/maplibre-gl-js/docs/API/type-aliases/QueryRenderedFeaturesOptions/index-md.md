<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/QueryRenderedFeaturesOptions/index.md -->

# QueryRenderedFeaturesOptions
> \*\*QueryRenderedFeaturesOptions\*\* = `object`
Defined in: [source/query\\_features.ts:21]()
Options to pass to query the map for the rendered features
## Properties
### availableImages?
> `optional` \*\*availableImages?\*\*: `string`\[\]
Defined in: [source/query\\_features.ts:34]()
An array of string representing the available images
---
### filter?
> `optional` \*\*filter?\*\*: `FilterSpecification`
Defined in: [source/query\\_features.ts:30]()
A [filter]() to limit query results.
---
### layers?
> `optional` \*\*layers?\*\*: `string`\[\] | `Set`\<`string`\>
Defined in: [source/query\\_features.ts:26]()
An array or set of [style layer IDs]() for the query to inspect. Only features within these layers will be returned. If this parameter is undefined, all layers will be checked.
---
### validate?
> `optional` \*\*validate?\*\*: `boolean`
Defined in: [source/query\\_features.ts:38]()
Whether to check if the `options.filter` conforms to the MapLibre Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
