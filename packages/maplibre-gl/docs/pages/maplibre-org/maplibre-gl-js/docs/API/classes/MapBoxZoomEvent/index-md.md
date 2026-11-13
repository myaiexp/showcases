<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/MapBoxZoomEvent/index.md -->

# MapBoxZoomEvent
Defined in: [ui/events.ts:808]()
A `MapBoxZoomEvent` is the event type for the boxzoom-related map events emitted by the [BoxZoomHandler]().
## Extends
- [`MapLibreEvent`]()\<`MouseEvent`\>
## Properties
### originalEvent
> \*\*originalEvent\*\*: `MouseEvent`
Defined in: [ui/events.ts:820]()
The DOM event that triggered the boxzoom event. Can be a `MouseEvent` or `KeyboardEvent`
#### Overrides
`MapLibreEvent.originalEvent`
---
### target
> \*\*target\*\*: [`Map`]()
Defined in: [ui/events.ts:816]()
The `Map` instance that triggered the event
#### Overrides
[`MapLibreEvent`]().[`target`]()
---
### type
> \*\*type\*\*: `"boxzoomcancel"` | `"boxzoomstart"` | `"boxzoomend"`
Defined in: [ui/events.ts:812]()
The type of boxzoom event. One of `boxzoomstart`, `boxzoomend` or `boxzoomcancel`
#### Overrides
`MapLibreEvent.type`
