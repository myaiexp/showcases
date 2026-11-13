<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/SourceEventType/index.md -->

# SourceEventType
> \*\*SourceEventType\*\* = `object`
Defined in: [ui/events.ts:466]()
`SourceEventType` - a mapping between the source data event names and their event value. These are the events fired by a [Source]() as its data loads or changes; they also bubble up to the [Map](). See [MapSourceDataEvent]() for the event shape.
## Properties
### data
> \*\*data\*\*: [`MapSourceDataEvent`]()
Defined in: [ui/events.ts:470]()
Fired when the source's data loads or changes.
---
### dataabort
> \*\*dataabort\*\*: [`MapSourceDataEvent`]()
Defined in: [ui/events.ts:478]()
Fired when a request for the source's data is aborted.
---
### dataloading
> \*\*dataloading\*\*: [`MapSourceDataEvent`]()
Defined in: [ui/events.ts:474]()
Fired when the source begins loading or changing data.
---
### error
> \*\*error\*\*: [`ErrorEvent`]()
Defined in: [ui/events.ts:482]()
Fired when there's an error
