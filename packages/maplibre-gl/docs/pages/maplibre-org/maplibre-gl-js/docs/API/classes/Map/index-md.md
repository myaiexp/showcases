<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/index.md -->

# Map
Defined in: [ui/map.ts:615]()
The `Map` object represents the map on your page. It exposes methods and properties that enable you to programmatically change the map, and fires events as users interact with it.
You create a `Map` by specifying a `container` and other options, see [MapOptions]() for the full list. Then MapLibre GL JS initializes the map on the page and returns your `Map` object.
## Example
```ts
const map = new Map({
container: 'map',
center: [-122.420679, 37.772537],
zoom: 13,
style: style\_object,
hash: true,
transformRequest: (url, resourceType) => {
if (resourceType === 'Source' && url.startsWith('http://myHost')) {
return {
url: url.replace('http', 'https'),
headers: { 'my-custom-header': true},
credentials: 'include', // Include cookies for cross-origin requests
}
}
}
});
```
## See
[Display a map]()
## Extends
- [`Evented`]()\<[`MapEventType`]()\>
## Accessors
### repaint
#### Get Signature
> \*\*get\*\* \*\*repaint\*\*(): `boolean`
Defined in: [ui/map.ts:4805]()
Gets and sets a Boolean indicating whether the map will continuously repaint. This information is useful for analyzing performance.
##### Returns
`boolean`
---
### showCollisionBoxes
#### Get Signature
> \*\*get\*\* \*\*showCollisionBoxes\*\*(): `boolean`
Defined in: [ui/map.ts:4773]()
Gets and sets a Boolean indicating whether the map will render boxes around all symbols in the data source, revealing which symbols were rendered or which were hidden due to collisions. This information is useful for debugging.
##### Returns
`boolean`
---
### showOverdrawInspector
#### Get Signature
> \*\*get\*\* \*\*showOverdrawInspector\*\*(): `boolean`
Defined in: [ui/map.ts:4794]()
Gets and sets a Boolean indicating whether the map should color-code each fragment to show how many times it has been shaded. White fragments have been shaded 8 or more times. Black fragments have been shaded 0 times. This information is useful for debugging.
##### Returns
`boolean`
---
### showPadding
#### Get Signature
> \*\*get\*\* \*\*showPadding\*\*(): `boolean`
Defined in: [ui/map.ts:4760]()
Gets and sets a Boolean indicating whether the map will visualize the padding offsets.
##### Returns
`boolean`
---
### showTileBoundaries
#### Get Signature
> \*\*get\*\* \*\*showTileBoundaries\*\*(): `boolean`
Defined in: [ui/map.ts:4749]()
Gets and sets a Boolean indicating whether the map will render an outline around each tile and the tile ID. These tile boundaries are useful for debugging.
The uncompressed file size of the first vector source is drawn in the top left corner of each tile, next to the tile ID.
##### Example
```ts
map.showTileBoundaries = true;
```
##### Returns
`boolean`
---
### version
#### Get Signature
> \*\*get\*\* \*\*version\*\*(): `string`
Defined in: [ui/map.ts:4820]()
Returns the package version of the library
##### Returns
`string`
Package version of the library
## Events
### off()
#### Call Signature
> \*\*off\*\*\<`T` \*extends\* keyof [`MapLayerEventType`]()\>(`type`: `T`, `layer`: `string`, `listener`: (`ev`: [`MapLayerEventType`]()\[`T`\] & `Object`) =\> `void`): `this`
Defined in: [ui/map.ts:2550]()
Removes an event listener for events previously added with `{@link Map.on}`.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapLayerEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type previously used to install the listener. |
| `layer` | `string` | The layer ID or listener previously used to install the listener. |
| `listener` | (`ev`: [`MapLayerEventType`]()\[`T`\] & `Object`) =\> `void` | The function previously installed as a listener. |
##### Returns
`this`
##### Overrides
[`Evented`]().[`off`]()
#### Call Signature
> \*\*off\*\*\<`T` \*extends\* keyof [`MapLayerEventType`]()\>(`type`: `T`, `layers`: `string`\[\], `listener`: (`ev`: [`MapLayerEventType`]()\[`T`\] & `Object`) =\> `void`): `this`
Defined in: [ui/map.ts:2563]()
Overload of the `off` method that allows to remove an event created with multiple layers. Provide the same layer IDs as to `on` or `once`, when the listener was registered.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapLayerEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The type of the event. |
| `layers` | `string`\[\] | The layer IDs previously used to install the listener. |
| `listener` | (`ev`: [`MapLayerEventType`]()\[`T`\] & `Object`) =\> `void` | The function previously installed as a listener. |
##### Returns
`this`
##### Overrides
`Evented.off`
#### Call Signature
> \*\*off\*\*\<`T` \*extends\* keyof [`MapEventType`]()\>(`type`: `T`, `listener`: (`ev`: [`MapEventType`]()\[`T`\] & `Object`) =\> `void`): `this`
Defined in: [ui/map.ts:2574]()
Overload of the `off` method that allows to remove an event created without specifying a layer.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The type of the event. |
| `listener` | (`ev`: [`MapEventType`]()\[`T`\] & `Object`) =\> `void` | The function previously installed as a listener. |
##### Returns
`this`
##### Overrides
`Evented.off`
#### Call Signature
> \*\*off\*\*(`type`: keyof [`MapEventType`](), `listener`: [`Listener`]()): `this`
Defined in: [ui/map.ts:2581]()
Overload of the `off` method that allows to remove an event created without specifying a layer.
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | keyof [`MapEventType`]() | The type of the event. |
| `listener` | [`Listener`]() | The function previously installed as a listener. |
##### Returns
`this`
##### Overrides
`Evented.off`
---
### on()
#### Call Signature
> \*\*on\*\*\<`T` \*extends\* keyof [`MapLayerEventType`]()\>(`type`: `T`, `layer`: `string`, `listener`: (`ev`: [`MapLayerEventType`]()\[`T`\] & `Object`) =\> `void`): [`Subscription`]()
Defined in: [ui/map.ts:2402]()
Adds a listener for events of a specified type, optionally limited to features in a specified style layer(s). See [MapEventType]() and [MapLayerEventType]() for a full list of events and their description.
| Event | Compatible with `layerId` |
| --- | --- |
| `mousedown` | yes |
| `mouseup` | yes |
| `mouseover` | yes |
| `mouseout` | yes |
| `mousemove` | yes |
| `mouseenter` | yes (required) |
| `mouseleave` | yes (required) |
| `click` | yes |
| `dblclick` | yes |
| `contextmenu` | yes |
| `touchstart` | yes |
| `touchend` | yes |
| `touchcancel` | yes |
| `wheel` | |
| `resize` | |
| `remove` | |
| `touchmove` | |
| `movestart` | |
| `move` | |
| `moveend` | |
| `dragstart` | |
| `drag` | |
| `dragend` | |
| `zoomstart` | |
| `zoom` | |
| `zoomend` | |
| `rotatestart` | |
| `rotate` | |
| `rotateend` | |
| `pitchstart` | |
| `pitch` | |
| `pitchend` | |
| `boxzoomstart` | |
| `boxzoomend` | |
| `boxzoomcancel` | |
| `webglcontextlost` | |
| `webglcontextrestored` | |
| `load` | |
| `render` | |
| `idle` | |
| `error` | |
| `data` | |
| `styledata` | |
| `sourcedata` | |
| `dataloading` | |
| `styledataloading` | |
| `sourcedataloading` | |
| `styleimagemissing` | |
| `dataabort` | |
| `sourcedataabort` | |
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapLayerEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. Events compatible with the optional `layerId` parameter are triggered when the cursor enters a visible portion of the specified layer from outside that layer or outside the map canvas. |
| `layer` | `string` | The ID of a style layer or a listener if no ID is provided. Event will only be triggered if its location is within a visible feature in this layer. The event will have a `features` property containing an array of the matching features. If `layer` is not supplied, the event will not have a `features` property. Please note that many event types are not compatible with the optional `layer` parameter. |
| `listener` | (`ev`: [`MapLayerEventType`]()\[`T`\] & `Object`) =\> `void` | The function to be called when the event is fired. |
##### Returns
[`Subscription`]()
##### Examples
```ts
// Set an event listener that will fire
// when the map has finished loading
map.on('load', () => {
// Once the map has finished loading,
// add a new layer
map.addLayer({
id: 'points-of-interest',
source: {
type: 'vector',
url: 'https://maplibre.org/maplibre-style-spec/'
},
'source-layer': 'poi\_label',
type: 'circle',
paint: {
// MapLibre Style Specification paint properties
},
layout: {
// MapLibre Style Specification layout properties
}
});
});
```
```ts
// Set an event listener that will fire
// when a feature on the countries layer of the map is clicked
map.on('click', 'countries', (e) => {
new Popup()
.setLngLat(e.lngLat)
.setText(`Country name: ${e.features[0].properties.name}`)
.addTo(map);
});
```
##### See
- [Display popup on click]()
- [Center the map on a clicked symbol]()
- [Create a hover effect]()
- [Create a draggable marker]()
##### Overrides
[`Evented`]().[`on`]()
#### Call Signature
> \*\*on\*\*\<`T` \*extends\* keyof [`MapLayerEventType`]()\>(`type`: `T`, `layerIds`: `string`\[\], `listener`: (`ev`: [`MapLayerEventType`]()\[`T`\] & `Object`) =\> `void`): [`Subscription`]()
Defined in: [ui/map.ts:2414]()
Overload of the `on` method that allows to listen to events specifying multiple layers.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapLayerEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The type of the event. |
| `layerIds` | `string`\[\] | The array of style layer IDs. |
| `listener` | (`ev`: [`MapLayerEventType`]()\[`T`\] & `Object`) =\> `void` | The listener callback. |
##### Returns
[`Subscription`]()
##### Overrides
`Evented.on`
#### Call Signature
> \*\*on\*\*\<`T` \*extends\* keyof [`MapEventType`]()\>(`type`: `T`, `listener`: (`ev`: [`MapEventType`]()\[`T`\] & `Object`) =\> `void`): [`Subscription`]()
Defined in: [ui/map.ts:2425]()
Overload of the `on` method that allows to listen to events without specifying a layer.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The type of the event. |
| `listener` | (`ev`: [`MapEventType`]()\[`T`\] & `Object`) =\> `void` | The listener callback. |
##### Returns
[`Subscription`]()
##### Overrides
`Evented.on`
#### Call Signature
> \*\*on\*\*(`type`: keyof [`MapEventType`](), `listener`: [`Listener`]()): [`Subscription`]()
Defined in: [ui/map.ts:2432]()
Overload of the `on` method that allows to listen to events without specifying a layer.
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | keyof [`MapEventType`]() | The type of the event. |
| `listener` | [`Listener`]() | The listener callback. |
##### Returns
[`Subscription`]()
##### Overrides
`Evented.on`
---
### once()
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`MapLayerEventType`]()\>(`type`: `T`, `layer`: `string`, `listener`: (`ev`: [`MapLayerEventType`]()\[`T`\] & `Object`) =\> `void`): `this`
Defined in: [ui/map.ts:2466]()
Adds a listener that will be called only once to a specified event type, optionally limited to features in a specified style layer.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapLayerEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for; one of `'mousedown'`, `'mouseup'`, `'click'`, `'dblclick'`, `'mousemove'`, `'mouseenter'`, `'mouseleave'`, `'mouseover'`, `'mouseout'`, `'contextmenu'`, `'touchstart'`, `'touchend'`, or `'touchcancel'`. `mouseenter` and `mouseover` events are triggered when the cursor enters a visible portion of the specified layer from outside that layer or outside the map canvas. `mouseleave` and `mouseout` events are triggered when the cursor leaves a visible portion of the specified layer, or leaves the map canvas. |
| `layer` | `string` | The ID of a style layer or a listener if no ID is provided. Only events whose location is within a visible feature in this layer will trigger the listener. The event will have a `features` property containing an array of the matching features. |
| `listener` | (`ev`: [`MapLayerEventType`]()\[`T`\] & `Object`) =\> `void` | The function to be called when the event is fired. |
##### Returns
`this`
`this` if listener is provided, promise otherwise to allow easier usage of async/await
##### Overrides
[`Evented`]().[`once`]()
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`MapLayerEventType`]()\>(`type`: `T`, `layer`: `string`): `Promise`\<[`MapLayerEventType`]()\[`T`\] & `Object`\>
Defined in: [ui/map.ts:2478]()
Overload of the `once` method that, with a single layer and no listener, returns a promise resolving with the event for easier usage of async/await.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapLayerEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The type of the event. |
| `layer` | `string` | The ID of the style layer. |
##### Returns
`Promise`\<[`MapLayerEventType`]()\[`T`\] & `Object`\>
##### Overrides
[`Evented`]().[`once`]()
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`MapLayerEventType`]()\>(`type`: `T`, `layerIds`: `string`\[\], `listener`: (`ev`: [`MapLayerEventType`]()\[`T`\] & `Object`) =\> `void`): `this`
Defined in: [ui/map.ts:2489]()
Overload of the `once` method that allows to listen to events specifying multiple layers.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapLayerEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The type of the event. |
| `layerIds` | `string`\[\] | The array of style layer IDs. |
| `listener` | (`ev`: [`MapLayerEventType`]()\[`T`\] & `Object`) =\> `void` | The listener callback. |
##### Returns
`this`
##### Overrides
`Evented.once`
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`MapLayerEventType`]()\>(`type`: `T`, `layerIds`: `string`\[\]): `Promise`\<[`MapLayerEventType`]()\[`T`\] & `Object`\>
Defined in: [ui/map.ts:2501]()
Overload of the `once` method that, with multiple layers and no listener, returns a promise resolving with the event for easier usage of async/await.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapLayerEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The type of the event. |
| `layerIds` | `string`\[\] | The array of style layer IDs. |
##### Returns
`Promise`\<[`MapLayerEventType`]()\[`T`\] & `Object`\>
##### Overrides
`Evented.once`
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`MapEventType`]()\>(`type`: `T`, `listener`: (`ev`: [`MapEventType`]()\[`T`\] & `Object`) =\> `void`): `this`
Defined in: [ui/map.ts:2511]()
Overload of the `once` method that allows to listen to events without specifying a layer.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The type of the event. |
| `listener` | (`ev`: [`MapEventType`]()\[`T`\] & `Object`) =\> `void` | The listener callback. |
##### Returns
`this`
##### Overrides
`Evented.once`
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`MapEventType`]()\>(`type`: `T`): `Promise`\<[`MapEventType`]()\[`T`\] & `Object`\>
Defined in: [ui/map.ts:2518]()
Overload of the `once` method that returns a promise resolving with the event, for easier usage of async/await, when no listener is provided.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The type of the event. |
##### Returns
`Promise`\<[`MapEventType`]()\[`T`\] & `Object`\>
##### Overrides
`Evented.once`
#### Call Signature
> \*\*once\*\*(`type`: keyof [`MapEventType`](), `listener?`: [`Listener`]()): `Promise`\<`any`\> | `Map`
Defined in: [ui/map.ts:2525]()
Overload of the `once` method that allows to listen to events without specifying a layer.
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | keyof [`MapEventType`]() | The type of the event. |
| `listener?` | [`Listener`]() | The listener callback. |
##### Returns
`Promise`\<`any`\> | `Map`
##### Overrides
`Evented.once`
## Methods
### \\_shouldHandleInitialResize()
> \*\*\\_shouldHandleInitialResize\*\*(): `boolean`
Defined in: [ui/map.ts:4182]()
Determines if the initial resize event should be handled based on the container's dimensions.
#### Returns
`boolean`
`true` if the initial resize event should be handled, `false` otherwise.
---
### addControl()
> \*\*addControl\*\*(`control`: [`IControl`](), `position?`: [`ControlPosition`]()): `this`
Defined in: [ui/map.ts:998]()
Adds an [IControl]() to the map, calling `control.onAdd(this)`.
An [ErrorEvent]() will be fired if the control is invalid.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `control` | [`IControl`]() | The [IControl]() to add. |
| `position?` | [`ControlPosition`]() | position on the map to which the control will be added. Valid values are `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`. Defaults to `'top-right'`. |
#### Returns
`this`
#### Example
Add zoom and rotation controls to the map.
```ts
map.addControl(new NavigationControl());
```
#### See
[Display map navigation controls]()
---
### addImage()
> \*\*addImage\*\*(`id`: `string`, `image`: [`StyleImageSource`](), `options?`: `Partial`\<[`StyleImageMetadata`]()\>): `this`
Defined in: [ui/map.ts:3294]()
Add an image to the style. This image can be displayed on the map like any other icon in the style's sprite using the image's ID with [`icon-image`](), [`background-pattern`](), [`fill-pattern`](), or [`line-pattern`]().
A [ErrorEvent]() event will be fired if the image parameter is invalid or there is not enough space in the sprite to add this image.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | The ID of the image. |
| `image` | [`StyleImageSource`]() | The image as an `HTMLImageElement`, `ImageData`, `ImageBitmap` or object with `width`, `height`, and `data` properties with the same format as `ImageData`. |
| `options?` | `Partial`\<[`StyleImageMetadata`]()\> | Options object. |
#### Returns
`this`
#### Example
```ts
// If the style's sprite does not already contain an image with ID 'cat',
// add the image 'cat-icon.png' to the style's sprite with the ID 'cat'.
const image = await map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat\_silhouette.svg/400px-Cat\_silhouette.svg.png');
if (!map.hasImage('cat')) map.addImage('cat', image.data);
// Add a stretchable image that can be used with `icon-text-fit`
// In this example, the image is 600px wide by 400px high.
const image = await map.loadImage('https://upload.wikimedia.org/wikipedia/commons/8/89/Black\_and\_White\_Boxed\_%28bordered%29.png');
if (map.hasImage('border-image')) return;
map.addImage('border-image', image.data, {
content: [16, 16, 300, 384], // place text over left half of image, avoiding the 16px border
stretchX: [[16, 584]], // stretch everything horizontally except the 16px border
stretchY: [[16, 384]], // stretch everything vertically except the 16px border
});
```
#### See
- Use `HTMLImageElement`: [Add an icon to the map]()
- Use `ImageData`: [Add a generated icon to the map]()
---
### addLayer()
> \*\*addLayer\*\*(`layer`: [`AddLayerObject`](), `beforeId?`: `string`): `this`
Defined in: [ui/map.ts:3607]()
Adds a [MapLibre style layer]() to the map's style.
A layer defines how data from a specified source will be styled. Read more about layer types and available paint and layout properties in the [MapLibre Style Specification]().
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `layer` | [`AddLayerObject`]() | The layer to add, conforming to either the MapLibre Style Specification's [layer definition]() or, less commonly, the [CustomLayerInterface]() specification. Can also be a layer definition with an embedded source definition. The MapLibre Style Specification's layer definition is appropriate for most layers. |
| `beforeId?` | `string` | The ID of an existing layer to insert the new layer before, resulting in the new layer appearing visually beneath the existing layer. If this argument is not specified, the layer will be appended to the end of the layers array and appear visually above all other layers. |
#### Returns
`this`
#### Examples
Add a circle layer with a vector source
```ts
map.addLayer({
id: 'points-of-interest',
source: {
type: 'vector',
url: 'https://demotiles.maplibre.org/tiles/tiles.json'
},
'source-layer': 'poi\_label',
type: 'circle',
paint: {
// MapLibre Style Specification paint properties
},
layout: {
// MapLibre Style Specification layout properties
}
});
```
Define a source before using it to create a new layer
```ts
map.addSource('state-data', {
type: 'geojson',
data: 'path/to/data.geojson'
});
map.addLayer({
id: 'states',
// References the GeoJSON source defined above
// and does not require a `source-layer`
source: 'state-data',
type: 'symbol',
layout: {
// Set the label content to the
// feature's `name` property
text-field: ['get', 'name']
}
});
```
Add a new symbol layer before an existing layer
```ts
map.addLayer({
id: 'states',
// References a source that's already been defined
source: 'state-data',
type: 'symbol',
layout: {
// Set the label content to the
// feature's `name` property
text-field: ['get', 'name']
}
// Add the layer before the existing `cities` layer
}, 'cities');
```
#### See
- [Create and style clusters]()
- [Add a vector tile source]()
- [Add a WMS source]()
---
### addSource()
> \*\*addSource\*\*(`id`: `string`, `source`: [`SourceSpecification`]() | [`CanvasSourceSpecification`]()): `this`
Defined in: [ui/map.ts:3016]()
Adds a source to the map's style.
Events triggered:
Triggers the `source.add` event.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | The ID of the source to add. Must not conflict with existing sources. |
| `source` | [`SourceSpecification`]() \| [`CanvasSourceSpecification`]() | The source object, conforming to the MapLibre Style Specification's [source definition]() or [CanvasSourceSpecification](). |
#### Returns
`this`
#### Examples
```ts
map.addSource('my-data', {
type: 'vector',
url: 'https://demotiles.maplibre.org/tiles/tiles.json'
});
```
```ts
map.addSource('my-data', {
"type": "geojson",
"data": {
"type": "Feature",
"geometry": {
"type": "Point",
"coordinates": [-77.0396, 38.8891]
},
"properties": {
"title": "Washington DC",
"marker-symbol": "monument"
}
}
});
```
#### See
GeoJSON source: [Add live realtime data]()
---
### addSprite()
> \*\*addSprite\*\*(`id`: `string`, `url`: `string`, `options?`: [`StyleSetterOptions`]()): `this`
Defined in: [ui/map.ts:3889]()
Adds a sprite to the map's style. Fires the `style` event.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | The ID of the sprite to add. Must not conflict with existing sprites. |
| `url` | `string` | The URL to load the sprite from |
| `options?` | [`StyleSetterOptions`]() | Options object. |
#### Returns
`this`
#### Example
```ts
map.addSprite('sprite-two', 'http://example.com/sprite-two');
```
---
### areTilesLoaded()
> \*\*areTilesLoaded\*\*(): `boolean`
Defined in: [ui/map.ts:3151]()
Returns a Boolean indicating whether all tiles in the viewport from all sources on the style are loaded.
#### Returns
`boolean`
A Boolean indicating whether all tiles are loaded.
#### Example
```ts
let tilesLoaded = map.areTilesLoaded();
```
---
### calculateAnchoredCameraOptions()
> \*\*calculateAnchoredCameraOptions\*\*(`options`: [`AnchoredCameraOptions`]()): [`CameraOptions`]()
Defined in: [ui/map.ts:1498]()
Calculates constrained camera options that place a geographic anchor at a screen point without changing the map, using the same logic as MapLibre's interaction handlers.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `options` | [`AnchoredCameraOptions`]() | Anchor and optional zoom. |
#### Returns
[`CameraOptions`]()
Camera options that can be passed to [Map.jumpTo](<#jumpto>).
#### Example
```ts
const cameraOptions = map.calculateAnchoredCameraOptions({
anchorLocation: map.unproject(pointerDownPosition),
anchorScreenPoint: currentPointerPosition,
zoom: map.getZoom() + 1,
});
map.jumpTo(cameraOptions);
```
---
### calculateCameraOptionsFromCameraLngLatAltRotation()
> \*\*calculateCameraOptionsFromCameraLngLatAltRotation\*\*(`cameraLngLat`: [`LngLatLike`](), `cameraAlt`: `number`, `bearing`: `number`, `pitch`: `number`, `roll?`: `number`): [`CameraOptions`]()
Defined in: [ui/map.ts:1522]()
Given a camera position and rotation, calculates zoom and center point and returns them as [CameraOptions]().
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `cameraLngLat` | [`LngLatLike`]() | The lng, lat of the camera to look from |
| `cameraAlt` | `number` | The altitude of the camera to look from, in meters above sea level |
| `bearing` | `number` | Bearing of the camera, in degrees |
| `pitch` | `number` | Pitch of the camera, in degrees |
| `roll?` | `number` | Roll of the camera, in degrees |
#### Returns
[`CameraOptions`]()
the calculated camera options
#### Example
```ts
// Calculate options to look from camera position(1°, 0°, 1000m) with bearing = 90°, pitch = 30°, and roll = 45°
const cameraLngLat = new LngLat(1, 0);
const cameraAltitude = 1000;
const bearing = 90;
const pitch = 30;
const roll = 45;
const cameraOptions = map.calculateCameraOptionsFromCameraLngLatAltRotation(cameraLngLat, cameraAltitude, bearing, pitch, roll);
// Apply calculated options
map.jumpTo(cameraOptions);
```
---
### calculateCameraOptionsFromTo()
> \*\*calculateCameraOptionsFromTo\*\*(`from`: [`LngLat`](), `altitudeFrom`: `number`, `to`: [`LngLat`](), `altitudeTo?`: `number`): [`CameraOptions`]()
Defined in: [ui/map.ts:1631]()
Given a camera 'from' position and a position to look at (`to`), calculates zoom and camera rotation and returns them as [CameraOptions](). Under `globe` and `vertical-perspective` the calculation follows the sphere while the map renders as a globe, keeping the point looked at on the sea-level sphere; `altitudeTo` only becomes the center elevation.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `from` | [`LngLat`]() | The camera to look from |
| `altitudeFrom` | `number` | The altitude of the camera to look from |
| `to` | [`LngLat`]() | The center to look at |
| `altitudeTo?` | `number` | Optional altitude of the center to look at. If none given the ground height will be used. |
#### Returns
[`CameraOptions`]()
the calculated camera options
#### Example
```ts
// Calculate options to look from (1°, 0°, 1000m) to (1°, 1°, 0m)
const cameraLngLat = new LngLat(1, 0);
const cameraAltitude = 1000;
const targetLngLat = new LngLat(1, 1);
const targetAltitude = 0;
const cameraOptions = map.calculateCameraOptionsFromTo(cameraLngLat, cameraAltitude, targetLngLat, targetAltitude);
// Apply calculated options
map.jumpTo(cameraOptions);
```
---
### cameraForBounds()
> \*\*cameraForBounds\*\*(`bounds`: [`LngLatBoundsLike`](), `options?`: [`CameraForBoundsOptions`]()): [`JumpToOptions`]()
Defined in: [ui/map.ts:1411]()
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `bounds` | [`LngLatBoundsLike`]() | Calculate the center for these bounds in the viewport and use the highest zoom level up to and including [Map.getMaxZoom](<#getmaxzoom>) that fits in the viewport. LngLatBounds represent a box that is always axis-aligned with bearing 0. Bounds will be taken in `[sw, ne]` order. Southwest point will always be to the left of the northeast point. |
| `options?` | [`CameraForBoundsOptions`]() | Options object |
#### Returns
[`JumpToOptions`]()
If map is able to fit to provided bounds, returns `center`, `zoom`, and `bearing`, plus `padding` when `absolutePadding` is set. If map is unable to fit, method will warn and return undefined.
#### Example
```ts
let bbox = [[-79, 43], [-73, 45]];
let newCameraTransform = map.cameraForBounds(bbox, {
padding: {top: 10, bottom:25, left: 15, right: 5}
});
```
---
### coveringTiles()
> \*\*coveringTiles\*\*(`options`: `CoveringTilesOptions`): [`OverscaledTileID`]()\[\]
Defined in: [ui/map.ts:1080]()
Returns an array of `OverscaledTileID` objects that cover the current viewport for a given tile size. This method is useful for determining which tiles are visible in the current viewport.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `options` | `CoveringTilesOptions` | Options for calculating the covering tiles. |
#### Returns
[`OverscaledTileID`]()\[\]
An array of `OverscaledTileID` objects.
#### Example
```ts
// Get the tiles to cover the view for a 512x512px tile source
const tiles = map.coveringTiles({tileSize: 512});
```
---
### easeTo()
> \*\*easeTo\*\*(`options`: [`EaseToOptions`](), `eventData?`: `any`): `this`
Defined in: [ui/map.ts:1541]()
Changes any combination of `center`, `zoom`, `bearing`, `pitch`, `roll`, and `padding` with an animated transition between old and new values. The map will retain its current values for any details not specified in `options`.
> [!NOTE]
>
> \*\*Reduced Motion\*\*
>
> The transition will happen instantly if the user has enabled the `reduced motion` accessibility feature enabled in their operating system, unless `options` includes `essential: true`.
Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend`, `pitchstart`, `pitch`, `pitchend`, `rollstart`, `roll`, `rollend`, and `rotate`.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `options` | [`EaseToOptions`]() | Options describing the destination and animation of the transition. Accepts [CameraOptions]() and [AnimationOptions](). |
| `eventData?` | `any` | Additional properties to be added to event objects of events triggered by this method. |
#### Returns
`this`
#### See
[Navigate the map with game-like controls]()
---
### fire()
#### Call Signature
> \*\*fire\*\*(`event`: [`ErrorEvent`]() | [`MapStyleImageMissingEvent`]() | [`MapLibreEvent`]()\<`unknown`\> | [`MapSourceDataEvent`]() | [`MapMovementEvent`]() | [`MapContextEvent`]() | [`MapStyleDataEvent`]() | [`MapStyleLoadEvent`]() | [`MapBoxZoomEvent`]() | [`MapTouchEvent`]() | [`MapMouseEvent`]() | [`MapWheelEvent`]() | [`MapTerrainEvent`]() | [`MapLibreEvent`]()\<`TouchEvent` | `WheelEvent`\> & `object` | [`MapProjectionEvent`]()): `this`
Defined in: [util/evented.ts:156]()
Calls every listener registered for the event's type.
##### Parameters
| Parameter | Type |
| --- | --- |
| `event` | [`ErrorEvent`]() \| [`MapStyleImageMissingEvent`]() \| [`MapLibreEvent`]()\<`unknown`\> \| [`MapSourceDataEvent`]() \| [`MapMovementEvent`]() \| [`MapContextEvent`]() \| [`MapStyleDataEvent`]() \| [`MapStyleLoadEvent`]() \| [`MapBoxZoomEvent`]() \| [`MapTouchEvent`]() \| [`MapMouseEvent`]() \| [`MapWheelEvent`]() \| [`MapTerrainEvent`]() \| [`MapLibreEvent`]()\<`TouchEvent` \| `WheelEvent`\> & `object` \| [`MapProjectionEvent`]() |
##### Returns
`this`
##### Inherited from
[`Evented`]().[`fire`]()
#### Call Signature
> \*\*fire\*\*(`type`: keyof [`MapEventType`](), `properties?`: `object`): `this`
Defined in: [util/evented.ts:162]()
Compatibility with the (type: string, properties: Object) signature from previous versions. See https://github.com/mapbox/mapbox-gl-js/issues/6522, https://github.com/mapbox/mapbox-gl-draw/issues/766
##### Parameters
| Parameter | Type |
| --- | --- |
| `type` | keyof [`MapEventType`]() |
| `properties?` | `object` |
##### Returns
`this`
##### Inherited from
[`Evented`]().[`fire`]()
---
### fitBounds()
> \*\*fitBounds\*\*(`bounds`: [`LngLatBoundsLike`](), `options?`: [`FitBoundsOptions`](), `eventData?`: `any`): `this`
Defined in: [ui/map.ts:1432]()
Pans and zooms the map to contain its visible area within the specified geographical bounds. This function will also reset the map's bearing to 0 if bearing is nonzero.
Triggers the following events: `movestart` and `moveend`.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `bounds` | [`LngLatBoundsLike`]() | Center these bounds in the viewport and use the highest zoom level up to and including [Map.getMaxZoom](<#getmaxzoom>) that fits them in the viewport. Bounds will be taken in `[sw, ne]` order. Southwest point will always be to the left of the northeast point. |
| `options?` | [`FitBoundsOptions`]() | Options supports all properties from [AnimationOptions]() and [CameraOptions]() in addition to the fields below. |
| `eventData?` | `any` | Additional properties to be added to event objects of events triggered by this method. |
#### Returns
`this`
#### Example
```ts
let bbox = [[-79, 43], [-73, 45]];
map.fitBounds(bbox, {
padding: {top: 10, bottom:25, left: 15, right: 5}
});
```
#### See
[Fit a map to a bounding box]()
---
### fitScreenCoordinates()
> \*\*fitScreenCoordinates\*\*(`p0`: [`PointLike`](), `p1`: [`PointLike`](), `bearing`: `number`, `options?`: [`FitBoundsOptions`](), `eventData?`: `any`): `this`
Defined in: [ui/map.ts:1455]()
Pans, rotates and zooms the map to to fit the box made by points p0 and p1 once the map is rotated to the specified bearing. To zoom without rotating, pass in the current map bearing.
Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend` and `rotate`.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `p0` | [`PointLike`]() | First point on screen, in pixel coordinates |
| `p1` | [`PointLike`]() | Second point on screen, in pixel coordinates |
| `bearing` | `number` | Desired map bearing at end of animation, in degrees |
| `options?` | [`FitBoundsOptions`]() | Options object |
| `eventData?` | `any` | Additional properties to be added to event objects of events triggered by this method. |
#### Returns
`this`
#### Example
```ts
let p0 = [220, 400];
let p1 = [500, 900];
map.fitScreenCoordinates(p0, p1, map.getBearing(), {
padding: {top: 10, bottom:25, left: 15, right: 5}
});
```
#### See
Used by [BoxZoomHandler]()
---
### flyTo()
> \*\*flyTo\*\*(`options`: [`FlyToOptions`](), `eventData?`: `any`): `this`
Defined in: [ui/map.ts:1578]()
Changes any combination of center, zoom, bearing, pitch, and roll, animating the transition along a curve that evokes flight. The animation seamlessly incorporates zooming and panning to help the user maintain her bearings even after traversing a great distance.
> [!NOTE]
>
> \*\*Reduced Motion\*\*
>
> The animation will be skipped, and this will behave equivalently to `jumpTo` if the user has the `reduced motion` accessibility feature enabled in their operating system, unless 'options' includes `essential: true`.
Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend`, `pitchstart`, `pitch`, `pitchend`, `rollstart`, `roll`, `rollend`, and `rotate`.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `options` | [`FlyToOptions`]() | Options describing the destination and animation of the transition. Accepts [CameraOptions](), [AnimationOptions](), and the following additional options. |
| `eventData?` | `any` | Additional properties to be added to event objects of events triggered by this method. |
#### Returns
`this`
#### Example
```ts
// fly with default options to null island
map.flyTo({center: [0, 0], zoom: 9});
// using flyTo options
map.flyTo({
center: [0, 0],
zoom: 9,
speed: 0.2,
curve: 1,
easing(t) {
return t;
}
});
```
#### See
- [Fly to a location]()
- [Slowly fly to a location]()
- [Fly to a location based on scroll position]()
---
### getAnisotropicFilterPitch()
> \*\*getAnisotropicFilterPitch\*\*(): `number`
Defined in: [ui/map.ts:2048]()
Returns the map's anisotropic filter pitch. If the map is pitched beyond this threshold, anisotropic filtering will be applied to all raster layers.
#### Returns
`number`
The anisotropicFilterPitch
#### Example
```ts
let anisotropicFilterPitch = map.getAnisotropicFilterPitch();
```
---
### getBearing()
> \*\*getBearing\*\*(): `number`
Defined in: [ui/map.ts:1273]()
Returns the map's current bearing. The bearing is the compass direction that is "up"; for example, a bearing of 90° orients the map so that east is up.
#### Returns
`number`
The map's current bearing.
#### See
[Navigate the map with game-like controls]()
---
### getBounds()
> \*\*getBounds\*\*(): [`LngLatBounds`]()
Defined in: [ui/map.ts:1778]()
Returns the map's geographical bounds. When the bearing or pitch is non-zero, the visible region is not an axis-aligned rectangle, and the result is the smallest bounds that encompasses the visible region.
#### Returns
[`LngLatBounds`]()
The geographical bounds of the map as [LngLatBounds]().
#### Example
```ts
let bounds = map.getBounds();
```
---
### getCameraTargetElevation()
> \*\*getCameraTargetElevation\*\*(): `number`
Defined in: [ui/map.ts:4830]()
Returns the elevation for the point where the camera is looking. This value corresponds to: "meters above sea level" \\* "exaggeration"
#### Returns
`number`
The elevation.
---
### getCanvas()
> \*\*getCanvas\*\*(): `HTMLCanvasElement`
Defined in: [ui/map.ts:4157]()
Returns the map's `
