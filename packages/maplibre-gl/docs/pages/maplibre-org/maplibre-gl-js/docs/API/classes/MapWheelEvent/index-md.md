<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/MapWheelEvent/index.md -->

# MapWheelEvent
Defined in: [ui/events.ts:762]()
`MapWheelEvent` is the event type for the `wheel` map event.
## Extends
- [`MapLibreEvent`]()\<`WheelEvent`\>
## Accessors
### defaultPrevented
#### Get Signature
> \*\*get\*\* \*\*defaultPrevented\*\*(): `boolean`
Defined in: [ui/events.ts:790]()
`true` if `preventDefault` has been called.
##### Returns
`boolean`
## Constructors
### Constructor
> \*\*new MapWheelEvent\*\*(`map`: [`Map`](), `originalEvent`: `WheelEvent`): `MapWheelEvent`
Defined in: [ui/events.ts:797]()
#### Parameters
| Parameter | Type |
| --- | --- |
| `map` | [`Map`]() |
| `originalEvent` | `WheelEvent` |
#### Returns
`MapWheelEvent`
#### Overrides
`MapLibreEvent.constructor`
## Methods
### preventDefault()
> \*\*preventDefault\*\*(): `void`
Defined in: [ui/events.ts:783]()
Prevents subsequent default processing of the event by the map.
Calling this method will prevent the behavior of [ScrollZoomHandler]().
#### Returns
`void`
## Properties
### originalEvent
> \*\*originalEvent\*\*: `WheelEvent`
Defined in: [ui/events.ts:776]()
The DOM event which caused the map event.
#### Overrides
`MapLibreEvent.originalEvent`
---
### target
> \*\*target\*\*: [`Map`]()
Defined in: [ui/events.ts:771]()
The `Map` object that fired the event.
#### Overrides
[`MapLibreEvent`]().[`target`]()
---
### type
> \*\*type\*\*: `"wheel"`
Defined in: [ui/events.ts:766]()
The event type.
#### Overrides
`MapLibreEvent.type`
