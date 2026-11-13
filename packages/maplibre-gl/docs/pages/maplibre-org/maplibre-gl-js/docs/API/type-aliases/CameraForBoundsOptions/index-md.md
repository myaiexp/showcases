<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/CameraForBoundsOptions/index.md -->

# CameraForBoundsOptions
> \*\*CameraForBoundsOptions\*\* = [`CameraOptions`]() & `object`
Defined in: [ui/camera.ts:165]()
A options object for the [Map.cameraForBounds]() method
## Type Declaration
### absolutePadding?
> `optional` \*\*absolutePadding?\*\*: `boolean`
If `true`, `padding` replaces the map's current padding instead of adding to it, and is returned with the result. This will become the default in version 7.
#### Default Value
```ts
false
```
### maxZoom?
> `optional` \*\*maxZoom?\*\*: `number`
The maximum zoom level to allow when the camera would transition to the specified bounds.
### offset?
> `optional` \*\*offset?\*\*: [`PointLike`]()
The center of the given bounds relative to the map's center, measured in pixels.
#### Default Value
```ts
[0, 0]
```
### padding?
> `optional` \*\*padding?\*\*: `number` | [`PaddingOptions`]()
The amount of padding in pixels to add to the given bounds, on top of the map's current padding.
