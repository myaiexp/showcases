<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/FullscreenControlOptions/index.md -->

# FullscreenControlOptions
> \*\*FullscreenControlOptions\*\* = `object`
Defined in: [ui/control/fullscreen\\_control.ts:11]()
The [FullscreenControl]() options object
## Properties
### container?
> `optional` \*\*container?\*\*: `HTMLElement`
Defined in: [ui/control/fullscreen\\_control.ts:15]()
`container` is the [compatible DOM element]() which should be made full screen. By default, the map container element will be made full screen.
---
### pseudo?
> `optional` \*\*pseudo?\*\*: `boolean`
Defined in: [ui/control/fullscreen\\_control.ts:21]()
If `true`, the fullscreen control will always use pseudo fullscreen mode (CSS-based, expanding to browser viewport) instead of native fullscreen API. This can be useful for faster transitions and to allow multiple maps to be "fullscreen" simultaneously in different browser windows.
#### Default Value
```ts
false
```
