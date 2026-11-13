<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapLayerEventType/index.md -->

# MapLayerEventType
> \*\*MapLayerEventType\*\* = `object`
Defined in: [ui/events.ts:51]()
`MapLayerEventType` - a mapping between the event name and the event.
> [!NOTE]
>
> These events are compatible with the optional `layerId` parameter.
If `layerId` is included as the second argument in [Map.on](), the event listener will fire only when the event action contains a visible portion of the specified layer. The following example can be used for all the events.
## Example
```ts
// Initialize the map
let map = new Map({ // map options });
// Set an event listener for a specific layer
map.on('the-event-name', 'poi-label', (e) => {
console.log('An event has occurred on a visible portion of the poi-label layer');
});
```
## Properties
### click
> \*\*click\*\*: [`MapLayerMouseEvent`]()
Defined in: [ui/events.ts:58]()
Fired when a pointing device (usually a mouse) is pressed and released contains a visible portion of the specified layer.
#### See
- [Measure distances]()
- [Center the map on a clicked symbol]()
---
### contextmenu
> \*\*contextmenu\*\*: [`MapLayerMouseEvent`]()
Defined in: [ui/events.ts:117]()
Fired when the right button of the mouse is clicked or the context menu key is pressed within visible portion of the specified layer.
---
### dblclick
> \*\*dblclick\*\*: [`MapLayerMouseEvent`]()
Defined in: [ui/events.ts:65]()
Fired when a pointing device (usually a mouse) is pressed and released twice contains a visible portion of the specified layer.
> [!NOTE]
>
> Under normal conditions, this event will be preceded by two `click` events.
---
### mousedown
> \*\*mousedown\*\*: [`MapLayerMouseEvent`]()
Defined in: [ui/events.ts:70]()
Fired when a pointing device (usually a mouse) is pressed while inside a visible portion of the specified layer.
#### See
[Create a draggable point]()
---
### mouseenter
> \*\*mouseenter\*\*: [`MapLayerMouseEvent`]()
Defined in: [ui/events.ts:93]()
Fired when a pointing device (usually a mouse) enters a visible portion of a specified layer from outside that layer or outside the map canvas.
#### See
- [Center the map on a clicked symbol]()
- [Display a popup on click]()
---
### mouseleave
> \*\*mouseleave\*\*: [`MapLayerMouseEvent`]()
Defined in: [ui/events.ts:101]()
Fired when a pointing device (usually a mouse) leaves a visible portion of a specified layer, or leaves the map canvas.
#### See
- [Highlight features under the mouse pointer]()
- [Display a popup on click]()
---
### mousemove
> \*\*mousemove\*\*: [`MapLayerMouseEvent`]()
Defined in: [ui/events.ts:85]()
Fired when a pointing device (usually a mouse) is moved while the cursor is inside a visible portion of the specified layer. As you move the cursor across the layer, the event will fire every time the cursor changes position within that layer.
#### See
- [Get coordinates of the mouse pointer]()
- [Highlight features under the mouse pointer]()
- [Display a popup on over]()
- [Animate symbol to follow the mouse]()
---
### mouseout
> \*\*mouseout\*\*: [`MapLayerMouseEvent`]()
Defined in: [ui/events.ts:113]()
Fired when a point device (usually a mouse) leaves the visible portion of the specified layer.
---
### mouseover
> \*\*mouseover\*\*: [`MapLayerMouseEvent`]()
Defined in: [ui/events.ts:109]()
Fired when a pointing device (usually a mouse) is moved inside a visible portion of the specified layer.
#### See
- [Get coordinates of the mouse pointer]()
- [Highlight features under the mouse pointer]()
- [Display a popup on hover]()
---
### mouseup
> \*\*mouseup\*\*: [`MapLayerMouseEvent`]()
Defined in: [ui/events.ts:75]()
Fired when a pointing device (usually a mouse) is released while inside a visible portion of the specified layer.
#### See
[Create a draggable point]()
---
### touchcancel
> \*\*touchcancel\*\*: [`MapLayerTouchEvent`]()
Defined in: [ui/events.ts:132]()
Fired when a [`touchstart`]() event occurs within the visible portion of the specified layer.
#### See
[Create a draggable point]()
---
### touchend
> \*\*touchend\*\*: [`MapLayerTouchEvent`]()
Defined in: [ui/events.ts:127]()
Fired when a [`touchend`]() event occurs within the visible portion of the specified layer.
#### See
[Create a draggable point]()
---
### touchstart
> \*\*touchstart\*\*: [`MapLayerTouchEvent`]()
Defined in: [ui/events.ts:122]()
Fired when a [`touchstart`]() event occurs within the visible portion of the specified layer.
#### See
[Create a draggable point]()
