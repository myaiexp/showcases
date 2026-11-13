<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/NavigationControl/ -->

# NavigationControl

Defined in: ui/control/navigation\_control.ts:52

A `NavigationControl` control contains zoom buttons and a compass.

## Example

```
let nav = new NavigationControl();
map.addControl(nav, 'top-left');
```

## See

Display map navigation controls

## Implements

* `IControl`

## Constructors

### Constructor

> **new NavigationControl**(`options?`: `NavigationControlOptions`): `NavigationControl`

Defined in: ui/control/navigation\_control.ts:65

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `options?` | `NavigationControlOptions` | the control's options |

#### Returns

`NavigationControl`

## Methods

### onAdd()

> **onAdd**(`map`: `Map`): `HTMLElement`

Defined in: ui/control/navigation\_control.ts:121

Register a control on the map and give it a chance to register event listeners
and resources. This method is called by Map.addControl
internally.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `map` | `Map` | the Map this control will be added to |

#### Returns

`HTMLElement`

The control's container element. This should
be created by the control and returned by onAdd without being attached
to the DOM: the map will insert the control's element into the DOM
as necessary.

#### Implementation of

`IControl`.`onAdd`

---

### onRemove()

> **onRemove**(): `void`

Defined in: ui/control/navigation\_control.ts:145

Unregister a control on the map and give it a chance to detach event listeners
and resources. This method is called by Map.removeControl
internally.

#### Returns

`void`

#### Implementation of

`IControl`.`onRemove`
