<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/BoxZoomHandler/index.md -->

# BoxZoomHandler
Defined in: [ui/handler/box\\_zoom.ts:33]()
The `BoxZoomHandler` allows the user to zoom the map to fit within a bounding box. The bounding box is defined by clicking and holding `shift` while dragging the cursor.
## Extends
- [`Evented`]()\<[`MapEventType`]()\>
## Implements
- [`Handler`]()
## Methods
### disable()
> \*\*disable\*\*(): `void`
Defined in: [ui/handler/box\\_zoom.ts:97]()
Disables the "box zoom" interaction.
#### Returns
`void`
#### Example
```ts
map.boxZoom.disable();
```
#### Implementation of
`Handler.disable`
---
### enable()
> \*\*enable\*\*(): `void`
Defined in: [ui/handler/box\\_zoom.ts:84]()
Enables the "box zoom" interaction.
#### Returns
`void`
#### Example
```ts
map.boxZoom.enable();
```
#### Implementation of
`Handler.enable`
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
### isActive()
> \*\*isActive\*\*(): `boolean`
Defined in: [ui/handler/box\\_zoom.ts:72]()
Returns a Boolean indicating whether the "box zoom" interaction is active, i.e. currently being used.
#### Returns
`boolean`
`true` if the "box zoom" interaction is active.
#### Implementation of
[`Handler`]().[`isActive`]()
---
### isEnabled()
> \*\*isEnabled\*\*(): `boolean`
Defined in: [ui/handler/box\\_zoom.ts:63]()
Returns a Boolean indicating whether the "box zoom" interaction is enabled.
#### Returns
`boolean`
`true` if the "box zoom" interaction is enabled.
#### Implementation of
`Handler.isEnabled`
---
### listens()
> \*\*listens\*\*(`type`: keyof [`MapEventType`]()): `boolean`
Defined in: [util/evented.ts:206]()
Returns a true if this instance of Evented or any forwardeed instances of Evented have a listener for the specified type.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | keyof [`MapEventType`]() | The event type |
#### Returns
`boolean`
`true` if there is at least one registered listener for specified event type, `false` otherwise
#### Inherited from
[`Evented`]().[`listens`]()
---
### off()
> \*\*off\*\*\<`T` \*extends\* keyof [`MapEventType`]()\>(`type`: `T`, `listener`: (`event`: [`MapEventType`]()\[`T`\]) =\> `void`): `this`
Defined in: [util/evented.ts:117]()
Removes a previously registered event listener.
#### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapEventType`]() |
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to remove listeners for. |
| `listener` | (`event`: [`MapEventType`]()\[`T`\]) =\> `void` | The listener function to remove. |
#### Returns
`this`
#### Inherited from
[`Evented`]().[`off`]()
---
### on()
> \*\*on\*\*\<`T` \*extends\* keyof [`MapEventType`]()\>(`type`: `T`, `listener`: (`event`: [`MapEventType`]()\[`T`\]) =\> `void`): [`Subscription`]()
Defined in: [util/evented.ts:100]()
Adds a listener to a specified event type.
#### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapEventType`]() |
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to add a listen for. |
| `listener` | (`event`: [`MapEventType`]()\[`T`\]) =\> `void` | The function to be called when the event is fired. The listener function is called with the data object passed to `fire`, extended with `target` and `type` properties. |
#### Returns
[`Subscription`]()
#### Inherited from
[`Evented`]().[`on`]()
---
### once()
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`MapEventType`]()\>(`type`: `T`): `Promise`\<[`MapEventType`]()\[`T`\]\>
Defined in: [util/evented.ts:132]()
Adds a listener that will be called only once to a specified event type.
The listener will be called first time the event fires after the listener is registered.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |
##### Returns
`Promise`\<[`MapEventType`]()\[`T`\]\>
a promise that resolves with the event
##### Inherited from
[`Evented`]().[`once`]()
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`MapEventType`]()\>(`type`: `T`, `listener`: (`event`: [`MapEventType`]()\[`T`\]) =\> `void`): `this`
Defined in: [util/evented.ts:142]()
Adds a listener that will be called only once to a specified event type.
The listener will be called first time the event fires after the listener is registered.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MapEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |
| `listener` | (`event`: [`MapEventType`]()\[`T`\]) =\> `void` | The function to be called when the event is fired the first time. |
##### Returns
`this`
`this` when a listener is provided
##### Inherited from
[`Evented`]().[`once`]()
---
### reset()
> \*\*reset\*\*(): `void`
Defined in: [ui/handler/box\\_zoom.ts:174]()
`reset` can be called by the manager at any time and must reset everything to it's original state
#### Returns
`void`
#### Implementation of
[`Handler`]().[`reset`]()
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
## Properties
### \\_boxZoomEnd?
> `optional` \*\*\\_boxZoomEnd?\*\*: (`startPos`: `Point`, `endPos`: `Point`, `originalEvent`: `MouseEvent`) =\> `void`
Defined in: [ui/handler/box\\_zoom.ts:44]()
The map's `boxZoomEnd` option, with the map already bound to it.
#### Parameters
| Parameter | Type |
| --- | --- |
| `startPos` | `Point` |
| `endPos` | `Point` |
| `originalEvent` | `MouseEvent` |
#### Returns
`void`
