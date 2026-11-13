<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/GeolocateControlOptions/ -->

# GeolocateControlOptions

> **GeolocateControlOptions** = `object`

Defined in: ui/control/geolocate\_control.ts:16

The GeolocateControl options object

## Properties

### fitBoundsOptions?

> `optional` **fitBoundsOptions?**: `FitBoundsOptions`

Defined in: ui/control/geolocate\_control.ts:25

A options object to use when the map is panned and zoomed to the user's location. The default is to use a `maxZoom` of 15 to limit how far the map will zoom in for very accurate locations.

---

### positionOptions?

> `optional` **positionOptions?**: `PositionOptions`

Defined in: ui/control/geolocate\_control.ts:21

A Geolocation API PositionOptions object.

#### Default Value

`{enableHighAccuracy: false, timeout: 6000}`

---

### showAccuracyCircle?

> `optional` **showAccuracyCircle?**: `boolean`

Defined in: ui/control/geolocate\_control.ts:35

By default, if `showUserLocation` is `true`, a transparent circle will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location. Set to `false` to disable. Always disabled when `showUserLocation` is `false`.

#### Default Value

```
true
```

---

### showUserLocation?

> `optional` **showUserLocation?**: `boolean`

Defined in: ui/control/geolocate\_control.ts:40

By default a dot will be shown on the map at the user's location. Set to `false` to disable.

#### Default Value

```
true
```

---

### trackUserLocation?

> `optional` **trackUserLocation?**: `boolean`

Defined in: ui/control/geolocate\_control.ts:30

If `true` the `GeolocateControl` becomes a toggle button and when active the map will receive updates to the user's location as it changes.

#### Default Value

```
false
```

---

### zoomToUserAccuracy?

> `optional` **zoomToUserAccuracy?**: `boolean`

Defined in: ui/control/geolocate\_control.ts:46

If `true` then map updates from the user's location may also change the map zoom level based on the location update accuracy. If `false` then the map zoom level will not change.
Has no effect when `trackUserLocation` is `false`.

#### Default Value

```
true
```
