<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/functions/clearPrewarmedResources/index.md -->

# clearPrewarmedResources()
> \*\*clearPrewarmedResources\*\*(): `void`
Defined in: [util/global\\_worker\\_pool.ts:52]()
Clears up resources that have previously been created by `prewarm()`. Note that this is typically not necessary. You should only call this function if you expect the user of your app to not return to a Map view at any point in your application.
## Returns
`void`
## Example
```ts
clearPrewarmedResources()
```
