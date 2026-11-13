<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/ScrollZoomHandler/ -->

# ScrollZoomHandler

Defined in: ui/handler/scroll\_zoom.ts:35

The `ScrollZoomHandler` allows the user to zoom the map by scrolling.

## Implements

* `Handler`

## Methods

### \_shouldBePrevented()

> **\_shouldBePrevented**(`e`: `WheelEvent`): `boolean`

Defined in: ui/handler/scroll\_zoom.ts:159

Determines whether or not the gesture is blocked due to cooperativeGestures.

#### Parameters

| Parameter | Type |
| --- | --- |
| `e` | `WheelEvent` |

#### Returns

`boolean`

---

### disable()

> **disable**(): `void`

Defined in: ui/handler/scroll\_zoom.ts:151

Disables the "scroll to zoom" interaction.

#### Returns

`void`

#### Example

```
map.scrollZoom.disable();
```

#### Implementation of

`Handler.disable`

---

### enable()

> **enable**(`options?`: `boolean` | `AroundCenterOptions`): `void`

Defined in: ui/handler/scroll\_zoom.ts:137

Enables the "scroll to zoom" interaction.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `options?` | `boolean` | `AroundCenterOptions` | Options object. |

#### Returns

`void`

#### Example

```
map.scrollZoom.enable();
map.scrollZoom.enable({ around: 'center' })
```

#### Implementation of

`Handler.enable`

---

### isActive()

> **isActive**(): `boolean`

Defined in: ui/handler/scroll\_zoom.ts:119

This is used to indicate if the handler is currently active or not.
In case a handler is active, it will block other handlers from getting the relevant events.
There is an allow list of handlers that can be active at the same time, which is configured when adding a handler.

#### Returns

`boolean`

#### Implementation of

`Handler`.`isActive`

---

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: ui/handler/scroll\_zoom.ts:110

Returns a Boolean indicating whether the "scroll to zoom" interaction is enabled.

#### Returns

`boolean`

`true` if the "scroll to zoom" interaction is enabled.

#### Implementation of

`Handler.isEnabled`

---

### renderFrame()

> **renderFrame**(): `void` | { `around`: `Point`; `needsRenderFrame`: `boolean`; `noInertia`: `boolean`; `originalEvent`: `WheelEvent`; `zoomDelta`: `number`; }

Defined in: ui/handler/scroll\_zoom.ts:266

`renderFrame` is the only non-dom event. It is called during render
frames and can be used to smooth camera changes (see scroll handler).

#### Returns

`void` | { `around`: `Point`; `needsRenderFrame`: `boolean`; `noInertia`: `boolean`; `originalEvent`: `WheelEvent`; `zoomDelta`: `number`; }

#### Implementation of

`Handler`.`renderFrame`

---

### reset()

> **reset**(): `void`

Defined in: ui/handler/scroll\_zoom.ts:396

`reset` can be called by the manager at any time and must reset everything to it's original state

#### Returns

`void`

#### Implementation of

`Handler`.`reset`

---

### setWheelZoomRate()

> **setWheelZoomRate**(`wheelZoomRate`: `number`): `void`

Defined in: ui/handler/scroll\_zoom.ts:102

Set the zoom rate of a mouse wheel

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `wheelZoomRate` | `number` | 1/450 The rate used to scale mouse wheel movement to a zoom value. |

#### Returns

`void`

#### Example

Slow down zoom of mouse wheel

```
map.scrollZoom.setWheelZoomRate(1/600);
```

---

### setZoomRate()

> **setZoomRate**(`zoomRate`: `number`): `void`

Defined in: ui/handler/scroll\_zoom.ts:89

Set the zoom rate of a trackpad

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `zoomRate` | `number` | 1/100 The rate used to scale trackpad movement to a zoom value. |

#### Returns

`void`

#### Example

Speed up trackpad zoom

```
map.scrollZoom.setZoomRate(1/25);
```
