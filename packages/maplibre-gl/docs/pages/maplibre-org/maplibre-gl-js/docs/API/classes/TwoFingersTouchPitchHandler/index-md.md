<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/TwoFingersTouchPitchHandler/index.md -->

# TwoFingersTouchPitchHandler
Defined in: [ui/handler/two\\_fingers\\_touch.ts:289]()
The `TwoFingersTouchPitchHandler` allows the user to pitch the map by dragging up and down with two fingers.
## Extends
- `TwoFingersTouchHandler`
## Methods
### disable()
> \*\*disable\*\*(): `void`
Defined in: [ui/handler/two\\_fingers\\_touch.ts:109]()
Disables the "drag to pitch" interaction.
#### Returns
`void`
#### Example
```ts
map.touchPitch.disable();
```
#### Inherited from
`TwoFingersTouchHandler.disable`
---
### enable()
> \*\*enable\*\*(`options?`: `boolean` | [`AroundCenterOptions`]()): `void`
Defined in: [ui/handler/two\\_fingers\\_touch.ts:96]()
Enables the "drag to pitch" interaction.
#### Parameters
| Parameter | Type |
| --- | --- |
| `options?` | `boolean` \| [`AroundCenterOptions`]() |
#### Returns
`void`
#### Example
```ts
map.touchPitch.enable();
```
#### Inherited from
`TwoFingersTouchHandler.enable`
---
### isActive()
> \*\*isActive\*\*(): `boolean`
Defined in: [ui/handler/two\\_fingers\\_touch.ts:128]()
Returns a Boolean indicating whether the "drag to pitch" interaction is active, i.e. currently being used.
#### Returns
`boolean`
`true` if the "drag to pitch" interaction is active.
#### Inherited from
`TwoFingersTouchHandler.isActive`
---
### isEnabled()
> \*\*isEnabled\*\*(): `boolean`
Defined in: [ui/handler/two\\_fingers\\_touch.ts:119]()
Returns a Boolean indicating whether the "drag to pitch" interaction is enabled.
#### Returns
`boolean`
`true` if the "drag to pitch" interaction is enabled.
#### Inherited from
`TwoFingersTouchHandler.isEnabled`
