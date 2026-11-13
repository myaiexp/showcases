<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/ -->

# Marker

Defined in: ui/marker.ts:204

Creates a marker component

## Examples

```
let marker = new Marker()
  .setLngLat([30.5, 50.5])
  .addTo(map);
```

Set options

```
let marker = new Marker({
    color: "#FFFFFF",
    draggable: true
  }).setLngLat([30.5, 50.5])
  .addTo(map);
```

```
.maplibregl-marker-covered {
    pointer-events: none;
    cursor: default;
}
```

## See

## Events

**Event** `dragstart` of type MarkerDragEvent will be fired when dragging starts.

**Event** `drag` of type MarkerDragEvent will be fired while dragging.

**Event** `dragend` of type MarkerDragEvent will be fired when the marker is finished being dragged.

**Event** `click` of type MarkerClickEvent will be fired when the marker is clicked.

## CSS Classes

**CSS class** `maplibregl-marker-covered` is toggled on the marker element when the marker
is hidden behind 3D terrain or on the back of a globe.
Use this class to apply custom styles to covered markers.

## Extends

* `Evented`<`MarkerEventType`>

## Constructors

### Constructor

> **new Marker**(`options?`: `MarkerOptions`): `Marker`

Defined in: ui/marker.ts:235

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `options?` | `MarkerOptions` | the options |

#### Returns

`Marker`

#### Overrides

`Evented<MarkerEventType>.constructor`

## Methods

### \_updateAccessibilityRole()

> **\_updateAccessibilityRole**(): `void`

Defined in: ui/marker.ts:893

Keep the default marker role aligned with interactivity.
Default markers need a role because `aria-label` is set in Marker.addTo.
Non-interactive markers use `role=img`; interactive ones (draggable or with a popup) use `role=button`.
Click listeners are application-owned and do not automatically change the role.
Custom marker elements are left alone so applications own their a11y tree.
Explicit roles set by the application are preserved.

#### Returns

`void`

---

### addClassName()

> **addClassName**(`className`: `string`): `void`

Defined in: ui/marker.ts:755

Adds a CSS class to the marker element.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `className` | `string` | on-empty string with CSS class name to add to marker element |

#### Returns

`void`

#### Example

```
let marker = new Marker()
marker.addClassName('some-class')
```

---

### addTo()

> **addTo**(`map`: `Map`): `this`

Defined in: ui/marker.ts:394

Attaches the `Marker` to a `Map` object.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `map` | `Map` | The MapLibre GL JS map to add the marker to. |

#### Returns

`this`

#### Example

```
let marker = new Marker()
  .setLngLat([30.5, 50.5])
  .addTo(map); // add the marker to the map
```

---

### getElement()

> **getElement**(): `HTMLElement`

Defined in: ui/marker.ts:501

Returns the `Marker`'s HTML element.

#### Returns

`HTMLElement`

element

---

### getLngLat()

> **getLngLat**(): `LngLat`

Defined in: ui/marker.ts:472

Get the marker's geographical location.

The longitude of the result may differ by a multiple of 360 degrees from the longitude previously
set by `setLngLat` because `Marker` wraps the anchor longitude across copies of the world to keep
the marker on screen.

#### Returns

`LngLat`

A LngLat describing the marker's location.

#### Example

```
// Store the marker's longitude and latitude coordinates in a variable
let lngLat = marker.getLngLat();
// Print the marker's longitude and latitude values in the console
console.log('Longitude: ' + lngLat.lng + ', Latitude: ' + lngLat.lat )
```

#### See

Create a draggable Marker

---

### getOffset()

> **getOffset**(): `Point`

Defined in: ui/marker.ts:730

Get the marker's offset.

#### Returns

`Point`

The marker's screen coordinates in pixels.

---

### getPitchAlignment()

> **getPitchAlignment**(): `Alignment`

Defined in: ui/marker.ts:958

Returns the current `pitchAlignment` property of the marker.

#### Returns

`Alignment`

The current pitch alignment of the marker in degrees.

---

### getPopup()

> **getPopup**(): `Popup`

Defined in: ui/marker.ts:606

Returns the Popup instance that is bound to the Marker.

#### Returns

`Popup`

popup

#### Example

```
let marker = new Marker()
 .setLngLat([0, 0])
 .setPopup(new Popup().setHTML("<h1>Hello World!</h1>"))
 .addTo(map);

console.log(marker.getPopup()); // return the popup instance
```

---

### getRotation()

