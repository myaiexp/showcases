<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapEventType/index.md -->

# MapEventType
> \*\*MapEventType\*\* = `object`
Defined in: [ui/events.ts:152]()
`MapEventType` - a mapping between the event name and the event value. These events are used with the [Map.on]() method. When using a `layerId` with [Map.on]() method, please refer to [MapLayerEventType](). The following example can be used for all the events.
## Example
```ts
// Initialize the map
let map = new Map({ // map options });
// Set an event listener
map.on('the-event-name', () => {
console.log('An event has occurred!');
});
```
## Properties
### boxzoomcancel
> \*\*boxzoomcancel\*\*: [`MapBoxZoomEvent`]()
Defined in: [ui/events.ts:265]()
Fired when the user cancels a "box zoom" interaction, or when the bounding box does not meet the minimum size threshold. See [BoxZoomHandler]().
---
### boxzoomend
> \*\*boxzoomend\*\*: [`MapBoxZoomEvent`]()
Defined in: [ui/events.ts:273]()
Fired when a "box zoom" interaction ends. See [BoxZoomHandler]().
---
### boxzoomstart
> \*\*boxzoomstart\*\*: [`MapBoxZoomEvent`]()
Defined in: [ui/events.ts:269]()
Fired when a "box zoom" interaction starts. See [BoxZoomHandler]().
---
### click
> \*\*click\*\*: [`MapMouseEvent`]()
Defined in: [ui/events.ts:299]()
Fired when a pointing device (usually a mouse) is pressed and released at the same point on the map.
#### See
- [Measure distances]()
- [Center the map on a clicked symbol]()
---
### contextmenu
> \*\*contextmenu\*\*: [`MapMouseEvent`]()
Defined in: [ui/events.ts:303]()
Fired when the right button of the mouse is clicked or the context menu key is pressed within the map.
---
### cooperativegestureprevented
> \*\*cooperativegestureprevented\*\*: [`MapLibreEvent`]()\<`WheelEvent` | `TouchEvent`\> & `object`
Defined in: [ui/events.ts:450]()
Fired whenever the cooperativeGestures option prevents a gesture from being handled by the map. This is useful for showing your own UI when this happens.
#### Type Declaration
##### gestureType
> \*\*gestureType\*\*: `"wheel\_zoom"` | `"touch\_pan"`
---
### data
> \*\*data\*\*: [`MapSourceDataEvent`]() | [`MapStyleDataEvent`]()
Defined in: [ui/events.ts:220]()
Fired when any map data loads or changes. See [MapSourceDataEvent]() and [MapStyleDataEvent]() for more information.
#### See
[Display HTML clusters with custom properties]()
---
### dataabort
> \*\*dataabort\*\*: [`MapSourceDataEvent`]()
Defined in: [ui/events.ts:256]()
Fired when a request for one of the map's sources' tiles or data is aborted.
---
### dataloading
> \*\*dataloading\*\*: [`MapSourceDataEvent`]() | [`MapStyleDataEvent`]()
Defined in: [ui/events.ts:215]()
Fired when any map data (style, source, tile, etc) begins loading or changing asynchronously. All `dataloading` events are followed by a `data`, `dataabort` or `error` event.
---
### dblclick
> \*\*dblclick\*\*: [`MapMouseEvent`]()
Defined in: [ui/events.ts:310]()
Fired when a pointing device (usually a mouse) is pressed and released twice at the same point on the map in rapid succession.
> [!NOTE]
>
> Under normal conditions, this event will be preceded by two `click` events.
---
### drag
> \*\*drag\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:400]()
Fired repeatedly during a "drag to pan" interaction. See [DragPanHandler]().
---
### dragend
> \*\*dragend\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:405]()
Fired when a "drag to pan" interaction ends. See [DragPanHandler]().
#### See
[Create a draggable marker]()
---
### dragstart
> \*\*dragstart\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:396]()
Fired when a "drag to pan" interaction starts. See [DragPanHandler]().
---
### error
> \*\*error\*\*: [`ErrorEvent`]()
Defined in: [ui/events.ts:159]()
Fired when an error occurs. This is GL JS's primary error reporting mechanism. We use an event instead of `throw` to better accommodate asynchronous operations. If no listeners are bound to the `error` event, the error will be printed to the console.
---
### idle
> \*\*idle\*\*: [`MapLibreEvent`]()
Defined in: [ui/events.ts:177]()
Fired after the last frame rendered before the map enters an "idle" state:
- No camera transitions are in progress
- All currently requested tiles have loaded
- All fade/transition animations have completed
---
### load
> \*\*load\*\*: [`MapLibreEvent`]()
Defined in: [ui/events.ts:168]()
Fired immediately after all necessary resources have been downloaded and the first visually complete rendering of the map has occurred.
#### See
- [Draw GeoJSON points]()
- [Add live realtime data]()
- [Animate a point]()
---
### mousedown
> \*\*mousedown\*\*: [`MapMouseEvent`]()
Defined in: [ui/events.ts:331]()
Fired when a pointing device (usually a mouse) is pressed within the map.
#### See
[Create a draggable point]()
---
### mousemove
> \*\*mousemove\*\*: [`MapMouseEvent`]()
Defined in: [ui/events.ts:319]()
Fired when a pointing device (usually a mouse) is moved while the cursor is inside the map. As you move the cursor across the map, the event will fire every time the cursor changes position within the map.
#### See
- [Get coordinates of the mouse pointer]()
- [Highlight features under the mouse pointer]()
- [Display a popup on over]()
---
### mouseout
> \*\*mouseout\*\*: [`MapMouseEvent`]()
Defined in: [ui/events.ts:335]()
Fired when a point device (usually a mouse) leaves the map's canvas.
---
### mouseover
> \*\*mouseover\*\*: [`MapMouseEvent`]()
Defined in: [ui/events.ts:345]()
Fired when a pointing device (usually a mouse) is moved within the map. As you move the cursor across a web page containing a map, the event will fire each time it enters the map or any child elements.
#### See
- [Get coordinates of the mouse pointer]()
- [Highlight features under the mouse pointer]()
- [Display a popup on hover]()
---
### mouseup
> \*\*mouseup\*\*: [`MapMouseEvent`]()
Defined in: [ui/events.ts:325]()
Fired when a pointing device (usually a mouse) is released within the map.
#### See
[Create a draggable point]()
---
### move
> \*\*move\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:358]()
Fired repeatedly during an animated transition from one view to another, as the result of either user interaction or methods such as [Map.flyTo]().
#### See
[Display HTML clusters with custom properties]()
---
### moveend
> \*\*moveend\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:365]()
Fired just after the map completes a transition from one view to another, as the result of either user interaction or methods such as [Map.jumpTo]().
#### See
[Display HTML clusters with custom properties]()
---
### movestart
> \*\*movestart\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:351]()
Fired just before the map begins a transition from one view to another, as the result of either user interaction or methods such as [Map.jumpTo]().
---
### pitch
> \*\*pitch\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:416]()
Fired repeatedly during the map's pitch (tilt) animation between one state and another as the result of either user interaction or methods such as [Map.flyTo]().
---
### pitchend
> \*\*pitchend\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:421]()
Fired immediately after the map's pitch (tilt) finishes changing as the result of either user interaction or methods such as [Map.flyTo]().
---
### pitchstart
> \*\*pitchstart\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:410]()
Fired whenever the map's pitch (tilt) begins a change as the result of either user interaction or methods such as [Map.flyTo]() .
---
### projectiontransition
> \*\*projectiontransition\*\*: [`MapProjectionEvent`]()
Defined in: [ui/events.ts:456]()
Fired when map's projection is modified in other ways than by map being moved.
---
### remove
> \*\*remove\*\*: [`MapLibreEvent`]()
Defined in: [ui/events.ts:181]()
Fired immediately after the map has been removed with [Map.remove]().
---
### render
> \*\*render\*\*: [`MapLibreEvent`]()
Defined in: [ui/events.ts:190]()
Fired whenever the map is drawn to the screen, as the result of
- a change to the map's position, zoom, pitch, or bearing
- a change to the map's style
- a change to a GeoJSON source
- the loading of a vector tile, GeoJSON file, glyph, or sprite
---
### resize
> \*\*resize\*\*: [`MapLibreEvent`]()
Defined in: [ui/events.ts:194]()
Fired immediately after the map has been resized.
---
### roll
> \*\*roll\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:432]()
Fired repeatedly during the map's roll animation between one state and another as the result of either user interaction or methods such as [Map.flyTo]().
---
### rollend
> \*\*rollend\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:437]()
Fired immediately after the map's roll finishes changing as the result of either user interaction or methods such as [Map.flyTo]().
---
### rollstart
> \*\*rollstart\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:426]()
Fired whenever the map's roll begins a change as the result of either user interaction or methods such as [Map.flyTo]().
---
### rotate
> \*\*rotate\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:388]()
Fired repeatedly during a "drag to rotate" interaction. See [DragRotateHandler]().
---
### rotateend
> \*\*rotateend\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:392]()
Fired when a "drag to rotate" interaction ends. See [DragRotateHandler]().
---
### rotatestart
> \*\*rotatestart\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:384]()
Fired when a "drag to rotate" interaction starts. See [DragRotateHandler]().
---
### sourcedata
> \*\*sourcedata\*\*: [`MapSourceDataEvent`]()
Defined in: [ui/events.ts:236]()
Fired when one of the map's sources loads or changes, including if a tile belonging to a source loads or changes.
---
### sourcedataabort
> \*\*sourcedataabort\*\*: [`MapSourceDataEvent`]()
Defined in: [ui/events.ts:260]()
Fired when a request for one of the map's sources' data is aborted.
---
### sourcedataloading
> \*\*sourcedataloading\*\*: [`MapSourceDataEvent`]()
Defined in: [ui/events.ts:225]()
Fired when one of the map's sources begins loading or changing asynchronously. All `sourcedataloading` events are followed by a `sourcedata`, `sourcedataabort` or `error` event.
---
### style.load
> \*\*style.load\*\*: [`MapStyleLoadEvent`]()
Defined in: [ui/events.ts:245]()
Fired once the map's style has fully loaded or changed, after all necessary resources referenced by the style have been requested.
---
### styledata
> \*\*styledata\*\*: [`MapStyleDataEvent`]()
Defined in: [ui/events.ts:240]()
Fired when the map's style loads or changes.
---
### styledataloading
> \*\*styledataloading\*\*: [`MapStyleDataEvent`]()
Defined in: [ui/events.ts:231]()
Fired when the map's style begins loading or changing asynchronously. All `styledataloading` events are followed by a `styledata` or `error` event.
---
### styleimagemissing
> \*\*styleimagemissing\*\*: [`MapStyleImageMissingEvent`]()
Defined in: [ui/events.ts:252]()
Fired when an icon or pattern needed by the style is missing and no missing style image resolver supplies it. To load or generate images on demand, use [Map.setMissingStyleImageResolver](). Event listeners cannot resolve the missing image for the current request.
#### See
[Generate and add a missing icon to the map]()
---
### terrain
> \*\*terrain\*\*: [`MapTerrainEvent`]()
Defined in: [ui/events.ts:445]()
Fired when terrain is changed
---
### touchcancel
> \*\*touchcancel\*\*: [`MapTouchEvent`]()
Defined in: [ui/events.ts:277]()
Fired when a [`touchcancel`]() event occurs within the map.
---
### touchend
> \*\*touchend\*\*: [`MapTouchEvent`]()
Defined in: [ui/events.ts:287]()
Fired when a [`touchend`]() event occurs within the map.
#### See
[Create a draggable point]()
---
### touchmove
> \*\*touchmove\*\*: [`MapTouchEvent`]()
Defined in: [ui/events.ts:282]()
Fired when a [`touchmove`]() event occurs within the map.
#### See
[Create a draggable point]()
---
### touchstart
> \*\*touchstart\*\*: [`MapTouchEvent`]()
Defined in: [ui/events.ts:292]()
Fired when a [`touchstart`]() event occurs within the map.
#### See
[Create a draggable point]()
---
### webglcontextlost
> \*\*webglcontextlost\*\*: [`MapContextEvent`]()
Defined in: [ui/events.ts:202]()
Fired when the WebGL context is lost.
The map rebuilds its style once the context is restored. Until the rebuilt style fires `style.load`, [Map.getSource]() may return `undefined` and changes to sources or layers are not kept, so apply them again on that `style.load` event.
---
### webglcontextrestored
> \*\*webglcontextrestored\*\*: [`MapContextEvent`]()
Defined in: [ui/events.ts:209]()
Fired when the WebGL context is restored.
The style is rebuilt asynchronously, so its sources and layers are not available yet when this fires. Wait for the next `style.load` event before using them.
---
### wheel
> \*\*wheel\*\*: [`MapWheelEvent`]()
Defined in: [ui/events.ts:441]()
Fired when a [`wheel`]() event occurs within the map.
---
### zoom
> \*\*zoom\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:375]()
Fired repeatedly during an animated transition from one zoom level to another, as the result of either user interaction or methods such as [Map.flyTo]().
---
### zoomend
> \*\*zoomend\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:380]()
Fired just after the map completes a transition from one zoom level to another, as the result of either user interaction or methods such as [Map.flyTo]().
---
### zoomstart
> \*\*zoomstart\*\*: [`MapMovementEvent`]()
Defined in: [ui/events.ts:370]()
Fired just before the map begins a transition from one zoom level to another, as the result of either user interaction or methods such as [Map.flyTo]().
