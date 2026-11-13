<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/functions/addSourceType/ -->

# addSourceType()

> **addSourceType**(`name`: `string`, `SourceType`: `SourceClass`): `Promise`<`void`>

Defined in: source/source.ts:193

Adds a custom source type, making it available for use with Map.addSource.

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the source type; source definition objects use this name in the `{type: ...}` field. |
| `SourceType` | `SourceClass` | A SourceClass - which is a constructor for the `Source` interface. |

## Returns

`Promise`<`void`>

a promise that is resolved when the source type is ready or rejected with an error.
