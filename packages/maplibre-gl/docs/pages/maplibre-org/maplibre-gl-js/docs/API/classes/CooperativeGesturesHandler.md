<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/CooperativeGesturesHandler/ -->

# CooperativeGesturesHandler

Defined in: ui/handler/cooperative\_gestures.ts:28

A `CooperativeGestureHandler` is a control that adds cooperative gesture info when user tries to zoom in/out.

When the CooperativeGestureHandler blocks a gesture, it will emit a `cooperativegestureprevented` event.

## Example

```
const map = new Map({
  cooperativeGestures: true
});
```

## See

Example: cooperative gestures

## Implements

* `Handler`

## Methods

### isActive()

> **isActive**(): `boolean`

Defined in: ui/handler/cooperative\_gestures.ts:43

This is used to indicate if the handler is currently active or not.
In case a handler is active, it will block other handlers from getting the relevant events.
There is an allow list of handlers that can be active at the same time, which is configured when adding a handler.

#### Returns

`boolean`

#### Implementation of

`Handler`.`isActive`

---

### reset()

> **reset**(): `void`

Defined in: ui/handler/cooperative\_gestures.ts:46

`reset` can be called by the manager at any time and must reset everything to it's original state

#### Returns

`void`

#### Implementation of

`Handler`.`reset`

## Properties

### \_bypassKey

> **\_bypassKey**: `"ctrlKey"` | `"metaKey"`

Defined in: ui/handler/cooperative\_gestures.ts:35

This is the key that will allow to bypass the cooperative gesture protection
