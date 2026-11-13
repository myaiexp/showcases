<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/GeolocateControlEventType/ -->

# GeolocateControlEventType

> **GeolocateControlEventType** = `object`

Defined in: ui/control/geolocate\_control.ts:131

`GeolocateControlEventType` - a mapping between the geolocate control event name and the event value.
These events are used with the GeolocateControl.on method.

## Properties

### error

> **error**: `GeolocateErrorEvent`

Defined in: ui/control/geolocate\_control.ts:139

Fired on each Geolocation API position update which returned as an error.

---

### geolocate

> **geolocate**: `GeolocatePositionEvent`

Defined in: ui/control/geolocate\_control.ts:135

Fired on each Geolocation API position update which returned as success.

---

### outofmaxbounds

> **outofmaxbounds**: `GeolocatePositionEvent`

Defined in: ui/control/geolocate\_control.ts:143

Fired on each Geolocation API position update which returned as success but the user position is out of map `maxBounds`.

---

### trackuserlocationend

> **trackuserlocationend**: `GeolocateEvent`

Defined in: ui/control/geolocate\_control.ts:151

Fired when the geolocate control changes to the background state.

---

### trackuserlocationstart

> **trackuserlocationstart**: `GeolocateEvent`

Defined in: ui/control/geolocate\_control.ts:147

Fired when the geolocate control changes to the active lock state.

---

### userlocationfocus

> **userlocationfocus**: `GeolocateEvent`

Defined in: ui/control/geolocate\_control.ts:155

Fired when the geolocate control's button is clicked in the active lock state.

---

### userlocationlostfocus

> **userlocationlostfocus**: `GeolocateEvent`

Defined in: ui/control/geolocate\_control.ts:159

Fired when the user changes the viewport while in the active lock state.
