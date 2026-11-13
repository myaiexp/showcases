<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/functions/getMaxParallelImageRequests/index.md -->

# getMaxParallelImageRequests()
> \*\*getMaxParallelImageRequests\*\*(): `number`
Defined in: [index.ts:162]()
Gets and sets the maximum number of images (raster tiles, sprites, icons) to load in parallel, which affects performance in raster-heavy maps. 16 by default.
## Returns
`number`
Number of parallel requests currently configured.
## Example
```ts
getMaxParallelImageRequests();
```
