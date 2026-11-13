<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/Style/ -->

# Style

Defined in: style/style.ts:212

The Style base class

## Extends

* `Evented`<`MapEventType`>

## Methods

### \_getOperationsToPerform()

> **\_getOperationsToPerform**(`diff`: `DiffCommand`[]): `object`

Defined in: style/style.ts:925

Translates a style diff into the calls that apply it to this style.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `diff` | `DiffCommand`[] | the operations produced by the style-spec diff algorithm |

#### Returns

`object`

the operations to run, and the names of the commands that are not supported

##### operations

> **operations**: (() => `void`)[]

###### Returns

`void`

##### unimplemented

> **unimplemented**: `string`[]

---

### \_load()

> **\_load**(`json`: `StyleSpecification`, `options`: `StyleSwapOptions` & `StyleSetterOptions`, `previousStyle?`: `StyleSpecification`): `void`

Defined in: style/style.ts:503

Loads a style. The global state is set first, since the projection and the layers read it. The projection is
created before the sources, which read it as they are added, and the map migrates to it once the layers and the
light exist, so `projectiontransition` handlers can read them.

#### Parameters

| Parameter | Type |
| --- | --- |
| `json` | `StyleSpecification` |
| `options` | `StyleSwapOptions` & `StyleSetterOptions` |
| `previousStyle?` | `StyleSpecification` |

#### Returns

`void`

---

### \_markImagesChanged()

> **\_markImagesChanged**(`ids`: `string`[]): `void`

Defined in: style/style.ts:1066

Queues the tiles that depend on these images to be reloaded on the next update, which is
needed whenever an image appears, disappears or changes size.

#### Parameters

| Parameter | Type |
| --- | --- |
| `ids` | `string`[] |

#### Returns

`void`

---

### \_setGlobalStateValues()

> **\_setGlobalStateValues**(`values`: `Record`<`string`, `any`>): `void`

Defined in: style/style.ts:379

Sets the keys in `values` that differ, keeping a copy of the state from before so readers transition from it.

#### Parameters

| Parameter | Type |
| --- | --- |
| `values` | `Record`<`string`, `any`> |

#### Returns

`void`

---

### addLayer()

> **addLayer**(`layerObject`: `AddLayerObject`, `before?`: `string`, `options?`: `StyleSetterOptions`): `this`

Defined in: style/style.ts:1169

Add a layer to the map style. The layer will be inserted before the layer with
ID `before`, or appended if `before` is omitted.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `layerObject` | `AddLayerObject` | The style layer to add. |
| `before?` | `string` | ID of an existing layer to insert before |
| `options?` | `StyleSetterOptions` | Style setter options. |

#### Returns

`this`

---

### addSprite()

> **addSprite**(`id`: `string`, `url`: `string`, `options?`: `StyleSetterOptions`, `completion?`: (`err`: `Error`) => `void`): `void`

Defined in: style/style.ts:2104

Add a sprite.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | The id of the desired sprite |
| `url` | `string` | The url to load the desired sprite from |
| `options?` | `StyleSetterOptions` | The style setter options |
| `completion?` | (`err`: `Error`) => `void` | The completion handler |

#### Returns

`void`

---

### destroy()

> **destroy**(): `void`

Defined in: style/style.ts:2184

Destroys all internal resources of the style (sources, images, layers, etc.)

#### Returns

`void`

---

### fire()

#### Call Signature

> **fire**(`event`: `ErrorEvent` | `MapStyleImageMissingEvent` | `MapLibreEvent`<`unknown`> | `MapSourceDataEvent` | `MapMovementEvent` | `MapContextEvent` | `MapStyleDataEvent` | `MapStyleLoadEvent` | `MapBoxZoomEvent` | `MapTouchEvent` | `MapMouseEvent` | `MapWheelEvent` | `MapTerrainEvent` | `MapLibreEvent`<`TouchEvent` | `WheelEvent`> & `object` | `MapProjectionEvent`): `this`

Defined in: util/evented.ts:156

Calls every listener registered for the event's type.

##### Parameters

| Parameter | Type |
| --- | --- |
| `event` | `ErrorEvent` | `MapStyleImageMissingEvent` | `MapLibreEvent`<`unknown`> | `MapSourceDataEvent` | `MapMovementEvent` | `MapContextEvent` | `MapStyleDataEvent` | `MapStyleLoadEvent` | `MapBoxZoomEvent` | `MapTouchEvent` | `MapMouseEvent` | `MapWheelEvent` | `MapTerrainEvent` | `MapLibreEvent`<`TouchEvent` | `WheelEvent`> & `object` | `MapProjectionEvent` |

##### Returns

`this`

