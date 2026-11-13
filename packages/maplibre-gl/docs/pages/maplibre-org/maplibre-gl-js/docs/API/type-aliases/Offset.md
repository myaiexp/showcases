<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/Offset/ -->

# Offset

> **Offset** = `number` | `PointLike` | `{ [_ in PositionAnchor]: PointLike }`

Defined in: ui/popup.ts:36

A pixel offset specified as:

* A single number specifying a distance from the location
* A PointLike specifying a constant offset
* An object of PointLikes specifying an offset for each anchor position

Negative offsets indicate left and up.
