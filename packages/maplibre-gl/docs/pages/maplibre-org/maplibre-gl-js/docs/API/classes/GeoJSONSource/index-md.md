<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/GeoJSONSource/index.md -->

# GeoJSONSource
Defined in: [source/geojson\\_source.ts:167]()
A source containing GeoJSON. (See the [Style Specification]() for detailed documentation of options.)
GeoJSON is tiled internally for rendering. Features exposed from rendered tiles and related events come from vector-tile data, so GeoJSON foreign members that cannot be represented by the vector-tile format are not preserved there. Keep that data separately, or map it to supported feature properties, if you need it after tiling.
## Examples
```ts
map.addSource('some id', {
type: 'geojson',
data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne\_10m\_ports.geojson'
});
```
```ts
map.addSource('some id', {
type: 'geojson',
data: {
"type": "FeatureCollection",
"features": [{
"type": "Feature",
"properties": {},
"geometry": {
"type": "Point",
"coordinates": [
-76.53063297271729,
39.18174077994108
]
}
}]
}
});
```
```ts
map.getSource('some id').setData({
"type": "FeatureCollection",
"features": [{
"type": "Feature",
"properties": { "name": "Null Island" },
"geometry": {
"type": "Point",
"coordinates": [ 0, 0 ]
}
}]
});
```
## See
- [Draw GeoJSON points]()
- [Add a GeoJSON line]()
- [Create a heatmap from points]()
- [Create and style clusters]()
## Extends
- [`Evented`]()\<[`SourceEventType`]()\>
## Implements
- [`Source`]()
## Methods
### abortTile()
> \*\*abortTile\*\*(`tile`: [`Tile`]()): `Promise`\<`void`\>
Defined in: [source/geojson\\_source.ts:693]()
Allows to abort a tile loading.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `tile` | [`Tile`]() | The tile to abort |
#### Returns
`Promise`\<`void`\>
#### Implementation of
[`Source`]().[`abortTile`]()
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
[`Evented`]().[`fire`]()
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
[`Evented`]().[`fire`]()
---
### getBounds()
> \*\*getBounds\*\*(): `Promise`\<[`LngLatBounds`]()\>
Defined in: [source/geojson\\_source.ts:354]()
Allows getting the source's boundaries. If there's a problem with the source's data, it will return an empty [LngLatBounds]().
#### Returns
`Promise`\<[`LngLatBounds`]()\>
a promise which resolves to the source's boundaries
---
### getClusterChildren()
> \*\*getClusterChildren\*\*(`clusterId`: `number`): `Promise`\<`Feature`\<`Geometry`, {\[`name`: `string`\]: `any`; }\>\[\]\>
Defined in: [source/geojson\\_source.ts:431]()
For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `clusterId` | `number` | The value of the cluster's `cluster\_id` property. |
#### Returns
`Promise`\<`Feature`\<`Geometry`, {\[`name`: `string`\]: `any`; }\>\[\]\>
a promise that is resolved when the features are retrieved
---
### getClusterExpansionZoom()
> \*\*getClusterExpansionZoom\*\*(`clusterId`: `number`): `Promise`\<`number`\>
Defined in: [source/geojson\\_source.ts:421]()
For clustered sources, fetches the zoom at which the given cluster expands.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `clusterId` | `number` | The value of the cluster's `cluster\_id` property. |
#### Returns
`Promise`\<`number`\>
a promise that is resolved with the zoom number
---
### getClusterLeaves()
> \*\*getClusterLeaves\*\*(`clusterId`: `number`, `limit`: `number`, `offset`: `number`): `Promise`\<`Feature`\<`Geometry`, {\[`name`: `string`\]: `any`; }\>\[\]\>
Defined in: [source/geojson\\_source.ts:460]()
For clustered sources, fetches the original points that belong to the cluster (as an array of GeoJSON features).
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `clusterId` | `number` | The value of the cluster's `cluster\_id` property. |
| `limit` | `number` | The maximum number of features to return. |
| `offset` | `number` | The number of features to skip (e.g. for pagination). |
#### Returns
`Promise`\<`Feature`\<`Geometry`, {\[`name`: `string`\]: `any`; }\>\[\]\>
a promise that is resolved when the features are retrieved
#### Example
Retrieve cluster leaves on click
```ts
map.on('click', 'clusters', (e) => {
let features = map.queryRenderedFeatures(e.point, {
layers: ['clusters']
});
let clusterId = features[0].properties.cluster\_id;
let pointCount = features[0].properties.point\_count;
let clusterSource = map.getSource('clusters');
const features = await clusterSource.getClusterLeaves(clusterId, pointCount);
// Print cluster leaves in the console
console.log('Cluster leaves:', features);
});
```
---
### getClusterOptions()
> \*\*getClusterOptions\*\*(): [`GetClusterOptions`]()
Defined in: [source/geojson\\_source.ts:406]()
Gets the cluster options currently configured on the source. The returned values mirror the options accepted by `setClusterOptions`.
#### Returns
[`GetClusterOptions`]()
the source's current cluster options
#### Example
```ts
const {cluster, clusterMaxZoom, clusterRadius} = map.getSource('some id').getClusterOptions();
```
---
### getData()
> \*\*getData\*\*(): `Promise`\<`GeoJSON`\<`Geometry`, {\[`name`: `string`\]: `any`; }\>\>
Defined in: [source/geojson\\_source.ts:336]()
Allows to get the source's actual GeoJSON data.
Data set as a URL is returned once it has loaded.
#### Returns
`Promise`\<`GeoJSON`\<`Geometry`, {\[`name`: `string`\]: `any`; }\>\>
a promise which resolves to the source's actual GeoJSON data
---
### hasTransition()
> \*\*hasTransition\*\*(): `boolean`
Defined in: [source/geojson\\_source.ts:728]()
True if the source has transition, false otherwise.
#### Returns
`boolean`
#### Implementation of
[`Source`]().[`hasTransition`]()
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
[`Evented`]().[`listens`]()
---
### loaded()
> \*\*loaded\*\*(): `boolean`
Defined in: [source/geojson\\_source.ts:654]()
True if the source is loaded, false otherwise.
#### Returns
`boolean`
#### Implementation of
[`Source`]().[`loaded`]()
---
### loadTile()
> \*\*loadTile\*\*(`tile`: [`Tile`]()): `Promise`\<`void`\>
Defined in: [source/geojson\\_source.ts:658]()
This method does the heavy lifting of loading a tile. In most cases it will defer the work to the relevant worker source.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `tile` | [`Tile`]() | The tile to load |
#### Returns
`Promise`\<`void`\>
#### Implementation of
[`Source`]().[`loadTile`]()
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
[`Evented`]().[`off`]()
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
[`Evented`]().[`on`]()
---
### onAdd()
> \*\*onAdd\*\*(`map`: [`Map`]()): `void`
Defined in: [source/geojson\\_source.ts:289]()
This method is called when the source is added to the map.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `map` | [`Map`]() | The map instance |
#### Returns
`void`
#### Implementation of
[`Source`]().[`onAdd`]()
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
[`Evented`]().[`once`]()
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
[`Evented`]().[`once`]()
---
### onRemove()
> \*\*onRemove\*\*(): `void`
Defined in: [source/geojson\\_source.ts:710]()
Drops the worker updates waiting to be sent, which would otherwise rebuild the worker's state for a source that is gone. The update being sent ends in a `dataabort` event.
#### Returns
`void`
#### Implementation of
[`Source`]().[`onRemove`]()
---
### serialize()
> \*\*serialize\*\*(): `GeoJSONSourceSpecification`
Defined in: [source/geojson\\_source.ts:716]()
#### Returns
`GeoJSONSourceSpecification`
A plain (stringifiable) JS object representing the current state of the source. Creating a source using the returned object as the `options` should result in a Source that is equivalent to this one.
#### Implementation of
[`Source`]().[`serialize`]()
---
### setClusterOptions()
> \*\*setClusterOptions\*\*(`options`: [`SetClusterOptions`]()): `Promise`\<`void`\>
Defined in: [source/geojson\\_source.ts:367]()
To disable/enable clustering on the source options
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `options` | [`SetClusterOptions`]() | The options to set |
#### Returns
`Promise`\<`void`\>
#### Example
```ts
map.getSource('some id').setClusterOptions({cluster: false});
map.getSource('some id').setClusterOptions({cluster: false, clusterRadius: 50, clusterMaxZoom: 14});
```
---
### setData()
> \*\*setData\*\*(`data`: `string` | `GeoJSON`\<`Geometry`, {\[`name`: `string`\]: `any`; }\>): `Promise`\<`void`\>
Defined in: [source/geojson\\_source.ts:299]()
Sets the GeoJSON data and re-renders the map.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `data` | `string` \| `GeoJSON`\<`Geometry`, {\[`name`: `string`\]: `any`; }\> | A GeoJSON data object or a URL to one. The latter is preferable in the case of large GeoJSON files. |
#### Returns
`Promise`\<`void`\>
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
[`Evented`]().[`setEventedParent`]()
---
### unloadTile()
> \*\*unloadTile\*\*(`tile`: [`Tile`]()): `Promise`\<`void`\>
Defined in: [source/geojson\\_source.ts:701]()
Allows to unload a tile.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `tile` | [`Tile`]() | The tile to unload |
#### Returns
`Promise`\<`void`\>
#### Implementation of
[`Source`]().[`unloadTile`]()
---
### updateData()
> \*\*updateData\*\*(`diff`: [`GeoJSONSourceDiff`]()): `Promise`\<`void`\>
Defined in: [source/geojson\\_source.ts:319]()
Updates the source's GeoJSON, and re-renders the map.
For sources with lots of features, this method can be used to make updates more quickly.
This approach requires unique IDs for every feature in the source. The IDs can either be specified on the feature, or by using the promoteId option to specify which property should be used as the ID.
It is an error to call updateData on a source that did not have unique IDs for each of its features already.
Updates are applied on a best-effort basis, updating an ID that does not exist will not result in an error.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `diff` | [`GeoJSONSourceDiff`]() | The changes that need to be applied. |
#### Returns
`Promise`\<`void`\>
## Properties
### attribution
> \*\*attribution\*\*: `string`
Defined in: [source/geojson\\_source.ts:173]()
The attribution for the source.
#### Implementation of
[`Source`]().[`attribution`]()
---
### id
> \*\*id\*\*: `string`
Defined in: [source/geojson\\_source.ts:169]()
The id for the source. Must not be used by any existing source.
#### Implementation of
[`Source`]().[`id`]()
---
### isTileClipped
> \*\*isTileClipped\*\*: `boolean`
Defined in: [source/geojson\\_source.ts:176]()
`false` if tiles can be drawn outside their boundaries, `true` if they cannot.
#### Implementation of
[`Source`]().[`isTileClipped`]()
---
### maxzoom
> \*\*maxzoom\*\*: `number`
Defined in: [source/geojson\\_source.ts:171]()
The maximum zoom level for the source.
#### Implementation of
[`Source`]().[`maxzoom`]()
---
### minzoom
> \*\*minzoom\*\*: `number`
Defined in: [source/geojson\\_source.ts:170]()
The minimum zoom level for the source.
#### Implementation of
[`Source`]().[`minzoom`]()
---
### reparseOverscaled
> \*\*reparseOverscaled\*\*: `boolean`
Defined in: [source/geojson\\_source.ts:177]()
`true` if tiles should be sent back to the worker for each overzoomed zoom level, `false` if not.
#### Implementation of
[`Source`]().[`reparseOverscaled`]()
---
### tileSize
> \*\*tileSize\*\*: `number`
Defined in: [source/geojson\\_source.ts:172]()
The tile size for the source.
#### Implementation of
[`Source`]().[`tileSize`]()
