<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/MapLibreEvent/index.md -->

# MapLibreEvent\
Defined in: [ui/events.ts:490]()
The base event for MapLibre
## Extends
- [`Event`]()
## Extended by
- [`MapWheelEvent`]()
- [`MapTouchEvent`]()
- [`MapMouseEvent`]()
- [`MapProjectionEvent`]()
- [`MapTerrainEvent`]()
- [`MapStyleImageMissingEvent`]()
- [`MapStyleDataEvent`]()
- [`MapStyleLoadEvent`]()
- [`MapSourceDataEvent`]()
- [`MapBoxZoomEvent`]()
- [`MapMovementEvent`]()
- [`MapContextEvent`]()
## Type Parameters
| Type Parameter | Default type |
| --- | --- |
| `TOrig` | `unknown` |
## Properties
### target
> \*\*target\*\*: [`Map`]()
Defined in: [ui/events.ts:492]()
The object that fired the event. Set when the event is fired, and narrowed to a more specific type (e.g. `Map`, `Marker`) by the event subclasses.
#### Overrides
[`Event`]().[`target`]()
