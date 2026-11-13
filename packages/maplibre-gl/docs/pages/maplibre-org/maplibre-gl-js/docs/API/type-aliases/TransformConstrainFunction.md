<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/TransformConstrainFunction/ -->

# TransformConstrainFunction

> **TransformConstrainFunction** = (`lngLat`: `LngLat`, `zoom`: `number`) => `object`

Defined in: geo/transform\_interface.ts:82

The callback defining how the transform constrains the viewport's lnglat and zoom to respect the longitude and latitude bounds.

## Parameters

| Parameter | Type |
| --- | --- |
| `lngLat` | `LngLat` |
| `zoom` | `number` |

## Returns

`object`

### center

> **center**: `LngLat`

### zoom

> **zoom**: `number`

## See

Customize the map transform constrain
