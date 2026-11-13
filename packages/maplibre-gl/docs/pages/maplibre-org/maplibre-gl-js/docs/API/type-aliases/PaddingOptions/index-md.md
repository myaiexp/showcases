<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/PaddingOptions/index.md -->

# PaddingOptions
> \*\*PaddingOptions\*\* = [`RequireAtLeastOne`]()\<{ `bottom`: `number`; `left`: `number`; `right`: `number`; `top`: `number`; }\>
Defined in: [geo/edge\\_insets.ts:129]()
Options for setting padding on calls to methods such as [Map.fitBounds](), [Map.fitScreenCoordinates](), and [Map.setPadding](). Adjust these options to set the amount of padding in pixels added to the edges of the canvas. Set a uniform padding on all edges or individual values for each edge. All properties of this object must be non-negative integers.
## Examples
```ts
let bbox = [[-79, 43], [-73, 45]];
map.fitBounds(bbox, {
padding: {top: 10, bottom:25, left: 15, right: 5}
});
```
```ts
let bbox = [[-79, 43], [-73, 45]];
map.fitBounds(bbox, {
padding: 20
});
```
## See
- [Fit to the bounds of a LineString]()
- [Fit a map to a bounding box]()