##### Inherited from

`Evented`.`fire`

#### Call Signature

> **fire**(`type`: keyof `MapEventType`, `properties?`: `object`): `this`

Defined in: util/evented.ts:162

Compatibility with the (type: string, properties: Object) signature from previous versions.
See https://github.com/mapbox/mapbox-gl-js/issues/6522,
https://github.com/mapbox/mapbox-gl-draw/issues/766

##### Parameters

| Parameter | Type |
| --- | --- |
| `type` | keyof `MapEventType` |
| `properties?` | `object` |

##### Returns

`this`

##### Inherited from

`Evented`.`fire`

---

### getFilter()

> **getFilter**(`layer`: `string`): `void` | `FilterSpecification`

Defined in: style/style.ts:1393

Get a layer's filter object

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `layer` | `string` | the layer to inspect |

#### Returns

`void` | `FilterSpecification`

the layer's filter, if any

---

### getLayer()

> **getLayer**(`id`: `string`): `StyleLayer`

Defined in: style/style.ts:1318

Return the style layer object with the given `id`.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | id of the desired layer |

#### Returns

`StyleLayer`

a layer, if one with the given `id` exists

---

### getLayersOrder()

> **getLayersOrder**(): `string`[]

Defined in: style/style.ts:1327

Return the ids of all layers currently in the style, including custom layers, in order.

#### Returns

`string`[]

ids of layers, in order

---

### getLayoutProperty()

> **getLayoutProperty**<`K` *extends* keyof `AllLayoutProperties`>(`layerId`: `string`, `name`: `K`): `AllLayoutProperties`[`K`]

Defined in: style/style.ts:1418

Get a layout property's value from a given layer

#### Type Parameters

| Type Parameter |
| --- |
| `K` *extends* keyof `AllLayoutProperties` |

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `layerId` | `string` | the layer to inspect |
| `name` | `K` | the name of the layout property |

#### Returns

`AllLayoutProperties`[`K`]

the property value

---

### getSource()

> **getSource**(`id`: `string`): `Source`

Defined in: style/style.ts:1158

Get a source by ID.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | ID of the desired source |

#### Returns

`Source`

source

---

### getSprite()

> **getSprite**(): `object`[]

Defined in: style/style.ts:2151

Get the current sprite value.

#### Returns

`object`[]

empty array when no sprite is set; id-url pairs otherwise

---

### hasLayer()

> **hasLayer**(`id`: `string`): `boolean`

Defined in: style/style.ts:1337

Checks if a specific layer is present within the style.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | the id of the desired layer |

#### Returns

`boolean`

a boolean specifying if the given layer is present

---

### listens()

> **listens**(`type`: keyof `MapEventType`): `boolean`

Defined in: util/evented.ts:206

Returns a true if this instance of Evented or any forwardeed instances of Evented have a listener for the specified type.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | keyof `MapEventType` | The event type |

#### Returns

`boolean`

`true` if there is at least one registered listener for specified event type, `false` otherwise

#### Inherited from

`Evented`.`listens`

---

### moveLayer()

> **moveLayer**(`id`: `string`, `before?`: `string`): `void`

Defined in: style/style.ts:1244

Moves a layer to a different z-position. The layer will be inserted before the layer with
ID `before`, or appended if `before` is omitted.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | ID of the layer to move |
| `before?` | `string` | ID of an existing layer to insert before |

#### Returns

`void`

---

### off()

> **off**<`T` *extends* keyof `MapEventType`>(`type`: `T`, `listener`: (`event`: `MapEventType`[`T`]) => `void`): `this`

Defined in: util/evented.ts:117

Removes a previously registered event listener.

#### Type Parameters

| Type Parameter |
| --- |
| `T` *extends* keyof `MapEventType` |

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to remove listeners for. |
| `listener` | (`event`: `MapEventType`[`T`]) => `void` | The listener function to remove. |

#### Returns

`this`

#### Inherited from

`Evented`.`off`

---

### on()

> **on**<`T` *extends* keyof `MapEventType`>(`type`: `T`, `listener`: (`event`: `MapEventType`[`T`]) => `void`): `Subscription`

Defined in: util/evented.ts:100

Adds a listener to a specified event type.

#### Type Parameters

| Type Parameter |
| --- |
| `T` *extends* keyof `MapEventType` |

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to add a listen for. |
| `listener` | (`event`: `MapEventType`[`T`]) => `void` | The function to be called when the event is fired. The listener function is called with the data object passed to `fire`, extended with `target` and `type` properties. |

#### Returns

`Subscription`

#### Inherited from

`Evented`.`on`

---

### once()

#### Call Signature

