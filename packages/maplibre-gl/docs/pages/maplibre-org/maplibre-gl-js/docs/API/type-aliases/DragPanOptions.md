<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/DragPanOptions/ -->

# DragPanOptions

> **DragPanOptions** = `object`

Defined in: ui/handler/shim/drag\_pan.ts:7

A DragPanHandler options object

## Properties

### deceleration?

> `optional` **deceleration?**: `number`

Defined in: ui/handler/shim/drag\_pan.ts:23

the maximum value of the drag velocity.

#### Default Value

```
1400
```

---

### easing?

> `optional` **easing?**: (`t`: `number`) => `number`

Defined in: ui/handler/shim/drag\_pan.ts:18

easing function applied to `map.panTo` when applying the drag.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `t` | `number` | the easing function |

#### Returns

`number`

#### Default Value

```
bezier(0, 0, 0.3, 1)
```

---

### linearity?

> `optional` **linearity?**: `number`

Defined in: ui/handler/shim/drag\_pan.ts:12

factor used to scale the drag velocity

#### Default Value

```
0
```

---

### maxSpeed?

> `optional` **maxSpeed?**: `number`

Defined in: ui/handler/shim/drag\_pan.ts:28

the rate at which the speed reduces after the pan ends.

#### Default Value

```
2500
```
