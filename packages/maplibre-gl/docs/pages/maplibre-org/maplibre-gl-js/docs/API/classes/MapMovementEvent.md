<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/MapMovementEvent/ -->

# MapMovementEvent

Defined in: ui/events.ts:505

`MapMovementEvent` is the event type for the camera-transition map events:
`movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend`, `rotatestart`, `rotate`, `rotateend`,
`dragstart`, `drag`, `dragend`, `pitchstart`, `pitch`, `pitchend`, `rollstart`, `roll` and `rollend`.
These are fired as the map's view changes, as a result of either user interaction or methods such
as Map.jumpTo / Map.flyTo.

## Extends

* `MapLibreEvent`<`MouseEvent` | `TouchEvent` | `WheelEvent` | `undefined`>

## Properties

### target

> **target**: `Map`

Defined in: ui/events.ts:492

The object that fired the event. Set when the event is fired, and narrowed to a more
specific type (e.g. `Map`, `Marker`) by the event subclasses.

#### Inherited from

`MapLibreEvent`.`target`
