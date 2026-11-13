<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/EdgeInsets/ -->

# EdgeInsets

Defined in: geo/edge\_insets.ts:12

An `EdgeInset` object represents screen space padding applied to the edges of the viewport.
This shifts the apparent center or the vanishing point of the map. This is useful for adding floating UI elements
on top of the map and having the vanishing point shift as UI elements resize.

## Methods

### getCenter()

> **getCenter**(`width`: `number`, `height`: `number`): `Point`

Defined in: geo/edge\_insets.ts:70

Utility method that computes the new apparent center or vanishing point after applying insets.
This is in pixels and with the top left being (0.0) and +y being downwards.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `width` | `number` | the width |
| `height` | `number` | the height |

#### Returns

`Point`

the point

---

### interpolate()

> **interpolate**(`start`: `EdgeInsets` | `PaddingOptions`, `target`: `PaddingOptions`, `t`: `number`): `this`

Defined in: geo/edge\_insets.ts:53

Interpolates the inset in-place.
This maintains the current inset value for any inset not present in `target`.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `start` | `EdgeInsets` | `PaddingOptions` | interpolation start |
| `target` | `PaddingOptions` | interpolation target |
| `t` | `number` | interpolation step/weight |

#### Returns

`this`

the insets

---

### toJSON()

> **toJSON**(): `Complete`<`PaddingOptions`>

Defined in: geo/edge\_insets.ts:95

Returns the current state as json, useful when you want to have a
read-only representation of the inset.

#### Returns

`Complete`<`PaddingOptions`>

state as json

## Properties

### bottom

> **bottom**: `number`

Defined in: geo/edge\_insets.ts:20

#### Default Value

```
0
```

---

### left

> **left**: `number`

Defined in: geo/edge\_insets.ts:24

#### Default Value

```
0
```

---

### right

> **right**: `number`

Defined in: geo/edge\_insets.ts:28

#### Default Value

```
0
```

---

### top

> **top**: `number`

Defined in: geo/edge\_insets.ts:16

#### Default Value

```
0
```
