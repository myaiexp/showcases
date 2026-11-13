<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/MapStyleImageMissingEvent/ -->

# MapStyleImageMissingEvent

Defined in: ui/events.ts:878

The style image missing event, fired when an image is still missing after the missing style image
resolver has been given a chance to supply it. To load or generate images on demand,
use Map.setMissingStyleImageResolver.
Event listeners cannot resolve the missing image for the current request.

## See

Generate and add a missing icon to the map

## Extends

* `MapLibreEvent`

## Properties

### target

> **target**: `Map`

Defined in: ui/events.ts:492

The object that fired the event. Set when the event is fired, and narrowed to a more
specific type (e.g. `Map`, `Marker`) by the event subclasses.

#### Inherited from

`MapLibreEvent`.`target`
