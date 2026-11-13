<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/GeolocateControl/index.md -->

# GeolocateControl
Defined in: [ui/control/geolocate\\_control.ts:342]()
A `GeolocateControl` control provides a button that uses the browser's geolocation API to locate the user on the map.
Not all browsers support geolocation, and some users may disable the feature. Geolocation support for modern browsers including Chrome requires sites to be served over HTTPS. If geolocation support is not available, the `GeolocateControl` will show as disabled.
The zoom level applied will depend on the accuracy of the geolocation provided by the device.
The `GeolocateControl` has two modes. If `trackUserLocation` is `false` (default) the control acts as a button, which when pressed will set the map's camera to target the user location. If the user moves, the map won't update. This is most suited for the desktop. If `trackUserLocation` is `true` the control acts as a toggle button that when active the user's location is actively monitored for changes. In this mode the `GeolocateControl` has three interaction states: \\* active - the map's camera automatically updates as the user's location changes, keeping the location dot in the center. Initial state and upon clicking the `GeolocateControl` button. \\* passive - the user's location dot automatically updates, but the map's camera does not. Occurs upon the user initiating a map movement. \\* disabled - occurs if Geolocation is not available, disabled or denied.
These interaction states can't be controlled programmatically, rather they are set based on user interactions.
## State Diagram
![GeolocateControl state diagram]()
## Examples
```ts
map.addControl(new GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
}));
```
```ts
// Initialize the geolocate control.
let geolocate = new GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate);
// Set an event listener that fires
// when a trackuserlocationend event occurs.
geolocate.on('trackuserlocationend', () => {
console.log('A trackuserlocationend event has occurred.')
});
```
```ts
// Initialize the geolocate control.
let geolocate = new GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate);
// Set an event listener that fires
// when a trackuserlocationstart event occurs.
geolocate.on('trackuserlocationstart', () => {
console.log('A trackuserlocationstart event has occurred.')
});
```
```ts
// Initialize the geolocate control.
let geolocate = new GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate);
// Set an event listener that fires
// when an userlocationlostfocus event occurs.
geolocate.on('userlocationlostfocus', function() {
console.log('An userlocationlostfocus event has occurred.')
});
```
```ts
// Initialize the geolocate control.
let geolocate = new GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate);
// Set an event listener that fires
// when an userlocationfocus event occurs.
geolocate.on('userlocationfocus', function() {
console.log('An userlocationfocus event has occurred.')
});
```
```ts
// Initialize the geolocate control.
let geolocate = new GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate);
// Set an event listener that fires
// when a geolocate event occurs.
geolocate.on('geolocate', () => {
console.log('A geolocate event has occurred.')
});
```
```ts
// Initialize the geolocate control.
let geolocate = new GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate);
// Set an event listener that fires
// when an error event occurs.
geolocate.on('error', () => {
console.log('An error event has occurred.')
});
```
```ts
// Initialize the geolocate control.
let geolocate = new GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate);
// Set an event listener that fires
// when an outofmaxbounds event occurs.
geolocate.on('outofmaxbounds', () => {
console.log('An outofmaxbounds event has occurred.')
});
```
## See
[Locate the user]()
## Events
\*\*Event\*\* `trackuserlocationend` of type [Event]() will be fired when the `GeolocateControl` changes to the background state, which happens when a user changes the camera during an active position lock. This only applies when `trackUserLocation` is `true`. In the background state, the dot on the map will update with location updates but the camera will not.
\*\*Event\*\* `trackuserlocationstart` of type [Event]() will be fired when the `GeolocateControl` changes to the active lock state, which happens either upon first obtaining a successful Geolocation API position for the user (a `geolocate` event will follow), or the user clicks the geolocate button when in the background state which uses the last known position to recenter the map and enter active lock state (no `geolocate` event will follow unless the users's location changes).
\*\*Event\*\* `userlocationlostfocus` of type [Event]() will be fired when the `GeolocateControl` changes to the background state, which happens when a user changes the camera during an active position lock. This only applies when `trackUserLocation` is `true`. In the background state, the dot on the map will update with location updates but the camera will not.
\*\*Event\*\* `userlocationfocus` of type [Event]() will be fired when the `GeolocateControl` changes to the active lock state, which happens upon the user clicks the geolocate button when in the background state which uses the last known position to recenter the map and enter active lock state.
\*\*Event\*\* `geolocate` of type [Event]() will be fired on each Geolocation API position update which returned as success. `data` - The returned [Position]() object from the callback in [Geolocation.getCurrentPosition()]() or [Geolocation.watchPosition()]().
\*\*Event\*\* `error` of type [Event]() will be fired on each Geolocation API position update which returned as an error. `data` - The returned [PositionError]() object from the callback in [Geolocation.getCurrentPosition()]() or [Geolocation.watchPosition()]().
\*\*Event\*\* `outofmaxbounds` of type [Event]() will be fired on each Geolocation API position update which returned as success but user position is out of map `maxBounds`. `data` - The returned [Position]() object from the callback in [Geolocation.getCurrentPosition()]() or [Geolocation.watchPosition()]().
## Extends
- [`Evented`]()\<[`GeolocateControlEventType`]()\>
## Implements
- [`IControl`]()
## Constructors
### Constructor
> \*\*new GeolocateControl\*\*(`options`: [`GeolocateControlOptions`]()): `GeolocateControl`
Defined in: [ui/control/geolocate\\_control.ts:377]()
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `options` | [`GeolocateControlOptions`]() | the control's options |
#### Returns
`GeolocateControl`
#### Overrides
`Evented.constructor`
## Methods
### \\_isOutOfMapMaxBounds()
> \*\*\\_isOutOfMapMaxBounds\*\*(`position`: `GeolocationPosition`): `boolean`
Defined in: [ui/control/geolocate\\_control.ts:424]()
Check if the Geolocation API Position is outside the map's `maxBounds`.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `position` | `GeolocationPosition` | the Geolocation API Position |
#### Returns
`boolean`
`true` if position is outside the map's `maxBounds`, otherwise returns `false`.
---
### \\_onSuccess()
> \*\*\\_onSuccess\*\*(`position`: `GeolocationPosition`): `void`
Defined in: [ui/control/geolocate\\_control.ts:477]()
When the Geolocation API returns a new location, update the `GeolocateControl`.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `position` | `GeolocationPosition` | the Geolocation API Position |
#### Returns
`void`
---
### \\_updateCamera()
> \*\*\\_updateCamera\*\*(`position`: `GeolocationPosition`): `void`
Defined in: [ui/control/geolocate\\_control.ts:545]()
Update the camera location to center on the current position. The camera change is tagged with `geolocateSource` so it does not switch the control to the background state.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `position` | `GeolocationPosition` | the Geolocation API Position |
#### Returns
`void`
---
### \\_updateMarker()
> \*\*\\_updateMarker\*\*(`position?`: `GeolocationPosition`): `void`
Defined in: [ui/control/geolocate\\_control.ts:572]()
Update the user location dot Marker to the current position
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `position?` | `GeolocationPosition` | the Geolocation API Position |
#### Returns
`void`
---
### fire()
#### Call Signature
> \*\*fire\*\*(`event`: [`GeolocateEvent`]() | [`GeolocatePositionEvent`]() | [`GeolocateErrorEvent`]()): `this`
Defined in: [util/evented.ts:156]()
Calls every listener registered for the event's type.
##### Parameters
| Parameter | Type |
| --- | --- |
| `event` | [`GeolocateEvent`]() \| [`GeolocatePositionEvent`]() \| [`GeolocateErrorEvent`]() |
##### Returns
`this`
##### Inherited from
[`Evented`]().[`fire`]()
#### Call Signature
> \*\*fire\*\*(`type`: keyof [`GeolocateControlEventType`](), `properties?`: `object`): `this`
Defined in: [util/evented.ts:162]()
Compatibility with the (type: string, properties: Object) signature from previous versions. See https://github.com/mapbox/mapbox-gl-js/issues/6522, https://github.com/mapbox/mapbox-gl-draw/issues/766
##### Parameters
| Parameter | Type |
| --- | --- |
| `type` | keyof [`GeolocateControlEventType`]() |
| `properties?` | `object` |
##### Returns
`this`
##### Inherited from
[`Evented`]().[`fire`]()
---
### listens()
> \*\*listens\*\*(`type`: keyof [`GeolocateControlEventType`]()): `boolean`
Defined in: [util/evented.ts:206]()
Returns a true if this instance of Evented or any forwardeed instances of Evented have a listener for the specified type.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | keyof [`GeolocateControlEventType`]() | The event type |
#### Returns
`boolean`
`true` if there is at least one registered listener for specified event type, `false` otherwise
#### Inherited from
[`Evented`]().[`listens`]()
---
### off()
> \*\*off\*\*\<`T` \*extends\* keyof [`GeolocateControlEventType`]()\>(`type`: `T`, `listener`: (`event`: [`GeolocateControlEventType`]()\[`T`\]) =\> `void`): `this`
Defined in: [util/evented.ts:117]()
Removes a previously registered event listener.
#### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`GeolocateControlEventType`]() |
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to remove listeners for. |
| `listener` | (`event`: [`GeolocateControlEventType`]()\[`T`\]) =\> `void` | The listener function to remove. |
#### Returns
`this`
#### Inherited from
[`Evented`]().[`off`]()
---
### on()
> \*\*on\*\*\<`T` \*extends\* keyof [`GeolocateControlEventType`]()\>(`type`: `T`, `listener`: (`event`: [`GeolocateControlEventType`]()\[`T`\]) =\> `void`): [`Subscription`]()
Defined in: [util/evented.ts:100]()
Adds a listener to a specified event type.
#### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`GeolocateControlEventType`]() |
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to add a listen for. |
| `listener` | (`event`: [`GeolocateControlEventType`]()\[`T`\]) =\> `void` | The function to be called when the event is fired. The listener function is called with the data object passed to `fire`, extended with `target` and `type` properties. |
#### Returns
[`Subscription`]()
#### Inherited from
[`Evented`]().[`on`]()
---
### onAdd()
> \*\*onAdd\*\*(`map`: [`Map`]()): `HTMLElement`
Defined in: [ui/control/geolocate\\_control.ts:383]()
Register a control on the map and give it a chance to register event listeners and resources. This method is called by [Map.addControl]() internally.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `map` | [`Map`]() | the Map this control will be added to |
#### Returns
`HTMLElement`
The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
#### Implementation of
[`IControl`]().[`onAdd`]()
---
### once()
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`GeolocateControlEventType`]()\>(`type`: `T`): `Promise`\<[`GeolocateControlEventType`]()\[`T`\]\>
Defined in: [util/evented.ts:132]()
Adds a listener that will be called only once to a specified event type.
The listener will be called first time the event fires after the listener is registered.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`GeolocateControlEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |
##### Returns
`Promise`\<[`GeolocateControlEventType`]()\[`T`\]\>
a promise that resolves with the event
##### Inherited from
[`Evented`]().[`once`]()
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`GeolocateControlEventType`]()\>(`type`: `T`, `listener`: (`event`: [`GeolocateControlEventType`]()\[`T`\]) =\> `void`): `this`
Defined in: [util/evented.ts:142]()
Adds a listener that will be called only once to a specified event type.
The listener will be called first time the event fires after the listener is registered.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`GeolocateControlEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |
| `listener` | (`event`: [`GeolocateControlEventType`]()\[`T`\]) =\> `void` | The function to be called when the event is fired the first time. |
##### Returns
`this`
`this` when a listener is provided
##### Inherited from
[`Evented`]().[`once`]()
---
### onRemove()
> \*\*onRemove\*\*(): `void`
Defined in: [ui/control/geolocate\\_control.ts:392]()
Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by [Map.removeControl]() internally.
#### Returns
`void`
#### Implementation of
[`IControl`]().[`onRemove`]()
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
### trigger()
> \*\*trigger\*\*(): `boolean`
Defined in: [ui/control/geolocate\\_control.ts:747]()
Programmatically request and move the map to the user's location.
#### Returns
`boolean`
`false` if called before control was added to a map, otherwise returns `true`.
#### Example
```ts
// Initialize the geolocate control.
let geolocate = new GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate);
map.on('load', () => {
geolocate.trigger();
});
```
