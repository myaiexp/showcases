<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/functions/isTimeFrozen/index.md -->

# isTimeFrozen()
> \*\*isTimeFrozen\*\*(): `boolean`
Defined in: [util/time\\_control.ts:114]()
Returns whether time is currently frozen.
## Returns
`boolean`
True if time is frozen via setNow(), false otherwise
## Example
```ts
setNow(1000);
console.log(isTimeFrozen()); // true
restoreNow();
console.log(isTimeFrozen()); // false
```
