<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/functions/setNow/ -->

# setNow()

> **setNow**(`timestamp`: `number`): `void`

Defined in: util/time\_control.ts:83

Freezes time at a specific timestamp for deterministic rendering.
Useful for frame-by-frame video capture where each frame needs
a consistent time value.

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `timestamp` | `number` | Time in milliseconds to freeze at |

## Returns

`void`

## Example

```
// Freeze time for video export at 60fps
setNow(0);           // First frame
// ... render frame ...
setNow(16.67);       // Second frame
// ... render frame ...
setNow(33.34);       // Third frame
// ... done ...
restoreNow();        // Resume normal time
```
