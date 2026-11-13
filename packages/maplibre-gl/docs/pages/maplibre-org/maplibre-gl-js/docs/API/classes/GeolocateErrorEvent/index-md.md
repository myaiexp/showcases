<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/GeolocateErrorEvent/index.md -->

# GeolocateErrorEvent
Defined in: [ui/control/geolocate\\_control.ts:109]()
The event class for the geolocate control `error` event. Carries the [PositionError]() returned by the Geolocation API.
## Extends
- [`Event`]()
## Properties
### code
> \*\*code\*\*: `number`
Defined in: [ui/control/geolocate\\_control.ts:118]()
The error code returned by the Geolocation API.
---
### message
> \*\*message\*\*: `string`
Defined in: [ui/control/geolocate\\_control.ts:122]()
The error message returned by the Geolocation API.
---
### target
> \*\*target\*\*: [`GeolocateControl`]()
Defined in: [ui/control/geolocate\\_control.ts:114]()
The `GeolocateControl` object that fired the event.
#### Overrides
[`Event`]().[`target`]()
