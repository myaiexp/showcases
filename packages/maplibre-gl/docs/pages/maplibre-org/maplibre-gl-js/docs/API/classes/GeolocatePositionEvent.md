<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/GeolocatePositionEvent/ -->

# GeolocatePositionEvent

Defined in: ui/control/geolocate\_control.ts:87

The event class for the geolocate control `geolocate` and `outofmaxbounds` events.
Carries the Position returned by the Geolocation API.

## Extends

* `Event`

## Properties

### coords

> **coords**: `GeolocationCoordinates`

Defined in: ui/control/geolocate\_control.ts:96

The geographic position returned by the Geolocation API.

---

### target

> **target**: `GeolocateControl`

Defined in: ui/control/geolocate\_control.ts:92

The `GeolocateControl` object that fired the event.

#### Overrides

`Event`.`target`

---

### timestamp

> **timestamp**: `number`

Defined in: ui/control/geolocate\_control.ts:100

The time at which the position was acquired, in milliseconds since the Unix epoch.