> **getRotation**(): `number`

Defined in: ui/marker.ts:922

Returns the current rotation angle of the marker (in degrees).

#### Returns

`number`

The current rotation angle of the marker.

---

### getRotationAlignment()

> **getRotationAlignment**(): `Alignment`

Defined in: ui/marker.ts:940

Returns the current `rotationAlignment` property of the marker.

#### Returns

`Alignment`

The current rotational alignment of the marker.

---

### isDraggable()

> **isDraggable**(): `boolean`

Defined in: ui/marker.ts:881

Returns true if the marker can be dragged

#### Returns

`boolean`

True if the marker is draggable.

---

### listens()

> **listens**(`type`: `string`): `boolean`

Defined in: util/evented.ts:180

Returns a true if this instance of Evented or any forwardeed instances of Evented have a listener for the specified type.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `string` | The event type |

#### Returns

`boolean`

`true` if there is at least one registered listener for specified event type, `false` otherwise

#### Inherited from

`Evented`.`listens`

---

### off()

> **off**<`T`>(`type`: `T`, `listener`: (`event`: `MarkerEventType`[`T`]) => `void`): `this`

Defined in: util/evented.ts:95

Removes a previously registered event listener.

#### Type Parameters

| Type Parameter |
| --- |
| `T` *extends* keyof `MarkerEventType` |

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to remove listeners for. |
| `listener` | (`event`: `MarkerEventType`[`T`]) => `void` | The listener function to remove. |

#### Returns

`this`

#### Inherited from

`Evented`.`off`

---

### on()

> **on**<`T`>(`type`: `T`, `listener`: (`event`: `MarkerEventType`[`T`]) => `void`): `Subscription`

Defined in: util/evented.ts:78

Adds a listener to a specified event type.

#### Type Parameters

| Type Parameter |
| --- |
| `T` *extends* keyof `MarkerEventType` |

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to add a listen for. |
| `listener` | (`event`: `MarkerEventType`[`T`]) => `void` | The function to be called when the event is fired. The listener function is called with the data object passed to `fire`, extended with `target` and `type` properties. |

#### Returns

`Subscription`

#### Inherited from

`Evented`.`on`

---

### once()

#### Call Signature

> **once**<`T`>(`type`: `T`): `Promise`<`MarkerEventType`[`T`]>

Defined in: util/evented.ts:110

Adds a listener that will be called only once to a specified event type.

The listener will be called first time the event fires after the listener is registered.

##### Type Parameters

| Type Parameter |
| --- |
| `T` *extends* keyof `MarkerEventType` |

##### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |

##### Returns

`Promise`<`MarkerEventType`[`T`]>

a promise that resolves with the event

##### Inherited from

`Evented`.`once`

#### Call Signature

> **once**<`T`>(`type`: `T`, `listener`: (`event`: `MarkerEventType`[`T`]) => `void`): `this`

Defined in: util/evented.ts:120

Adds a listener that will be called only once to a specified event type.

The listener will be called first time the event fires after the listener is registered.

##### Type Parameters

| Type Parameter |
| --- |
| `T` *extends* keyof `MarkerEventType` |

##### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |
| `listener` | (`event`: `MarkerEventType`[`T`]) => `void` | The function to be called when the event is fired the first time. |

##### Returns

`this`

`this` when a listener is provided

##### Inherited from

`Evented`.`once`

---

### remove()

> **remove**(): `this`

Defined in: ui/marker.ts:430

Removes the marker from a map

#### Returns

`this`

#### Example

```
let marker = new Marker().addTo(map);
marker.remove();
```

---

### removeClassName()

> **removeClassName**(`className`: `string`): `void`

Defined in: ui/marker.ts:770

Removes a CSS class from the marker element.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `className` | `string` | Non-empty string with CSS class name to remove from marker element |

#### Returns

`void`

#### Example

```
let marker = new Marker()
marker.removeClassName('some-class')
```

---

### setDraggable()

> **setDraggable**(`shouldBeDraggable?`: `boolean`): `this`

Defined in: ui/marker.ts:857

Sets the `draggable` property and functionality of the marker

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `shouldBeDraggable?` | `boolean` | Turns drag functionality on/off |

#### Returns

`this`

---

### setEventedParent()

> **setEventedParent**(`parent?`: `Evented`<`Record`<`string`, `any`>>, `data?`: `any`): `this`

Defined in: util/evented.ts:191

Bubble all events fired by this instance of Evented to this parent instance of Evented.

