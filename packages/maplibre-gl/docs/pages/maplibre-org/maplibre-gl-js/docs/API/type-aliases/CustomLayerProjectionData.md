<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/CustomLayerProjectionData/ -->

# CustomLayerProjectionData

> **CustomLayerProjectionData** = `ProjectionData`<`ProjectionMatrix`, `ProjectionMatrix`>

Defined in: geo/projection/projection\_data.ts:21

Projection data exposed to custom layers. Some matrices are stored as 64-bit
floats so custom layer code can apply additional CPU-side transforms before
converting to 32-bit floats for WebGL upload when necessary.
