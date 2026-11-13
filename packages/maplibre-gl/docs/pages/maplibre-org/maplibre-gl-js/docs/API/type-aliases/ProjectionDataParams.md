<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/ProjectionDataParams/ -->

# ProjectionDataParams

> **ProjectionDataParams** = `object`

Defined in: geo/projection/projection\_data.ts:80

Parameters object for the transform's `getProjectionData` function.
Contains the requested tile ID and more.

## Properties

### aligned?

> `optional` **aligned?**: `boolean`

Defined in: geo/projection/projection\_data.ts:88

Set to true if a pixel-aligned matrix should be used, if possible (mostly used for raster tiles under mercator projection)

---

### applyGlobeMatrix?

> `optional` **applyGlobeMatrix?**: `boolean`

Defined in: geo/projection/projection\_data.ts:96

Set to true if the globe matrix should be applied (i.e. when rendering globe)

---

### applyTerrainMatrix?

> `optional` **applyTerrainMatrix?**: `boolean`

Defined in: geo/projection/projection\_data.ts:92

Set to true if the terrain matrix should be applied (i.e. when rendering terrain)

---

### overscaledTileID

> **overscaledTileID**: `OverscaledTileID` | `null`

Defined in: geo/projection/projection\_data.ts:84

The ID of the current tile