#### Parameters

| Parameter | Type |
| --- | --- |
| `parent?` | `Evented`<`Record`<`string`, `any`>> |
| `data?` | `any` |

#### Returns

`this`

#### Inherited from

`Evented`.`setEventedParent`

---

### setLngLat()

> **setLngLat**(`lnglat`: `LngLatLike`): `this`

Defined in: ui/marker.ts:489

Set the marker's geographical position and move it.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `lnglat` | `LngLatLike` | A LngLat describing where the marker should be located. |

#### Returns

`this`

#### Example

Create a new marker, set the longitude and latitude, and add it to the map

```
new Marker()
  .setLngLat([-65.017, -16.457])
  .addTo(map);
```

#### See

---

### setOffset()

> **setOffset**(`offset`: `PointLike`): `this`

Defined in: ui/marker.ts:738

Sets the offset of the marker

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `offset` | `PointLike` | The offset in pixels as a PointLike object to apply relative to the element's center. Negatives indicate left and up. |

#### Returns

`this`

---

### setOpacity()

> **setOpacity**(`opacity?`: `string` | `number`, `opacityWhenCovered?`: `string` | `number`): `this`

Defined in: ui/marker.ts:968

Sets the `opacity` and `opacityWhenCovered` properties of the marker.
When called without arguments, resets opacity and opacityWhenCovered to defaults

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `opacity?` | `string` | `number` | Sets the `opacity` property of the marker. |
| `opacityWhenCovered?` | `string` | `number` | Sets the `opacityWhenCovered` property of the marker. |

#### Returns

`this`

---

### setPitchAlignment()

> **setPitchAlignment**(`alignment?`: `Alignment`): `this`

Defined in: ui/marker.ts:948

Sets the `pitchAlignment` property of the marker.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `alignment?` | `Alignment` | Sets the `pitchAlignment` property of the marker. If alignment is 'auto', it will automatically match `rotationAlignment`. |

#### Returns

`this`

---

### setPopup()

> **setPopup**(`popup?`: `Popup`): `this`

Defined in: ui/marker.ts:518

Binds a Popup to the Marker.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `popup?` | `Popup` | An instance of the Popup class. If undefined or null, any popup set on this Marker instance is unset. |

#### Returns

`this`

#### Example

```
let marker = new Marker()
 .setLngLat([0, 0])
 .setPopup(new Popup().setHTML("<h1>Hello World!</h1>")) // add popup
 .addTo(map);
```

#### See

Attach a popup to a marker instance

---

### setRotation()

> **setRotation**(`rotation?`: `number`): `this`

Defined in: ui/marker.ts:912

Sets the `rotation` property of the marker.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `rotation?` | `number` | The rotation angle of the marker (clockwise, in degrees), relative to its respective Marker.setRotationAlignment setting. |

#### Returns

`this`

---

### setRotationAlignment()

> **setRotationAlignment**(`alignment?`: `Alignment`): `this`

Defined in: ui/marker.ts:930

Sets the `rotationAlignment` property of the marker.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `alignment?` | `Alignment` | Sets the `rotationAlignment` property of the marker. defaults to 'auto' |

#### Returns

`this`

---

### setSubpixelPositioning()

> **setSubpixelPositioning**(`value`: `boolean`): `this`

Defined in: ui/marker.ts:569

Set the option to allow subpixel positioning of the marker by passing a boolean

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `value` | `boolean` | when set to `true`, subpixel positioning is enabled for the marker. |

#### Returns

`this`

#### Example

```
let marker = new Marker()
marker.setSubpixelPositioning(true);
```

---

### toggleClassName()

> **toggleClassName**(`className`: `string`): `boolean`

Defined in: ui/marker.ts:787

Add or remove the given CSS class on the marker element, depending on whether the element currently has that class.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `className` | `string` | Non-empty string with CSS class name to add/remove |

#### Returns

`boolean`

if the class was removed return false, if class was added, then return true

#### Example

```
let marker = new Marker()
marker.toggleClassName('toggleClass')
```

---

### togglePopup()

> **togglePopup**(): `this`

Defined in: ui/marker.ts:622

Opens or closes the Popup instance that is bound to the Marker, depending on the current state of the Popup.

#### Returns

`this`

#### Example

```
let marker = new Marker()
 .setLngLat([0, 0])
 .setPopup(new Popup().setHTML("<h1>Hello World!</h1>"))
 .addTo(map);

marker.togglePopup(); // toggle popup open or closed
```
