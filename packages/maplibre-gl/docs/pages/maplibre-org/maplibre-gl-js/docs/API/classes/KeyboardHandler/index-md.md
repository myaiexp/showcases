<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/KeyboardHandler/index.md -->

# KeyboardHandler
Defined in: [ui/handler/keyboard.ts:28]()
The `KeyboardHandler` allows the user to zoom, rotate, and pan the map using the following keyboard shortcuts:
- `=` / `+`: Increase the zoom level by 1.
- `Shift-=` / `Shift-+`: Increase the zoom level by 2.
- `-`: Decrease the zoom level by 1.
- `Shift--`: Decrease the zoom level by 2.
- Arrow keys: Pan by 100 pixels.
- `Shift+⇢`: Increase the rotation by 15 degrees.
- `Shift+⇠`: Decrease the rotation by 15 degrees.
- `Shift+⇡`: Increase the pitch by 10 degrees.
- `Shift+⇣`: Decrease the pitch by 10 degrees.
## Implements
- [`Handler`]()
## Methods
### disable()
> \*\*disable\*\*(): `void`
Defined in: [ui/handler/keyboard.ts:155]()
Disables the "keyboard rotate and zoom" interaction.
#### Returns
`void`
#### Example
```ts
map.keyboard.disable();
```
#### Implementation of
`Handler.disable`
---
### disableRotation()
> \*\*disableRotation\*\*(): `void`
Defined in: [ui/handler/keyboard.ts:191]()
Disables the "keyboard pan/rotate" interaction, leaving the "keyboard zoom" interaction enabled.
#### Returns
`void`
#### Example
```ts
map.keyboard.disableRotation();
```
---
### enable()
> \*\*enable\*\*(): `void`
Defined in: [ui/handler/keyboard.ts:143]()
Enables the "keyboard rotate and zoom" interaction.
#### Returns
`void`
#### Example
```ts
map.keyboard.enable();
```
#### Implementation of
`Handler.enable`
---
### enableRotation()
> \*\*enableRotation\*\*(): `void`
Defined in: [ui/handler/keyboard.ts:204]()
Enables the "keyboard pan/rotate" interaction.
#### Returns
`void`
#### Example
```ts
map.keyboard.enable();
map.keyboard.enableRotation();
```
---
### isActive()
> \*\*isActive\*\*(): `boolean`
Defined in: [ui/handler/keyboard.ts:178]()
Returns true if the handler is enabled and has detected the start of a zoom/rotate gesture.
#### Returns
`boolean`
`true` if the handler is enabled and has detected the start of a zoom/rotate gesture.
#### Implementation of
[`Handler`]().[`isActive`]()
---
### isEnabled()
> \*\*isEnabled\*\*(): `boolean`
Defined in: [ui/handler/keyboard.ts:167]()
Returns a Boolean indicating whether the "keyboard rotate and zoom" interaction is enabled.
#### Returns
`boolean`
`true` if the "keyboard rotate and zoom" interaction is enabled.
#### Implementation of
`Handler.isEnabled`
---
### reset()
> \*\*reset\*\*(): `void`
Defined in: [ui/handler/keyboard.ts:47]()
`reset` can be called by the manager at any time and must reset everything to it's original state
#### Returns
`void`
#### Implementation of
[`Handler`]().[`reset`]()
