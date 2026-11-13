<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/GeoJSONSourceDiff/index.md -->

# GeoJSONSourceDiff
> \*\*GeoJSONSourceDiff\*\* = `object`
Defined in: [source/geojson\\_source\\_diff.ts:10]()
The geojson source diff object - processed in the following order: remove, add, update. Provides an efficient way to update GeoJSON data in a map source without having to replace the entire dataset.
## Properties
### add?
> `optional` \*\*add?\*\*: `GeoJSON.Feature`\[\]
Defined in: [source/geojson\\_source\\_diff.ts:22]()
An array of features to add
---
### remove?
> `optional` \*\*remove?\*\*: [`GeoJSONFeatureId`]()\[\]
Defined in: [source/geojson\\_source\\_diff.ts:18]()
An array of features IDs to remove
---
### removeAll?
> `optional` \*\*removeAll?\*\*: `boolean`
Defined in: [source/geojson\\_source\\_diff.ts:14]()
When set to `true` it will remove all features
---
### update?
> `optional` \*\*update?\*\*: [`GeoJSONFeatureDiff`]()\[\]
Defined in: [source/geojson\\_source\\_diff.ts:26]()
An array of update objects
