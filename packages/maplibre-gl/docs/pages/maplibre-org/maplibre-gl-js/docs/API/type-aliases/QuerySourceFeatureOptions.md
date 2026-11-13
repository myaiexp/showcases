<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/QuerySourceFeatureOptions/ -->

# QuerySourceFeatureOptions

> **QuerySourceFeatureOptions** = `object`

Defined in: source/query\_features.ts:53

The options object related to the Map.querySourceFeatures method

## Properties

### filter?

> `optional` **filter?**: `FilterSpecification`

Defined in: source/query\_features.ts:62

A filter
to limit query results.

---

### sourceLayer?

> `optional` **sourceLayer?**: `string`

Defined in: source/query\_features.ts:57

The name of the source layer to query. *For vector tile sources, this parameter is required.* For GeoJSON sources, it is ignored.

---

### validate?

> `optional` **validate?**: `boolean`

Defined in: source/query\_features.ts:67

Whether to check if the `parameters.filter` conforms to the MapLibre Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.

#### Default Value

```
true
```
