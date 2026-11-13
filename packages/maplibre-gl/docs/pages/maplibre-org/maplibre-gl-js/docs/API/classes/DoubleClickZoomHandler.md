<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/DoubleClickZoomHandler/ -->

# DoubleClickZoomHandler

Defined in: ui/handler/shim/dblclick\_zoom.ts:10

The `DoubleClickZoomHandler` allows the user to zoom the map at a point by
double clicking or double tapping.

## Methods

### disable()

> **disable**(): `void`

Defined in: ui/handler/shim/dblclick\_zoom.ts:42

Disables the "double click to zoom" interaction.

#### Returns

`void`

#### Example

```
map.doubleClickZoom.disable();
```

---

### enable()

> **enable**(): `void`

Defined in: ui/handler/shim/dblclick\_zoom.ts:29

Enables the "double click to zoom" interaction.

#### Returns

`void`

#### Example

```
map.doubleClickZoom.enable();
```

---

### isActive()

> **isActive**(): `boolean`

Defined in: ui/handler/shim/dblclick\_zoom.ts:61

Returns a Boolean indicating whether the "double click to zoom" interaction is active, i.e. currently being used.

#### Returns

`boolean`

`true` if the "double click to zoom" interaction is active.

---

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: ui/handler/shim/dblclick\_zoom.ts:52

Returns a Boolean indicating whether the "double click to zoom" interaction is enabled.

#### Returns

`boolean`

`true` if the "double click to zoom" interaction is enabled.
