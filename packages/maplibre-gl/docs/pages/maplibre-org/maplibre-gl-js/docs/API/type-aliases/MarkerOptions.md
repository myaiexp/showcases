<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MarkerOptions/ -->

# MarkerOptions

> **MarkerOptions** = `object`

Defined in: ui/marker.ts:104

The Marker options object

## Properties

### anchor?

> `optional` **anchor?**: `PositionAnchor`

Defined in: ui/marker.ts:122

A string indicating the part of the Marker that should be positioned closest to the coordinate set via Marker.setLngLat.
Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`.

#### Default Value

```
'center'
```

---

### className?

> `optional` **className?**: `string`

Defined in: ui/marker.ts:112

Space-separated CSS class names to add to marker element.

---

### clickTolerance?

> `optional` **clickTolerance?**: `number`

Defined in: ui/marker.ts:146

The max number of pixels a user can shift the mouse pointer during a click on the marker for it to be considered a valid click (as opposed to a marker drag). The default is to inherit map's clickTolerance.

#### Default Value

```
0
```

---

### color?

> `optional` **color?**: `string`

Defined in: ui/marker.ts:127

The color to use for the default marker if options.element is not provided. The default is light blue.

#### Default Value

```
'#3FB1CE'
```

---

### draggable?

> `optional` **draggable?**: `boolean`

Defined in: ui/marker.ts:141

A boolean indicating whether or not a marker is able to be dragged to a new position on the map.
A draggable default marker also becomes keyboard focusable and, while focused, moves by
1 screen pixel per arrow-key press (10 with Shift), firing the same `dragstart`/`drag`/`dragend`
events as pointer dragging. Markers with a custom `element` keep their focusability and
keyboard behavior application-owned.

#### Default Value

```
false
```

---

### element?

> `optional` **element?**: `HTMLElement`

Defined in: ui/marker.ts:108

DOM element to use as a marker. The default is a light blue, droplet-shaped SVG marker.

---

### offset?

> `optional` **offset?**: `PointLike`

Defined in: ui/marker.ts:116

The offset in pixels as a PointLike object to apply relative to the element's center. Negatives indicate left and up.

---

### opacity?

> `optional` **opacity?**: `string` | `number`

Defined in: ui/marker.ts:167

Marker's opacity when it's in clear view (not behind 3d terrain)
Accepts any valid CSS opacity value as a number or string.

#### Default Value

```
1
```

---

### opacityWhenCovered?

> `optional` **opacityWhenCovered?**: `string` | `number`

Defined in: ui/marker.ts:173

Marker's opacity when it's behind 3d terrain
Accepts any valid CSS opacity value as a number or string.

#### Default Value

```
0.2
```

---

### pitchAlignment?

> `optional` **pitchAlignment?**: `Alignment`

Defined in: ui/marker.ts:161

`map` aligns the `Marker` to the plane of the map. `viewport` aligns the `Marker` to the plane of the viewport. `auto` automatically matches the value of `rotationAlignment`.

#### Default Value

```
'auto'
```

---

### rotation?

> `optional` **rotation?**: `number`

Defined in: ui/marker.ts:151

The rotation angle of the marker in degrees, relative to its respective `rotationAlignment` setting. A positive value will rotate the marker clockwise.

#### Default Value

```
0
```

---

### rotationAlignment?

> `optional` **rotationAlignment?**: `Alignment`

Defined in: ui/marker.ts:156

`map` aligns the `Marker`'s rotation relative to the map, maintaining a bearing as the map rotates. `viewport` aligns the `Marker`'s rotation relative to the viewport, agnostic to map rotations. `auto` is equivalent to `viewport`.

#### Default Value

```
'auto'
```

---

### scale?

> `optional` **scale?**: `number`

Defined in: ui/marker.ts:132

The scale to use for the default marker if options.element is not provided. The default scale corresponds to a height of `41px` and a width of `27px`.

#### Default Value

```
1
```

---

### subpixelPositioning?

> `optional` **subpixelPositioning?**: `boolean`

Defined in: ui/marker.ts:179

If `true`, rounding is disabled for placement of the marker, allowing for
subpixel positioning and smoother movement when the marker is translated.

#### Default Value

```
false
```
