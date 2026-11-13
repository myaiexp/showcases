<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/Hash/index.md -->

# Hash
Defined in: [ui/hash.ts:13]()
Adds the map's position to its page's location hash. Passed as an option to the map object.
## Methods
### addTo()
> \*\*addTo\*\*(`map`: [`Map`]()): `this`
Defined in: [ui/hash.ts:26]()
Map element to listen for coordinate changes
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `map` | [`Map`]() | The map object |
#### Returns
`this`
---
### remove()
> \*\*remove\*\*(): `this`
Defined in: [ui/hash.ts:36]()
Removes hash
#### Returns
`this`
## Properties
### \\_updateHash
> \*\*\\_updateHash\*\*: () =\> `Timeout`
Defined in: [ui/hash.ts:138]()
Mobile Safari doesn't allow updating the hash more than 100 times per 30 seconds.
#### Returns
`Timeout`
