<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/AddLayerObject/ -->

# AddLayerObject

> **AddLayerObject** = `LayerSpecification` | `Omit`<`LayerSpecification`, `"source"`> & `object` | `CustomLayerInterface`

Defined in: style/style.ts:207

Specifies a layer to be added to a Style. In addition to a standard LayerSpecification
or a CustomLayerInterface, a LayerSpecification with an embedded SourceSpecification can also be provided.
