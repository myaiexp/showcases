<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/MapMouseEvent/ -->

# MapMouseEvent

Defined in: ui/events.ts:618

`MapMouseEvent` is the event type for mouse-related map events.

## Example

```
// The `click` event is an example of a `MapMouseEvent`.
// Set up an event listener on the map.
map.on('click', (e) => {
  // The event object (e) contains information like the
  // coordinates of the point on the map that was clicked.
  console.log('A click event has occurred at ' + e.lngLat);
});
```

## Extends

* `MapLibreEvent`<`MouseEvent`>

## Accessors

### defaultPrevented

#### Get Signature

> **get** **defaultPrevented**(): `boolean`

Defined in: ui/events.ts:662

`true` if `preventDefault` has been called.

##### Returns

`boolean`

## Methods

### preventDefault()

> **preventDefault**(): `void`

Defined in: ui/events.ts:655

Prevents subsequent default processing of the event by the map.

Calling this method will prevent the following default map behaviors:

* On `mousedown` events, the behavior of DragPanHandler
* On `mousedown` events, the behavior of DragRotateHandler
* On `mousedown` events, the behavior of BoxZoomHandler
* On `dblclick` events, the behavior of DoubleClickZoomHandler

#### Returns

`void`

## Properties

### lngLat

> **lngLat**: `LngLat`

Defined in: ui/events.ts:642

The geographic location on the map of the mouse cursor.

---

### originalEvent

> **originalEvent**: `MouseEvent`

Defined in: ui/events.ts:632

The DOM event which caused the map event.

#### Overrides

`MapLibreEvent.originalEvent`

---

### point

> **point**: `Point`

Defined in: ui/events.ts:637

The pixel coordinates of the mouse cursor, relative to the map and measured from the top left corner.

---

### target

> **target**: `Map`

Defined in: ui/events.ts:627

The `Map` object that fired the event.

#### Overrides

`MapLibreEvent`.`target`

---

### type

> **type**: `"click"` | `"contextmenu"` | `"dblclick"` | `"mousedown"` | `"mouseenter"` | `"mouseleave"` | `"mousemove"` | `"mouseout"` | `"mouseover"` | `"mouseup"`

Defined in: ui/events.ts:622

The event type

#### Overrides

`MapLibreEvent.type`
