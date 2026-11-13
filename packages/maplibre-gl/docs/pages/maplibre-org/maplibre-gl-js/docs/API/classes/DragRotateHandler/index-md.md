<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/DragRotateHandler/index.md -->

# DragRotateHandler
Defined in: [ui/handler/shim/drag\\_rotate.ts:56]()
The `DragRotateHandler` allows the user to rotate the map by clicking and dragging the cursor while holding the right mouse button or `ctrl` key.
## Methods
### disable()
> \*\*disable\*\*(): `void`
Defined in: [ui/handler/shim/drag\\_rotate.ts:110]()
Disables the "drag to rotate" interaction.
#### Returns
`void`
#### Example
```ts
map.dragRotate.disable();
```
---
### enable()
> \*\*enable\*\*(`options?`: `boolean` | [`DragRotateOptions`]()): `void`
Defined in: [ui/handler/shim/drag\\_rotate.ts:93]()
Enables the "drag to rotate" interaction.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `options?` | `boolean` \| [`DragRotateOptions`]() | Options object |
#### Returns
`void`
#### Example
```ts
map.dragRotate.enable();
map.dragRotate.enable({around: 'pointer'});
map.dragRotate.enable({around: 'center', movement: 'linear'});
```
---
### isActive()
> \*\*isActive\*\*(): `boolean`
Defined in: [ui/handler/shim/drag\\_rotate.ts:130]()
Returns a Boolean indicating whether the "drag to rotate" interaction is active, i.e. currently being used.
#### Returns
`boolean`
`true` if the "drag to rotate" interaction is active.
---
### isEnabled()
> \*\*isEnabled\*\*(): `boolean`
Defined in: [ui/handler/shim/drag\\_rotate.ts:121]()
Returns a Boolean indicating whether the "drag to rotate" interaction is enabled.
#### Returns
`boolean`
`true` if the "drag to rotate" interaction is enabled.
