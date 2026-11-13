<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/MapSourceDataEvent/index.md -->

# MapSourceDataEvent
Defined in: [ui/events.ts:563]()
A `MapSourceDataEvent` is emitted with the source-related `data`, `dataloading`, `dataabort`, `sourcedata`, `sourcedataloading` and `sourcedataabort` events. Its `dataType` is always `'source'`.
Possible values for `sourceDataType`s are:
- `'metadata'`: indicates that any necessary source metadata has been loaded (such as TileJSON) and it is ok to start loading tiles
- `'content'`: indicates the source data has changed (such as when source.setData() has been called on GeoJSONSource)
- `'visibility'`: send when the source becomes used when at least one of its layers becomes visible in style sense (inside the layer's zoom range and with layout.visibility set to 'visible')
- `'idle'`: indicates that no new source data has been fetched (but the source has done loading)
## Example
```ts
// The sourcedata event is an example of a MapSourceDataEvent.
// Set up an event listener on the map.
map.on('sourcedata', (e) => {
if (e.isSourceLoaded) {
// Do something when the source has finished loading
}
});
```
## Extends
- [`MapLibreEvent`]()
## Properties
### coord
> \*\*coord\*\*: [`OverscaledTileID`]()
Defined in: [ui/events.ts:585]()
The tile ID of the tile being loaded or changed, if the event is related to loading of a tile.
---
### isSourceLoaded
> \*\*isSourceLoaded\*\*: `boolean`
Defined in: [ui/events.ts:569]()
True if the event has a `dataType` of `source` and the source has no outstanding network requests.
---
### resourceTiming?
> `optional` \*\*resourceTiming?\*\*: `PerformanceResourceTiming`\[\]
Defined in: [ui/events.ts:589]()
Resource timing data, if `collectResourceTiming` is enabled for the source.
---
### source
> \*\*source\*\*: [`SourceSpecification`]()
Defined in: [ui/events.ts:573]()
The [style spec representation of the source]() if the event has a `dataType` of `source`.
---
### target
> \*\*target\*\*: [`Map`]()
Defined in: [ui/events.ts:492]()
The object that fired the event. Set when the event is fired, and narrowed to a more specific type (e.g. `Map`, `Marker`) by the event subclasses.
#### Inherited from
[`MapLibreEvent`]().[`target`]()
---
### tile
> \*\*tile\*\*: `any`
Defined in: [ui/events.ts:581]()
The tile being loaded or changed, if the event has a `dataType` of `source` and the event is related to loading of a tile.
