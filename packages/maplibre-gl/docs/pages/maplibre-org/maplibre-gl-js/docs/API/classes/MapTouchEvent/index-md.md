<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/MapTouchEvent/index.md -->

# MapTouchEvent
Defined in: [ui/events.ts:683]()
`MapTouchEvent` is the event type for touch-related map events.
## Extends
- [`MapLibreEvent`]()\<`TouchEvent`\>
## Accessors
### defaultPrevented
#### Get Signature
> \*\*get\*\* \*\*defaultPrevented\*\*(): `boolean`
Defined in: [ui/events.ts:738]()
`true` if `preventDefault` has been called.
##### Returns
`boolean`
## Methods
### preventDefault()
> \*\*preventDefault\*\*(): `void`
Defined in: [ui/events.ts:731]()
Prevents subsequent default processing of the event by the map.
Calling this method will prevent the following default map behaviors:
- On `touchstart` events, the behavior of [DragPanHandler]()
- On `touchstart` events, the behavior of [TwoFingersTouchZoomRotateHandler]()
#### Returns
`void`
## Properties
### lngLat
> \*\*lngLat\*\*: [`LngLat`]()
Defined in: [ui/events.ts:702]()
The geographic location on the map of the center of the touch event points.
---
### lngLats
> \*\*lngLats\*\*: [`LngLat`]()\[\]
Defined in: [ui/events.ts:720]()
The geographical locations on the map corresponding to a [touch event's `touches`]() property.
---
### originalEvent
> \*\*originalEvent\*\*: `TouchEvent`
Defined in: [ui/events.ts:697]()
The DOM event which caused the map event.
#### Overrides
`MapLibreEvent.originalEvent`
---
### point
> \*\*point\*\*: `Point`
Defined in: [ui/events.ts:708]()
The pixel coordinates of the center of the touch event points, relative to the map and measured from the top left corner.
---
### points
> \*\*points\*\*: `Point`\[\]
Defined in: [ui/events.ts:714]()
The array of pixel coordinates corresponding to a [touch event's `touches`]() property.
---
### target
> \*\*target\*\*: [`Map`]()
Defined in: [ui/events.ts:692]()
The `Map` object that fired the event.
#### Overrides
[`MapLibreEvent`]().[`target`]()
---
### type
> \*\*type\*\*: `"touchcancel"` | `"touchend"` | `"touchmove"` | `"touchstart"`
Defined in: [ui/events.ts:687]()
The event type.
#### Overrides
`MapLibreEvent.type`
