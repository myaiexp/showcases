<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/TerrainControl/index.md -->

# TerrainControl
Defined in: [ui/control/terrain\\_control.ts:24]()
A `TerrainControl` control contains a button for turning the terrain on and off.
## Example
```ts
let map = new Map({TerrainControl: false})
.addControl(new TerrainControl({
source: "terrain"
}));
```
## See
- [3D Terrain]()
- [Create a Heatmap layer on a globe with terrain elevation]()
- [Display a hybrid satellite map with terrain elevation]()
- [Sky, Fog, Terrain]()
## Implements
- [`IControl`]()
## Constructors
### Constructor
> \*\*new TerrainControl\*\*(`options`: `TerrainSpecification`): `TerrainControl`
Defined in: [ui/control/terrain\\_control.ts:33]()
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `options` | `TerrainSpecification` | the control's options |
#### Returns
`TerrainControl`
## Methods
### onAdd()
> \*\*onAdd\*\*(`map`: [`Map`]()): `HTMLElement`
Defined in: [ui/control/terrain\\_control.ts:38]()
Register a control on the map and give it a chance to register event listeners and resources. This method is called by [Map.addControl]() internally.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `map` | [`Map`]() | the Map this control will be added to |
#### Returns
`HTMLElement`
The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
#### Implementation of
[`IControl`]().[`onAdd`]()
---
### onRemove()
> \*\*onRemove\*\*(): `void`
Defined in: [ui/control/terrain\\_control.ts:52]()
Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by [Map.removeControl]() internally.
#### Returns
`void`
#### Implementation of
[`IControl`]().[`onRemove`]()
