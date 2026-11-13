<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/Event/index.md -->

# Event\
Defined in: [util/evented.ts:45]()
The event class
## Extended by
- [`GeolocateEvent`]()
- [`GeolocatePositionEvent`]()
- [`GeolocateErrorEvent`]()
- [`FullscreenEvent`]()
- [`PopupEvent`]()
- [`MarkerDragEvent`]()
- [`MarkerClickEvent`]()
- [`MapLibreEvent`]()
- [`ErrorEvent`]()
## Type Parameters
| Type Parameter | Default type |
| --- | --- |
| `TType` \*extends\* `string` | `string` |
## Properties
### target?
> `optional` \*\*target?\*\*: `unknown`
Defined in: [util/evented.ts:51]()
The object that fired the event. Set when the event is fired, and narrowed to a more specific type (e.g. `Map`, `Marker`) by the event subclasses.
