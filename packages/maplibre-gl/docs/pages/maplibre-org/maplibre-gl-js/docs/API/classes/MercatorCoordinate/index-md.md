<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/MercatorCoordinate/index.md -->

# MercatorCoordinate
Defined in: [geo/mercator\\_coordinate.ts:83]()
A `MercatorCoordinate` object represents a projected three dimensional position.
`MercatorCoordinate` uses the web mercator projection ([EPSG:3857]()) with slightly different units:
- the size of 1 unit is the width of the projected world instead of the "mercator meter"
- the origin of the coordinate space is at the north-west corner instead of the middle
For example, `MercatorCoordinate(0, 0, 0)` is the north-west corner of the mercator world and `MercatorCoordinate(1, 1, 0)` is the south-east corner. If you are familiar with [vector tiles]() it may be helpful to think of the coordinate space as the `0/0/0` tile with an extent of `1`.
The `z` dimension of `MercatorCoordinate` is conformal. A cube in the mercator coordinate space would be rendered as a cube.
## Example
```ts
let nullIsland = new MercatorCoordinate(0.5, 0.5, 0);
```
## See
- [Add a custom style layer]()
- [Add 3D Tiles, 3D objects and models using Three.js]()
- [Add a simple custom layer on a globe]()
## Implements
- `IMercatorCoordinate`
## Constructors
### Constructor
> \*\*new MercatorCoordinate\*\*(`x`: `number`, `y`: `number`, `z?`: `number`): `MercatorCoordinate`
Defined in: [geo/mercator\\_coordinate.ts:93]()
#### Parameters
| Parameter | Type | Default value | Description |
| --- | --- | --- | --- |
| `x` | `number` | `undefined` | The x component of the position. |
| `y` | `number` | `undefined` | The y component of the position. |
| `z?` | `number` | `0` | The z component of the position. |
#### Returns
`MercatorCoordinate`
## Methods
### meterInMercatorCoordinateUnits()
> \*\*meterInMercatorCoordinateUnits\*\*(): `number`
Defined in: [geo/mercator\\_coordinate.ts:158]()
Returns the distance of 1 meter in `MercatorCoordinate` units at this latitude.
For coordinates in real world units using meters, this naturally provides the scale to transform into `MercatorCoordinate`s.
#### Returns
`number`
Distance of 1 meter in `MercatorCoordinate` units.
#### Implementation of
`IMercatorCoordinate.meterInMercatorCoordinateUnits`
---
### toAltitude()
> \*\*toAltitude\*\*(): `number`
Defined in: [geo/mercator\\_coordinate.ts:146]()
Returns the altitude in meters of the coordinate.
#### Returns
`number`
The altitude in meters.
#### Example
```ts
let coord = new MercatorCoordinate(0, 0, 0.02);
coord.toAltitude(); // 6914.281956295339
```
#### Implementation of
`IMercatorCoordinate.toAltitude`
---
### toLngLat()
> \*\*toLngLat\*\*(): [`LngLat`]()
Defined in: [geo/mercator\\_coordinate.ts:130]()
Returns the `LngLat` for the coordinate.
#### Returns
[`LngLat`]()
The `LngLat` object.
#### Example
```ts
let coord = new MercatorCoordinate(0.5, 0.5, 0);
let lngLat = coord.toLngLat(); // LngLat(0, 0)
```
#### Implementation of
`IMercatorCoordinate.toLngLat`
---
### fromLngLat()
> `static` \*\*fromLngLat\*\*(`lngLatLike`: [`LngLatLike`](), `altitude?`: `number`): `MercatorCoordinate`
Defined in: [geo/mercator\\_coordinate.ts:111]()
Project a `LngLat` to a `MercatorCoordinate`.
#### Parameters
| Parameter | Type | Default value | Description |
| --- | --- | --- | --- |
| `lngLatLike` | [`LngLatLike`]() | `undefined` | The location to project. |
| `altitude?` | `number` | `0` | The altitude in meters of the position. |
#### Returns
`MercatorCoordinate`
The projected mercator coordinate.
#### Example
```ts
let coord = MercatorCoordinate.fromLngLat({ lng: 0, lat: 0}, 0);
coord; // MercatorCoordinate(0.5, 0.5, 0)
```
