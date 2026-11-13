<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/FitBoundsOptions/ -->

# FitBoundsOptions

> **FitBoundsOptions** = `FlyToOptions` & `object`

Defined in: ui/camera.ts:271

Options for Map.fitBounds method

## Type Declaration

### absolutePadding?

> `optional` **absolutePadding?**: `boolean`

If `true`, `padding` replaces the map's current padding instead of adding to it, and the map transitions to it.
This will become the default in version 7.

#### Default Value

```
false
```

### linear?

> `optional` **linear?**: `boolean`

If `true`, the map transitions using Map.easeTo. If `false`, the map transitions using Map.flyTo.
See those functions and AnimationOptions for information about options available.

#### Default Value

```
false
```

### maxZoom?

> `optional` **maxZoom?**: `number`

The maximum zoom level to allow when the map view transitions to the specified bounds.

### offset?

> `optional` **offset?**: `PointLike`

The center of the given bounds relative to the map's center, measured in pixels.

#### Default Value

```
[0, 0]
```
