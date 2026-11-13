<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/AnimationOptions/index.md -->

# AnimationOptions
> \*\*AnimationOptions\*\* = `object`
Defined in: [ui/camera.ts:301]()
Options common to map movement methods that involve animation, such as [Map.panBy]() and [Map.easeTo](), controlling the duration and easing function of the animation. All properties are optional.
## Properties
### animate?
> `optional` \*\*animate?\*\*: `boolean`
Defined in: [ui/camera.ts:318]()
If `false`, no animation will occur.
---
### duration?
> `optional` \*\*duration?\*\*: `number`
Defined in: [ui/camera.ts:305]()
The animation's duration, measured in milliseconds.
---
### easing?
> `optional` \*\*easing?\*\*: (`\_`: `number`) =\> `number`
Defined in: [ui/camera.ts:310]()
A function taking a time in the range 0..1 and returning a number where 0 is the initial state and 1 is the final state.
#### Parameters
| Parameter | Type |
| --- | --- |
| `\_` | `number` |
#### Returns
`number`
---
### essential?
> `optional` \*\*essential?\*\*: `boolean`
Defined in: [ui/camera.ts:323]()
If `true`, then the animation is considered essential and will not be affected by [`prefers-reduced-motion`]().
---
### freezeElevation?
> `optional` \*\*freezeElevation?\*\*: `boolean`
Defined in: [ui/camera.ts:329]()
Default false. Needed in 3D maps to let the camera stay in a constant height based on sea-level. After the animation finished the zoom-level will be recalculated in respect of the distance from the camera to the center-coordinate-altitude.
---
### offset?
> `optional` \*\*offset?\*\*: [`PointLike`]()
Defined in: [ui/camera.ts:314]()
of the target center relative to real map container center at the end of animation.
