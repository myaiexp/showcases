<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/functions/restoreNow/index.md -->

# restoreNow()
> \*\*restoreNow\*\*(): `void`
Defined in: [util/time\\_control.ts:99]()
Restores normal time flow after freezing with setNow(). Call this after finishing deterministic rendering operations.
## Returns
`void`
## Example
```ts
// After video export, resume normal time
setNow(0);
// ... export frames ...
restoreNow(); // Map animations resume normally
```