> **once**<`T` *extends* keyof `MapEventType`>(`type`: `T`): `Promise`<`MapEventType`[`T`]>

Defined in: util/evented.ts:132

Adds a listener that will be called only once to a specified event type.

The listener will be called first time the event fires after the listener is registered.

##### Type Parameters

| Type Parameter |
| --- |
| `T` *extends* keyof `MapEventType` |

##### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |

##### Returns

`Promise`<`MapEventType`[`T`]>

a promise that resolves with the event

##### Inherited from

`Evented`.`once`

#### Call Signature

> **once**<`T` *extends* keyof `MapEventType`>(`type`: `T`, `listener`: (`event`: `MapEventType`[`T`]) => `void`): `this`

Defined in: util/evented.ts:142

Adds a listener that will be called only once to a specified event type.

The listener will be called first time the event fires after the listener is registered.

##### Type Parameters

| Type Parameter |
| --- |
| `T` *extends* keyof `MapEventType` |

##### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |
| `listener` | (`event`: `MapEventType`[`T`]) => `void` | The function to be called when the event is fired the first time. |

##### Returns

`this`

`this` when a listener is provided

##### Inherited from

`Evented`.`once`

---

### removeLayer()

> **removeLayer**(`id`: `string`): `void`

Defined in: style/style.ts:1278

Remove the layer with the given id from the style.
A ErrorEvent event will be fired if no such layer exists.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | id of the layer to remove |

#### Returns

`void`

---

### removeSource()

> **removeSource**(`id`: `string`): `this`

Defined in: style/style.ts:1116

Remove a source from this stylesheet, given its id.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | id of the source to remove |

#### Returns

`this`

#### Throws

if no source is found with the given ID

---

### removeSprite()

> **removeSprite**(`id`: `string`): `void`

Defined in: style/style.ts:2125

Remove a sprite by its id. When the last sprite is removed, the whole `this.stylesheet.sprite` object becomes
`undefined`. This falsy `undefined` value later prevents attempts to load the sprite when it's absent.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | the id of the sprite to remove |

#### Returns

`void`

---

### resize()

> **resize**(): `void`

Defined in: style/style.ts:855

Tells the layers that the canvas was resized.

#### Returns

`void`

---

### setEventedParent()

> **setEventedParent**(`parent?`: `Evented`<`EventTypeMap`>, `data?`: `EventedParentData` | (() => `EventedParentData`)): `this`

Defined in: util/evented.ts:217

Bubble all events fired by this instance of Evented to this parent instance of Evented.

#### Parameters

| Parameter | Type |
| --- | --- |
| `parent?` | `Evented`<`EventTypeMap`> |
| `data?` | `EventedParentData` | (() => `EventedParentData`) |

#### Returns

`this`

#### Inherited from

`Evented`.`setEventedParent`

---

### setGeoJSONSourceData()

> **setGeoJSONSourceData**(`id`: `string`, `data`: `string` | `GeoJSON`<`Geometry`, {[`name`: `string`]: `any`; }>): `void`

Defined in: style/style.ts:1142

Set the data of a GeoJSON source, given its id.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | id of the source |
| `data` | `string` | `GeoJSON`<`Geometry`, {[`name`: `string`]: `any`; }> | GeoJSON source |

#### Returns

`void`

---

### setSprite()

> **setSprite**(`sprite`: `SpriteSpecification`, `options?`: `StyleSetterOptions`, `completion?`: (`err`: `Error`) => `void`): `void`

Defined in: style/style.ts:2162

Set a new value for the style's sprite.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `sprite` | `SpriteSpecification` | new sprite value |
| `options?` | `StyleSetterOptions` | style setter options |
| `completion?` | (`err`: `Error`) => `void` | the completion handler |

#### Returns

`void`

---

### setState()

> **setState**(`nextState`: `StyleSpecification`, `options?`: `StyleSwapOptions` & `StyleSetterOptions`): `boolean`

Defined in: style/style.ts:883

Update this style's state to match the given style JSON, performing only
the necessary mutations.

May throw an Error ('Unimplemented: METHOD') if the maplibre-gl-style-spec
diff algorithm produces an operation that is not supported.

#### Parameters

| Parameter | Type |
| --- | --- |
| `nextState` | `StyleSpecification` |
| `options?` | `StyleSwapOptions` & `StyleSetterOptions` |

#### Returns

`boolean`

true if any changes were made; false otherwise

---

### triggerSymbolPlacement()

> **triggerSymbolPlacement**(): `void`

Defined in: style/style.ts:1920

Re-places symbols on the next frame.
Placement is skipped while its inputs look unchanged, so call this when something
the map cannot see for itself has moved symbols.

#### Returns

`void`
