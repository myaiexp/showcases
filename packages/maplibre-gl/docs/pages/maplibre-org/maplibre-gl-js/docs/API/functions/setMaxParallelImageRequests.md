<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/functions/setMaxParallelImageRequests/ -->

# setMaxParallelImageRequests()

> **setMaxParallelImageRequests**(`numRequests`: `number`): `void`

Defined in: index.ts:172

Sets the maximum number of images (raster tiles, sprites, icons) to load in parallel,
which affects performance in raster-heavy maps. 16 by default.

## Parameters

| Parameter | Type |
| --- | --- |
| `numRequests` | `number` |

## Returns

`void`

## Example

```
setMaxParallelImageRequests(10);
```
