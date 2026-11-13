<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/LngLatBoundsLike/index.md -->

# LngLatBoundsLike
> \*\*LngLatBoundsLike\*\* = [`LngLatBounds`]() | \[[`LngLatLike`](), [`LngLatLike`]()\] | \[`number`, `number`, `number`, `number`\]
Defined in: [geo/lng\\_lat\\_bounds.ts:22]()
A [LngLatBounds]() object, an array of [LngLatLike]() objects in `[sw, ne]` order, or an array of numbers in `[west, south, east, north]` order.
## Example
```ts
let v1 = new LngLatBounds(
new LngLat(-73.9876, 40.7661),
new LngLat(-73.9397, 40.8002)
);
let v2 = new LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002])
let v3 = [[-73.9876, 40.7661], [-73.9397, 40.8002]];
```
