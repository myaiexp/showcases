<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/TileMatrixSet/index.md -->

# TileMatrixSet
> \*\*TileMatrixSet\*\* = `object`
Defined in: [geo/projection/tile\\_matrix\\_set.ts:6]()
\*\*`Experimental`\*\*
A square, power-of-two quad tile matrix set laid over a planar CRS: tile 0/0/0 is the square of side `extentAtZoom0` whose top-left corner is `origin`, and every zoom level splits each tile in four.
## Properties
### extentAtZoom0
> \*\*extentAtZoom0\*\*: `number`
Defined in: [geo/projection/tile\\_matrix\\_set.ts:15]()
Width (= height) of tile 0/0/0 in CRS units.
---
### origin
> \*\*origin\*\*: \[`number`, `number`\]
Defined in: [geo/projection/tile\\_matrix\\_set.ts:11]()
CRS coordinates of the top-left corner of tile 0/0/0 (min x, max y); x and y are in the order the definition's `projection.forward` returns (easting, northing for a projected CRS).
