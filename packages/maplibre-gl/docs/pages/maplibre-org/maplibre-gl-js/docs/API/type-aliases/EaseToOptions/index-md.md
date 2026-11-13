<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/EaseToOptions/index.md -->

# EaseToOptions
> \*\*EaseToOptions\*\* = [`AnimationOptions`]() & [`CameraOptions`]() & `object`
Defined in: [ui/camera.ts:236]()
The [Map.easeTo]() options object
## Type Declaration
### around?
> `optional` \*\*around?\*\*: [`LngLatLike`]()
If `zoom` is specified, `around` determines the point around which the zoom is centered.
### \~\~delayEndEvents?\~\~
> `optional` \*\*delayEndEvents?\*\*: `number`
#### Deprecated
Has no effect, and will be removed in the next major version.
### padding?
> `optional` \*\*padding?\*\*: `number` | [`PaddingOptions`]()
Dimensions in pixels applied on each side of the viewport for shifting the vanishing point, which the transition animates to. The map keeps this padding once the transition ends.
