<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/UnwrappedTileIDLiteral/ -->

# UnwrappedTileIDLiteral

> **UnwrappedTileIDLiteral** = `object`

Defined in: style/style\_layer/custom\_style\_layer.ts:13

Type for an object literal that specifies a map tile.

## Properties

### canonical

> **canonical**: `object`

Defined in: style/style\_layer/custom\_style\_layer.ts:23

The tile's XY coordinates and zoom level.

#### x

> **x**: `number`

#### y

> **y**: `number`

#### z

> **z**: `number`

---

### wrap?

> `optional` **wrap?**: `number`

Defined in: style/style\_layer/custom\_style\_layer.ts:19

An optional wrap values.
Useful in scenarios when multiple world copies are visible, such as a zoomed out map or a map centered around the antimeridian.
Tiles from each world copy should have different wrap values, with wrap increasing for each copy from west to east.
