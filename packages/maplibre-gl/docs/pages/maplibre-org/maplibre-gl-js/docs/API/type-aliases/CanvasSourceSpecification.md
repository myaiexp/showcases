<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/CanvasSourceSpecification/ -->

# CanvasSourceSpecification

> **CanvasSourceSpecification** = `object`

Defined in: source/canvas\_source.ts:14

Options to add a canvas source type to the map.

## Properties

### animate?

> `optional` **animate?**: `boolean`

Defined in: source/canvas\_source.ts:27

Whether the canvas source is animated. If the canvas is static (i.e. pixels do not need to be re-read on every frame), `animate` should be set to `false` to improve performance.

#### Default Value

```
true
```

---

### canvas?

> `optional` **canvas?**: `string` | `HTMLCanvasElement`

Defined in: source/canvas\_source.ts:31

Canvas source from which to read pixels. Can be a string representing the ID of the canvas element, or the `HTMLCanvasElement` itself.

---

### coordinates

> **coordinates**: [[`number`, `number`], [`number`, `number`], [`number`, `number`], [`number`, `number`]]

Defined in: source/canvas\_source.ts:22

Four geographical coordinates denoting where to place the corners of the canvas, specified in `[longitude, latitude]` pairs.

---

### type

> **type**: `"canvas"`

Defined in: source/canvas\_source.ts:18

Source type. Must be `"canvas"`.
