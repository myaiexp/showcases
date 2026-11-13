<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/RasterDEMTileSource/index.md -->

# RasterDEMTileSource
Defined in: [source/raster\\_dem\\_tile\\_source.ts:37]()
A source containing raster DEM tiles (See the [Style Specification]() for detailed documentation of options.) This source can be used to show hillshading and 3D terrain
## Example
```ts
map.addSource('raster-dem-source', {
type: 'raster-dem',
url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
tileSize: 256
});
```
## See
[3D Terrain]()
## Extends
- [`RasterTileSource`]()
## Implements
- [`Source`]()
## Methods
### abortTile()
> \*\*abortTile\*\*(`tile`: [`Tile`]()): `Promise`\<`void`\>
Defined in: [source/raster\\_tile\\_source.ts:254]()
Allows to abort a tile loading.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `tile` | [`Tile`]() | The tile to abort |
#### Returns
`Promise`\<`void`\>
#### Implementation of
[`Source`]().[`abortTile`]()
#### Inherited from
[`RasterTileSource`]().[`abortTile`]()
---
### fire()
#### Call Signature
> \*\*fire\*\*(`event`: [`ErrorEvent`]() | [`MapSourceDataEvent`]()): `this`
Defined in: [util/evented.ts:156]()
Calls every listener registered for the event's type.
##### Parameters
| Parameter | Type |
| --- | --- |
| `event` | [`ErrorEvent`]() \| [`MapSourceDataEvent`]() |
##### Returns
`this`
##### Implementation of
[`Source`]().[`fire`]()
##### Inherited from
[`RasterTileSource`]().[`fire`]()
#### Call Signature
> \*\*fire\*\*(`type`: keyof [`SourceEventType`](), `properties?`: `object`): `this`
Defined in: [util/evented.ts:162]()
Compatibility with the (type: string, properties: Object) signature from previous versions. See https://github.com/mapbox/mapbox-gl-js/issues/6522, https://github.com/mapbox/mapbox-gl-draw/issues/766
##### Parameters
| Parameter | Type |
| --- | --- |
| `type` | keyof [`SourceEventType`]() |
| `properties?` | `object` |
##### Returns
`this`
##### Implementation of
`Source.fire`
##### Inherited from
[`RasterTileSource`]().[`fire`]()
---
### hasTile()
> \*\*hasTile\*\*(`tileID`: [`OverscaledTileID`]()): `boolean`
Defined in: [source/raster\\_tile\\_source.ts:201]()
True is the tile is part of the source, false otherwise.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `tileID` | [`OverscaledTileID`]() | The tile ID |
#### Returns
`boolean`
#### Implementation of
[`Source`]().[`hasTile`]()
#### Inherited from
[`RasterTileSource`]().[`hasTile`]()
---
### hasTransition()
> \*\*hasTransition\*\*(): `boolean`
Defined in: [source/raster\\_tile\\_source.ts:267]()
True if the source has transition, false otherwise.
#### Returns
`boolean`
#### Implementation of
[`Source`]().[`hasTransition`]()
#### Inherited from
[`RasterTileSource`]().[`hasTransition`]()
---
### listens()
> \*\*listens\*\*(`type`: keyof [`SourceEventType`]()): `boolean`
Defined in: [util/evented.ts:206]()
Returns a true if this instance of Evented or any forwardeed instances of Evented have a listener for the specified type.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | keyof [`SourceEventType`]() | The event type |
#### Returns
`boolean`
`true` if there is at least one registered listener for specified event type, `false` otherwise
#### Inherited from
[`RasterTileSource`]().[`listens`]()
---
### loaded()
> \*\*loaded\*\*(): `boolean`
Defined in: [source/raster\\_tile\\_source.ts:122]()
True if the source is loaded, false otherwise.
#### Returns
`boolean`
#### Implementation of
[`Source`]().[`loaded`]()
#### Inherited from
[`RasterTileSource`]().[`loaded`]()
---
### off()
> \*\*off\*\*\<`T` \*extends\* keyof [`SourceEventType`]()\>(`type`: `T`, `listener`: (`event`: [`SourceEventType`]()\[`T`\]) =\> `void`): `this`
Defined in: [util/evented.ts:117]()
Removes a previously registered event listener.
#### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`SourceEventType`]() |
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to remove listeners for. |
| `listener` | (`event`: [`SourceEventType`]()\[`T`\]) =\> `void` | The listener function to remove. |
#### Returns
`this`
#### Inherited from
[`RasterTileSource`]().[`off`]()
---
### on()
> \*\*on\*\*\<`T` \*extends\* keyof [`SourceEventType`]()\>(`type`: `T`, `listener`: (`event`: [`SourceEventType`]()\[`T`\]) =\> `void`): [`Subscription`]()
Defined in: [util/evented.ts:100]()
Adds a listener to a specified event type.
#### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`SourceEventType`]() |
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to add a listen for. |
| `listener` | (`event`: [`SourceEventType`]()\[`T`\]) =\> `void` | The function to be called when the event is fired. The listener function is called with the data object passed to `fire`, extended with `target` and `type` properties. |
#### Returns
[`Subscription`]()
#### Inherited from
[`RasterTileSource`]().[`on`]()
---
### onAdd()
> \*\*onAdd\*\*(`map`: [`Map`]()): `void`
Defined in: [source/raster\\_tile\\_source.ts:126]()
This method is called when the source is added to the map.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `map` | [`Map`]() | The map instance |
#### Returns
`void`
#### Implementation of
[`Source`]().[`onAdd`]()
#### Inherited from
[`RasterTileSource`]().[`onAdd`]()
---
### once()
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`SourceEventType`]()\>(`type`: `T`): `Promise`\<[`SourceEventType`]()\[`T`\]\>
Defined in: [util/evented.ts:132]()
Adds a listener that will be called only once to a specified event type.
The listener will be called first time the event fires after the listener is registered.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`SourceEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |
##### Returns
`Promise`\<[`SourceEventType`]()\[`T`\]\>
a promise that resolves with the event
##### Inherited from
[`RasterTileSource`]().[`once`]()
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`SourceEventType`]()\>(`type`: `T`, `listener`: (`event`: [`SourceEventType`]()\[`T`\]) =\> `void`): `this`
Defined in: [util/evented.ts:142]()
Adds a listener that will be called only once to a specified event type.
The listener will be called first time the event fires after the listener is registered.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`SourceEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |
| `listener` | (`event`: [`SourceEventType`]()\[`T`\]) =\> `void` | The function to be called when the event is fired the first time. |
##### Returns
`this`
`this` when a listener is provided
##### Inherited from
[`RasterTileSource`]().[`once`]()
---
### onRemove()
> \*\*onRemove\*\*(): `void`
Defined in: [source/raster\\_tile\\_source.ts:131]()
This method is called when the source is removed from the map.
#### Returns
`void`
#### Implementation of
[`Source`]().[`onRemove`]()
#### Inherited from
[`RasterTileSource`]().[`onRemove`]()
---
### serialize()
> \*\*serialize\*\*(): `RasterSourceSpecification` | `RasterDEMSourceSpecification`
Defined in: [source/raster\\_tile\\_source.ts:177]()
#### Returns
`RasterSourceSpecification` | `RasterDEMSourceSpecification`
A plain (stringifiable) JS object representing the current state of the source. Creating a source using the returned object as the `options` should result in a Source that is equivalent to this one.
#### Implementation of
[`Source`]().[`serialize`]()
#### Inherited from
[`RasterTileSource`]().[`serialize`]()
---
### setEventedParent()
> \*\*setEventedParent\*\*(`parent?`: [`Evented`]()\<[`EventTypeMap`]()\>, `data?`: [`EventedParentData`]() | (() =\> [`EventedParentData`]())): `this`
Defined in: [util/evented.ts:217]()
Bubble all events fired by this instance of Evented to this parent instance of Evented.
#### Parameters
| Parameter | Type |
| --- | --- |
| `parent?` | [`Evented`]()\<[`EventTypeMap`]()\> |
| `data?` | [`EventedParentData`]() \| (() =\> [`EventedParentData`]()) |
#### Returns
`this`
#### Inherited from
[`RasterTileSource`]().[`setEventedParent`]()
---
### setPremultiplyAlpha()
> \*\*setPremultiplyAlpha\*\*(`premultiplyAlpha`: `boolean`): `this`
Defined in: [source/raster\\_tile\\_source.ts:191]()
Sets whether alpha premultiplication is applied to raster tile images. Set to `false` to preserve exact RGBA byte values when alpha carries data instead of opacity.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `premultiplyAlpha` | `boolean` | If `false`, disables alpha premultiplication for raster tile image decode and texture upload. |
#### Returns
`this`
#### Example
```ts
map.getSource('raster-source').setPremultiplyAlpha(false);
```
#### Inherited from
[`RasterTileSource`]().[`setPremultiplyAlpha`]()
---
### setTiles()
> \*\*setTiles\*\*(`tiles`: `string`\[\]): `this`
Defined in: [source/raster\\_tile\\_source.ts:154]()
Sets the source `tiles` property and re-renders the map.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `tiles` | `string`\[\] | An array of one or more tile source URLs, as in the raster tiles spec (See the [Style Specification]() |
#### Returns
`this`
#### Inherited from
[`RasterTileSource`]().[`setTiles`]()
---
### setUrl()
> \*\*setUrl\*\*(`url`: `string`): `this`
Defined in: [source/raster\\_tile\\_source.ts:168]()
Sets the source `url` property and re-renders the map.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `url` | `string` | A URL to a TileJSON resource. Supported protocols are `http:` and `https:`. |
#### Returns
`this`
#### Inherited from
[`RasterTileSource`]().[`setUrl`]()
## Properties
### id
> \*\*id\*\*: `string`
Defined in: [source/raster\\_tile\\_source.ts:55]()
The id for the source. Must not be used by any existing source.
#### Implementation of
[`Source`]().[`id`]()
#### Inherited from
[`RasterTileSource`]().[`id`]()
---
### maxzoom
> \*\*maxzoom\*\*: `number`
Defined in: [source/raster\\_tile\\_source.ts:57]()
The maximum zoom level for the source.
#### Implementation of
[`Source`]().[`maxzoom`]()
#### Inherited from
[`RasterTileSource`]().[`maxzoom`]()
---
### minzoom
> \*\*minzoom\*\*: `number`
Defined in: [source/raster\\_tile\\_source.ts:56]()
The minimum zoom level for the source.
#### Implementation of
[`Source`]().[`minzoom`]()
#### Inherited from
[`RasterTileSource`]().[`minzoom`]()
---
### roundZoom
> \*\*roundZoom\*\*: `boolean`
Defined in: [source/raster\\_tile\\_source.ts:64]()
`true` if zoom levels are rounded to the nearest integer in the source data, `false` if they are floor-ed to the nearest integer.
#### Implementation of
[`Source`]().[`roundZoom`]()
#### Inherited from
[`RasterTileSource`]().[`roundZoom`]()
---
### tileSize
> \*\*tileSize\*\*: `number`
Defined in: [source/raster\\_tile\\_source.ts:60]()
The tile size for the source.
#### Implementation of
[`Source`]().[`tileSize`]()
#### Inherited from
[`RasterTileSource`]().[`tileSize`]()
