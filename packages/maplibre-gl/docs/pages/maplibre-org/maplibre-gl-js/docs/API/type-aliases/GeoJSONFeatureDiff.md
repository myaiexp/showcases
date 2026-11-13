<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/GeoJSONFeatureDiff/ -->

# GeoJSONFeatureDiff

> **GeoJSONFeatureDiff** = `object`

Defined in: source/geojson\_source\_diff.ts:33

A geojson feature diff object - processed in the following order: new geometry, remove properties, add/update properties.
Provides an efficient way to update GeoJSON features in a map source without replacing the entire feature.

## Properties

### addOrUpdateProperties?

> `optional` **addOrUpdateProperties?**: `object`[]

Defined in: source/geojson\_source\_diff.ts:53

The properties to add or update along side their values

#### key

> **key**: `string`

#### value

> **value**: `any`

---

### id

> **id**: `GeoJSONFeatureId`

Defined in: source/geojson\_source\_diff.ts:37

The feature ID

---

### newGeometry?

> `optional` **newGeometry?**: `GeoJSON.Geometry`

Defined in: source/geojson\_source\_diff.ts:41

If it's a new geometry, place it here

---

### removeAllProperties?

> `optional` **removeAllProperties?**: `boolean`

Defined in: source/geojson\_source\_diff.ts:45

Setting to `true` will remove all preperties

---

### removeProperties?

> `optional` **removeProperties?**: `string`[]

Defined in: source/geojson\_source\_diff.ts:49

The properties keys to remove
