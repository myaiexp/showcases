<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/index.md -->

# Marker
Defined in: [ui/marker.ts:288]()
Creates a marker component
## Examples
```ts
let marker = new Marker()
.setLngLat([30.5, 50.5])
.addTo(map);
```
Set options
```ts
let marker = new Marker({
color: "#FFFFFF",
draggable: true
}).setLngLat([30.5, 50.5])
.addTo(map);
```
```css
.maplibregl-marker-covered {
pointer-events: none;
cursor: default;
}
```
## See
- [Add a default marker]()
- [Add custom icons with Markers]()
- [Create a draggable Marker]()
- [Animate a marker]()
- [Attach a popup to a marker instance]()
## Events
\*\*Event\*\* `dragstart` of type [MarkerDragEvent]() will be fired when dragging starts.
\*\*Event\*\* `drag` of type [MarkerDragEvent]() will be fired while dragging.
\*\*Event\*\* `dragend` of type [MarkerDragEvent]() will be fired when the marker is finished being dragged.
\*\*Event\*\* `click` of type [MarkerClickEvent]() will be fired when the marker is clicked.
## CSS Classes
\*\*CSS class\*\* `maplibregl-marker-covered` is toggled on the marker element when the marker is hidden behind 3D terrain or on the back of a globe. Use this class to apply custom styles to covered markers.
## Extends
- [`Evented`]()\<[`MarkerEventType`]()\>
## Constructors
### Constructor
> \*\*new Marker\*\*(`options?`: [`MarkerOptions`]()): `Marker`
Defined in: [ui/marker.ts:319]()
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `options?` | [`MarkerOptions`]() | the options |
#### Returns
`Marker`
#### Overrides
`Evented.constructor`
## Methods
### \\_onKeyDown()
> \*\*\\_onKeyDown\*\*(`e`: `KeyboardEvent`): `void`
Defined in: [ui/marker.ts:586]()
Move a focused draggable default marker with the arrow keys (1 screen pixel per keydown; 10 with Shift). Mirrors the pointer drag gesture: the position updates before `dragstart` fires on the first movement, every movement fires `drag`, and releasing the arrow key (or losing focus) fires `dragend`. Holding a key down produces repeated `drag` events within a single gesture.
#### Parameters
| Parameter | Type |
| --- | --- |
| `e` | `KeyboardEvent` |
#### Returns
`void`
---
### \\_updateAccessibilityRole()
> \*\*\\_updateAccessibilityRole\*\*(): `void`
Defined in: [ui/marker.ts:989]()
Keep the default marker role aligned with interactivity. Default markers need a role because `aria-label` is set in [Marker.addTo](<#addto>). Non-interactive markers use `role=img`; interactive ones (draggable or with a popup) use `role=button`. Click listeners are application-owned and do not automatically change the role. Custom marker elements are left alone so applications own their a11y tree. Explicit roles set by the application are preserved.
#### Returns
`void`
---
### \\_updateTabIndex()
> \*\*\\_updateTabIndex\*\*(): `void`
Defined in: [ui/marker.ts:965]()
Keep the marker element focusable while it has built-in keyboard behavior. A popup makes any marker element interactive; dragging only manages focusability for the default marker so custom elements stay application-owned (\#7790). A tabindex supplied by the application is never added, changed, or removed here.
#### Returns
`void`
---
### addClassName()
> \*\*addClassName\*\*(`className`: `string`): `void`
Defined in: [ui/marker.ts:811]()
Adds a CSS class to the marker element.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `className` | `string` | on-empty string with CSS class name to add to marker element |
#### Returns
`void`
#### Example
```text
let marker = new Marker()
marker.addClassName('some-class')
```
---
### addTo()
> \*\*addTo\*\*(`map`: [`Map`]()): `this`
Defined in: [ui/marker.ts:391]()
Attaches the `Marker` to a `Map` object.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `map` | [`Map`]() | The MapLibre GL JS map to add the marker to. |
#### Returns
`this`
#### Example
```ts
let marker = new Marker()
.setLngLat([30.5, 50.5])
.addTo(map); // add the marker to the map
```
---
### fire()
#### Call Signature
> \*\*fire\*\*(`event`: [`MarkerDragEvent`]() | [`MarkerClickEvent`]()): `this`
Defined in: [util/evented.ts:156]()
Calls every listener registered for the event's type.
##### Parameters
| Parameter | Type |
| --- | --- |
| `event` | [`MarkerDragEvent`]() \| [`MarkerClickEvent`]() |
##### Returns
`this`
##### Inherited from
[`Evented`]().[`fire`]()
#### Call Signature
> \*\*fire\*\*(`type`: keyof [`MarkerEventType`](), `properties?`: `object`): `this`
Defined in: [util/evented.ts:162]()
Compatibility with the (type: string, properties: Object) signature from previous versions. See https://github.com/mapbox/mapbox-gl-js/issues/6522, https://github.com/mapbox/mapbox-gl-draw/issues/766
##### Parameters
| Parameter | Type |
| --- | --- |
| `type` | keyof [`MarkerEventType`]() |
| `properties?` | `object` |
##### Returns
`this`
##### Inherited from
[`Evented`]().[`fire`]()
---
### getElement()
> \*\*getElement\*\*(): `HTMLElement`
Defined in: [ui/marker.ts:502]()
Returns the `Marker`'s HTML element.
#### Returns
`HTMLElement`
element
---
### getLngLat()
> \*\*getLngLat\*\*(): [`LngLat`]()
Defined in: [ui/marker.ts:473]()
Get the marker's geographical location.
The longitude of the result may differ by a multiple of 360 degrees from the longitude previously set by `setLngLat` because `Marker` wraps the anchor longitude across copies of the world to keep the marker on screen.
#### Returns
[`LngLat`]()
A [LngLat]() describing the marker's location.
#### Example
```ts
// Store the marker's longitude and latitude coordinates in a variable
let lngLat = marker.getLngLat();
// Print the marker's longitude and latitude values in the console
console.log('Longitude: ' + lngLat.lng + ', Latitude: ' + lngLat.lat )
```
#### See
[Create a draggable Marker]()
---
### getOffset()
> \*\*getOffset\*\*(): `Point`
Defined in: [ui/marker.ts:786]()
Get the marker's offset.
#### Returns
`Point`
The marker's screen coordinates in pixels.
---
### getPitchAlignment()
> \*\*getPitchAlignment\*\*(): [`Alignment`]()
Defined in: [ui/marker.ts:1054]()
Returns the current `pitchAlignment` property of the marker.
#### Returns
[`Alignment`]()
The current pitch alignment of the marker in degrees.
---
### getPopup()
> \*\*getPopup\*\*(): [`Popup`]()
Defined in: [ui/marker.ts:651]()
Returns the [Popup]() instance that is bound to the Marker.
#### Returns
[`Popup`]()
popup
#### Example
```ts
let marker = new Marker()
.setLngLat([0, 0])
.setPopup(new Popup().setHTML("

# Hello World!

"))
.addTo(map);
console.log(marker.getPopup()); // return the popup instance
```
---
### getRotation()
> \*\*getRotation\*\*(): `number`
Defined in: [ui/marker.ts:1018]()
Returns the current rotation angle of the marker (in degrees).
#### Returns
`number`
The current rotation angle of the marker.
---
### getRotationAlignment()
> \*\*getRotationAlignment\*\*(): [`Alignment`]()
Defined in: [ui/marker.ts:1036]()
Returns the current `rotationAlignment` property of the marker.
#### Returns
[`Alignment`]()
The current rotational alignment of the marker.
---
### isDraggable()
> \*\*isDraggable\*\*(): `boolean`
Defined in: [ui/marker.ts:954]()
Returns true if the marker can be dragged
#### Returns
`boolean`
True if the marker is draggable.
---
### listens()
> \*\*listens\*\*(`type`: keyof [`MarkerEventType`]()): `boolean`
Defined in: [util/evented.ts:206]()
Returns a true if this instance of Evented or any forwardeed instances of Evented have a listener for the specified type.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | keyof [`MarkerEventType`]() | The event type |
#### Returns
`boolean`
`true` if there is at least one registered listener for specified event type, `false` otherwise
#### Inherited from
[`Evented`]().[`listens`]()
---
### off()
> \*\*off\*\*\<`T` \*extends\* keyof [`MarkerEventType`]()\>(`type`: `T`, `listener`: (`event`: [`MarkerEventType`]()\[`T`\]) =\> `void`): `this`
Defined in: [util/evented.ts:117]()
Removes a previously registered event listener.
#### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MarkerEventType`]() |
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to remove listeners for. |
| `listener` | (`event`: [`MarkerEventType`]()\[`T`\]) =\> `void` | The listener function to remove. |
#### Returns
`this`
#### Inherited from
[`Evented`]().[`off`]()
---
### on()
> \*\*on\*\*\<`T` \*extends\* keyof [`MarkerEventType`]()\>(`type`: `T`, `listener`: (`event`: [`MarkerEventType`]()\[`T`\]) =\> `void`): [`Subscription`]()
Defined in: [util/evented.ts:100]()
Adds a listener to a specified event type.
#### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MarkerEventType`]() |
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to add a listen for. |
| `listener` | (`event`: [`MarkerEventType`]()\[`T`\]) =\> `void` | The function to be called when the event is fired. The listener function is called with the data object passed to `fire`, extended with `target` and `type` properties. |
#### Returns
[`Subscription`]()
#### Inherited from
[`Evented`]().[`on`]()
---
### once()
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`MarkerEventType`]()\>(`type`: `T`): `Promise`\<[`MarkerEventType`]()\[`T`\]\>
Defined in: [util/evented.ts:132]()
Adds a listener that will be called only once to a specified event type.
The listener will be called first time the event fires after the listener is registered.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MarkerEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |
##### Returns
`Promise`\<[`MarkerEventType`]()\[`T`\]\>
a promise that resolves with the event
##### Inherited from
[`Evented`]().[`once`]()
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* keyof [`MarkerEventType`]()\>(`type`: `T`, `listener`: (`event`: [`MarkerEventType`]()\[`T`\]) =\> `void`): `this`
Defined in: [util/evented.ts:142]()
Adds a listener that will be called only once to a specified event type.
The listener will be called first time the event fires after the listener is registered.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* keyof [`MarkerEventType`]() |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |
| `listener` | (`event`: [`MarkerEventType`]()\[`T`\]) =\> `void` | The function to be called when the event is fired the first time. |
##### Returns
`this`
`this` when a listener is provided
##### Inherited from
[`Evented`]().[`once`]()
---
### remove()
> \*\*remove\*\*(): `this`
Defined in: [ui/marker.ts:428]()
Removes the marker from a map
#### Returns
`this`
#### Example
```ts
let marker = new Marker().addTo(map);
marker.remove();
```
---
### removeClassName()
> \*\*removeClassName\*\*(`className`: `string`): `void`
Defined in: [ui/marker.ts:826]()
Removes a CSS class from the marker element.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `className` | `string` | Non-empty string with CSS class name to remove from marker element |
#### Returns
`void`
#### Example
```ts
let marker = new Marker()
marker.removeClassName('some-class')
```
---
### setDraggable()
> \*\*setDraggable\*\*(`shouldBeDraggable?`: `boolean`): `this`
Defined in: [ui/marker.ts:916]()
Sets the `draggable` property and functionality of the marker. A draggable default marker is also keyboard focusable and movable with the arrow keys (see [MarkerOptions.draggable]()); custom marker elements keep their focusability and keyboard behavior application-owned.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `shouldBeDraggable?` | `boolean` | Turns drag functionality on/off |
#### Returns
`this`
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
### setLngLat()
> \*\*setLngLat\*\*(`lnglat`: [`LngLatLike`]()): `this`
Defined in: [ui/marker.ts:490]()
Set the marker's geographical position and move it.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `lnglat` | [`LngLatLike`]() | A [LngLat]() describing where the marker should be located. |
#### Returns
`this`
#### Example
Create a new marker, set the longitude and latitude, and add it to the map
```ts
new Marker()
.setLngLat([-65.017, -16.457])
.addTo(map);
```
#### See
- [Add custom icons with Markers]()
- [Create a draggable Marker]()
---
### setOffset()
> \*\*setOffset\*\*(`offset`: [`PointLike`]()): `this`
Defined in: [ui/marker.ts:794]()
Sets the offset of the marker
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `offset` | [`PointLike`]() | The offset in pixels as a [PointLike]() object to apply relative to the element's center. Negatives indicate left and up. |
#### Returns
`this`
---
### setOpacity()
> \*\*setOpacity\*\*(`opacity?`: `string` | `number`, `opacityWhenCovered?`: `string` | `number`): `this`
Defined in: [ui/marker.ts:1064]()
Sets the `opacity` and `opacityWhenCovered` properties of the marker. When called without arguments, resets opacity and opacityWhenCovered to defaults
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `opacity?` | `string` \| `number` | Sets the `opacity` property of the marker. |
| `opacityWhenCovered?` | `string` \| `number` | Sets the `opacityWhenCovered` property of the marker. |
#### Returns
`this`
---
### setPitchAlignment()
> \*\*setPitchAlignment\*\*(`alignment?`: [`Alignment`]()): `this`
Defined in: [ui/marker.ts:1044]()
Sets the `pitchAlignment` property of the marker.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `alignment?` | [`Alignment`]() | Sets the `pitchAlignment` property of the marker. If alignment is 'auto', it will automatically match `rotationAlignment`. |
#### Returns
`this`
---
### setPopup()
> \*\*setPopup\*\*(`popup?`: [`Popup`]()): `this`
Defined in: [ui/marker.ts:519]()
Binds a [Popup]() to the Marker.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `popup?` | [`Popup`]() | An instance of the [Popup]() class. If undefined or null, any popup set on this Marker instance is unset. |
#### Returns
`this`
#### Example
```ts
let marker = new Marker()
.setLngLat([0, 0])
.setPopup(new Popup().setHTML("

# Hello World!

")) // add popup
.addTo(map);
```
#### See
[Attach a popup to a marker instance]()
---
### setRotation()
> \*\*setRotation\*\*(`rotation?`: `number`): `this`
Defined in: [ui/marker.ts:1008]()
Sets the `rotation` property of the marker.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `rotation?` | `number` | The rotation angle of the marker (clockwise, in degrees), relative to its respective [Marker.setRotationAlignment](<#setrotationalignment>) setting. |
#### Returns
`this`
---
### setRotationAlignment()
> \*\*setRotationAlignment\*\*(`alignment?`: [`Alignment`]()): `this`
Defined in: [ui/marker.ts:1026]()
Sets the `rotationAlignment` property of the marker.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `alignment?` | [`Alignment`]() | Sets the `rotationAlignment` property of the marker. defaults to 'auto' |
#### Returns
`this`
---
### setSubpixelPositioning()
> \*\*setSubpixelPositioning\*\*(`value`: `boolean`): `this`
Defined in: [ui/marker.ts:563]()
Set the option to allow subpixel positioning of the marker by passing a boolean
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `value` | `boolean` | when set to `true`, subpixel positioning is enabled for the marker. |
#### Returns
`this`
#### Example
```ts
let marker = new Marker()
marker.setSubpixelPositioning(true);
```
---
### toggleClassName()
> \*\*toggleClassName\*\*(`className`: `string`): `boolean`
Defined in: [ui/marker.ts:843]()
Add or remove the given CSS class on the marker element, depending on whether the element currently has that class.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `className` | `string` | Non-empty string with CSS class name to add/remove |
#### Returns
`boolean`
if the class was removed return false, if class was added, then return true
#### Example
```ts
let marker = new Marker()
marker.toggleClassName('toggleClass')
```
---
### togglePopup()
> \*\*togglePopup\*\*(): `this`
Defined in: [ui/marker.ts:667]()
Opens or closes the [Popup]() instance that is bound to the Marker, depending on the current state of the [Popup]().
#### Returns
`this`
#### Example
```ts
let marker = new Marker()
.setLngLat([0, 0])
.setPopup(new Popup().setHTML("

# Hello World!

"))
.addTo(map);
marker.togglePopup(); // toggle popup open or closed
```
