<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/TerrainHeightMapTarget/ -->

# TerrainHeightMapTarget

> **TerrainHeightMapTarget** = `object`

Defined in: render/terrain.ts:30

**`Experimental`**

A float texture for CustomRenderMethodInput.renderTerrainHeightMap, such as `RGBA32F`, which needs the
`EXT_color_buffer_float` extension to be drawn into. Red holds the elevation in meters, including the terrain exaggeration, alpha
is 1 where terrain is loaded and 0 elsewhere, and the first row is the south edge.

## Properties

### bounds

> **bounds**: [`number`, `number`, `number`, `number`]

Defined in: render/terrain.ts:38

The area to draw, `[minX, minY, maxX, maxY]` in MercatorCoordinate units, with x counting world copies.

---

### height

> **height**: `number`

Defined in: render/terrain.ts:36

The height of the texture in pixels.

---

### texture

> **texture**: `WebGLTexture`

Defined in: render/terrain.ts:32

A texture in the map's WebGL context.

---

### width

> **width**: `number`

Defined in: render/terrain.ts:34

The width of the texture in pixels.
