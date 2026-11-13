<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/RequestTransformFunction/index.md -->

# RequestTransformFunction
> \*\*RequestTransformFunction\*\* = (`url`: `string`, `resourceType?`: [`ResourceType`]()) =\> [`RequestParameters`]() | `Promise`\<[`RequestParameters`]()\> | `undefined`
Defined in: [util/request\\_manager.ts:21]()
This function is used to transform a request. It is used just before executing the relevant request.
## Parameters
| Parameter | Type |
| --- | --- |
| `url` | `string` |
| `resourceType?` | [`ResourceType`]() |
## Returns
[`RequestParameters`]() | `Promise`\<[`RequestParameters`]()\> | `undefined`
