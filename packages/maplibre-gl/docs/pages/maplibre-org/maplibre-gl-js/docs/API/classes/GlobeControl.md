<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/GlobeControl/ -->

# GlobeControl

Defined in: ui/control/globe\_control.ts:20

A `GlobeControl` control contains a button for toggling the map projection between "mercator" and "globe".

## Example

```
let map = new Map()
    .addControl(new GlobeControl());
```

## See

## Implements

* `IControl`

## Methods

### onAdd()

> **onAdd**(`map`: `Map`): `HTMLElement`

Defined in: ui/control/globe\_control.ts:26

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

Defined in: ui/control/globe\_control.ts:41

Unregister a control on the map and give it a chance to detach event listeners
and resources. This method is called by Map.removeControl
internally.

#### Returns

`void`

#### Implementation of

`IControl`.`onRemove`
