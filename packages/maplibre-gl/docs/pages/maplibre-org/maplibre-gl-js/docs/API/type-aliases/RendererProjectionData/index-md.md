<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/RendererProjectionData/index.md -->

# RendererProjectionData
> \*\*RendererProjectionData\*\* = [`ProjectionData`]()\<[`Mat4f32`]()\> & `object`
Defined in: [geo/projection/projection\\_data.ts:11]()
Projection data used by renderer shader uniforms. Renderer matrices are stored as 32-bit floats so WebGL can consume them directly without per-upload copies.
## Type Declaration
### uniformBufferKey?
> `optional` \*\*uniformBufferKey?\*\*: `string`
Draws of one frame with the same key share one uniform buffer.
