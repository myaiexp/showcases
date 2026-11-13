<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/functions/getRTLTextPluginStatus/index.md -->

# \~\~getRTLTextPluginStatus()\~\~
> \*\*getRTLTextPluginStatus\*\*(): `string`
Defined in: [index.ts:121]()
Gets the map's [RTL text plugin]() status. The status can be `unavailable` (i.e. not requested or removed), `loading`, `loaded` or `error`. If the status is `loaded` and the plugin is requested again, an error will be thrown.
## Returns
`string`
## Deprecated
The status says nothing about whether right-to-left text can be drawn, which it always can be. It reports only on a plugin set through the deprecated [setRTLTextPlugin]().
## Example
```ts
const pluginStatus = getRTLTextPluginStatus();
```
