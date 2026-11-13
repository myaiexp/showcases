<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/MapProjectionEvent/ -->

# MapProjectionEvent

Defined in: ui/events.ts:841

The map projection event

## Extends

* `MapLibreEvent`

## Properties

### newProjection

> **newProjection**: `PropertyValueSpecification`<`ProjectionDefinitionSpecification`>

Defined in: ui/events.ts:851

Specifies the name of the new projection.
For example:

* `globe` to describe globe that has internally switched to mercator
* `vertical-perspective` to describe a globe that doesn't change to mercator
* `mercator` to describe mercator projection

---

### target

> **target**: `Map`

Defined in: ui/events.ts:492

The object that fired the event. Set when the event is fired, and narrowed to a more
specific type (e.g. `Map`, `Marker`) by the event subclasses.

#### Inherited from

`MapLibreEvent`.`target`
