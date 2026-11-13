<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/functions/removeProjection/ -->

# removeProjection()

> **removeProjection**(`name`: `string`): `void`

Defined in: geo/projection/projection\_crud.ts:75

**`Experimental`**

Removes a projection registered with addProjection. Maps currently using it keep working
until their projection changes. Built-in projections, whose names have no colon, cannot be removed.

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | the name the projection was registered with |

## Returns

`void`

## Throws

Error if the name has no colon

## Example

```
removeProjection('EPSG:2193');
```
