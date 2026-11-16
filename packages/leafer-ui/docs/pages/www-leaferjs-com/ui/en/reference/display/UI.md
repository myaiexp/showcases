<!-- source: https://www.leaferjs.com/ui/en/reference/display/UI.html -->

# UI Element 

The base element (root class of all elements), exposing all common properties and methods shared by every UI component.

In addition to the API list, we also provide a simple categorization system to help you quickly understand the structure of the API.

## 📃 API 

### All Properties 

| Name | Description |
| --- | --- |
| **Identity** |  |
| id | Unique element id |
| tag | Element tag name (class name of the element) |
| name | Element name |
| className | Category name, currently supports only one value |
| innerId | Runtime-generated temporary id (incremental), not for persistent storage |
| innerName | Runtime-generated temporary name for quick element identification |
| **Layout** |  |
| x | X-axis position |
| y | Y-axis position |
| position | Positions an element relative to its parent using directional alignment or edge offsets. Requires the position plugin to be installed. |
| width | Width |
| height | Height |
| isAutoWidth | Whether width is auto-calculated |
| isAutoHeight | Whether height is auto-calculated |
| lockRatio | Lock aspect ratio (requires resize plugin) |
| scaleX | X-axis scale (negative = mirror X) |
| scaleY | Y-axis scale (negative = mirror Y) |
| scaleFixed | Fixed global scale (not affected by zoom) |
| scale | Get/set scaleX and scaleY together |
| rotation | Rotation angle (see Math rotation) |
| skewX | X-axis skew angle |
| skewY | Y-axis skew angle |
| offsetX | X-axis offset |
| offsetY | Y-axis offset |
| origin | Transform origin (same as CSS transform-origin) |
| around | Anchor-based positioning (similar to game engine anchors) |
| **Bounds** |  |
| boxBounds | Basic bounds in inner coordinate system (OBB) |
| renderBounds | Render bounds in inner coordinate system (AABB) |
| worldBoxBounds | Basic bounds in world coordinates (AABB) |
| worldRenderBounds | Render bounds in world coordinates (AABB) |
| renderSpread | Expands render bounds to prevent rendering artifacts (e.g. text glitches) |
| **Transform** |  |
| worldTransform | World transformation matrix (includes scale) |
| localTransform | Local transformation matrix relative to parent |
| **Appearance** |  |
| zIndex | Stacking order within parent |
| opacity | Opacity |
| worldOpacity | Global opacity (affected by parent) |
| visible | Visibility toggle |
| fill | Fill color/style (supports solid, gradient, image, etc.) |
| stroke | Stroke style (supports multiple types and stacking) |
| strokeAlign | Stroke alignment |
| strokeWidth | Stroke width |
| strokeScaleFixed | Fix stroke width during zoom |
| strokeCap | Stroke line cap style |
| strokeJoin | Stroke join style |
| dashPattern | Dashed line pattern |
| dashOffset | Dash offset |
| shadow | Outer shadow (supports multiple shadows) |
| innerShadow | Inner shadow (supports multiple shadows) |
| dim | Dim effect (requires bright plugin) |
| dimskip | Skip dimming (highlight element) |
| bright | Highlight and bring element to front |
| mask | Set element as mask |
| eraser | Set element as eraser |
| blendMode | Blend mode |
| **Interaction** |  |
| hittable | Whether element responds to pointer events |
| hitChildren | Control child hit behavior |
| hitSelf | Control self hit behavior |
| hitFill | Hit detection for fill (supports pixel-level detection) |
| hitStroke | Hit detection for stroke |
| editable | Enable editing (requires editor plugin) |
| draggable | Enable dragging |
| dragBounds | Drag constraint area |
| dragBoundsType | Drag constraint type |
| cursor | Cursor style on hover (CSS cursor supported) |
| **State** |  |
| states | Predefined states (requires state plugin) |
| state | Current state |
| button | Enable button behavior (auto sync states) |
| hoverStyle | Hover style |
| pressStyle | Press style |
| focusStyle | Focus style |
| selected | Selected state |
| selectedStyle | Selected style |
| disabled | Disabled state |
| disabledStyle | Disabled style |
| **Animation** |  |
| animation | Animation system (timeline, keyframes, etc.) |
| transition | Enter transition |
| transitionOut | Exit transition |
| motionPath | Motion path |
| motionPrecision | Motion sampling precision |
| motion | Position on motion path |
| motionRotation | Rotation offset along motion path |
| **Relation** |  |
| parent | Parent element |
| leafer | Leafer engine instance |
| app | App instance (root) |
| isLeafer | Whether element is Leafer root |
| leaferIsCreated | Engine creation completed |
| leaferIsReady | Engine ready (first layout done) |
| zoomLayer | Zoom/pan layer |
| **Data** |  |
| data | User-defined data object |
| \_\_ | Internal data instance |
| proxyData | Reactive proxy for frameworks |
| path | Path data (SVG/Canvas commands supported) |

### All Methods 

| Name | Description |
| --- | --- |
| Layout |  |
| move() | Translate the element incremental operation, supports optional animation transition |
| moveInner() | Move the element in the inner coordinate system incremental operation, supports optional animation transition |
| moveWorld() | Move the element in the world coordinate system incremental operation, supports optional animation transition |
| resizeWidth() | Resize the width of an element/group bounding box, requires resize plugin |
| resizeHeight() | Resize the height of an element/group bounding box, requires resize plugin |
| scaleResize() | Convert scale operation into width/height changes incremental operation, requires resize plugin |
| scaleOf() | Scale the element around the origin ( box coordinates ) incremental operation, supports optional animation transition |
| scaleOfWorld() | Scale the element around the world origin ( world coordinates ) incremental operation, supports optional animation transition |
| flip() | Flip/mirror the element in the world coordinate system, supports optional animation transition |
| rotateOf() | Rotate the element around the origin ( box coordinates ) incremental operation, supports optional animation transition |
| rotateOfWorld() | Rotate the element around the world origin ( world coordinates ) incremental operation, supports optional animation transition |
| skewOf() | Skew the element around the origin ( box coordinates ) incremental operation, supports optional animation transition |
| skewOfWorld() | Skew the element around the world origin ( world coordinates ) incremental operation, supports optional animation transition |
| Bounds |  |
| getBounds() | Get the AABB bounding box |
| getLayoutBounds() | Get the OBB bounding box, including scale/rotation/layout transforms |
| getLayoutPoints() | Get the four corner points of the OBB bounding box |
| Transform |  |
| setTransform() | Set local transform matrix, automatically decomposed into layout properties, supports optional animation transition |
| getTransform() | Get transform matrix, supports relative matrices to any parent via `relative` |
| transform() | Apply transform operation and decompose into layout properties incremental operation, supports optional animation transition |
| transformWorld() | Same as transform(), but in world coordinate system, supports optional animation transition |
| Coordinate Conversion |  |
| getPagePoint() | Convert world coordinates to page coordinates (supports delta movement) |
| getLocalPoint() | Convert world coordinates to local coordinates (supports delta movement) |
| getInnerPoint() | Convert world coordinates to inner coordinates (supports delta movement) |
| getBoxPoint() | Convert world coordinates to box coordinates (supports delta movement) |
| getWorldPointByPage() | Convert page coordinates to world coordinates (supports delta movement) |
| getWorldPointByLocal() | Convert local coordinates to world coordinates (supports delta movement) |
| getInnerPointByLocal() | Convert local coordinates to inner coordinates (supports delta movement) |
| getWorldPoint() | Convert inner coordinates to world coordinates (supports delta movement) |
| getLocalPointByInner() | Convert inner coordinates to local coordinates (supports delta movement) |
| getBoxPointByInner() | Convert inner coordinates to box coordinates (supports delta movement) |
| getWorldPointByBox() | Convert box coordinates to world coordinates (supports delta movement) |
| getInnerPointByBox() | Convert box coordinates to inner coordinates (supports delta movement) |
| Actions |  |
| dropTo() | Drag and drop the element into another parent container |
| focus() | Focus the element. Only one element can be focused per App. Requires state plugin |
| Animation |  |
| animate() | Run animation and return an animation instance, requires animation plugin |
| getMotionTotal() | Get total length of motion path, requires motion path plugin |
| getMotionPoint() | Get a point on the motion path (includes rotation), requires motion path plugin |
| Events |  |
| on() | Listen to events |
| on\_() | Listen to events with bound `this`, returns event id (used with `off_()`) |
| once() | Listen to event once |
| off() | Remove event listener |
| off\_() | Remove event listener (paired with `on_()`) |
| emit() | Manually dispatch event |
| emitEvent() | Manually dispatch event (must be IEvent object) |
| Update |  |
| forceUpdate() | Force update element (async), updates layout and rendering |
| updateLayout() | Request layout update; ignored if no changes |
| forceRender() | Force render only (async), does not update layout |
| nextRender() | Execute callback on next render frame |
| removeNextRender() | Remove next render callback |
| Search |  |
| find() | Find elements by id/innerId/className/tag/function condition, returns array, requires find plugin |
| findTag() | Find elements by tag |
| findOne() | Find single element by id/innerId/className/tag/function, requires find plugin |
| findId() | Find element by id |
| pick() | Pick element by world coordinate point |
| Relation |  |
| waitParent() | Wait until element has a parent |
| waitLeafer() | Wait until element has a Leafer instance |
| Data |  |
| set() | Set element style with optional animation transition |
| reset() | Reset element style |
| get() | Get stored attribute data |
| setAttr() | Set attribute value |
| getAttr() | Get attribute value |
| getComputedAttr() | Get computed attribute value |
| clone() | Clone element, optionally with new styles |
| Path |  |
| getPath() | Get numeric path (Canvas drawing commands) |
| getPathString() | Get string path (Canvas commands, including non-SVG commands) |
| Export |  |
| export() | Async export element as image/json/canvas, supports screenshot/slicing, requires export plugin |
| syncExport() | Sync export element |
| toJSON() | Export JSON object |
| toString() | Export JSON string |
| Remove |  |
| remove() | Remove current element |
| destroy() | Destroy current element |

### Static Methods 

| Name | Description |
| --- | --- |
| changeAttr() | Modify default attribute values globally |
| addAttr() | Add new attributes globally |

## 

# Classification 

We also provide a simple classification system to help you quickly understand the structure of the API, as shown below:

## 🎞️ Data 

### id / name 

id     tag     name     className     innerId     innerName

### parent / leafer 

parent     leafer

### Data / Clone 

data     proxyData     clone()

### Path data 

getPath()     getPathString()     path

### Import / Export 

export()     toJSON()     toString

### Remove / Destroy 

remove()     destroy()

## 📐 Layout 

### Position / Scale / Rotation 

position     size     scale     flip()     rotation     skew

### Offset / resize 

offset     resize

### Pivot / Center 

origin     around

### Bounds / Transform 

bounds     transform

### Coordinate conversion 

Coordinate conversion     Fast conversion

### Layering / Placement 

zIndex     dropTo()

## 🏼 Appearance 

### Opacity / Visibility 

opacity     visible

### Fill / Stroke 

fill     stroke

### Gradients / Images 

linear     radial     angular     solid     image

### Inner / Outer Shadow 

shadow     innerShadow

### Dim / Highlight 

dim     bright

### Clip / Erase 

clip     mask     eraser

### Blend mode 

blendMode

## 🖱 Interaction 

### Interactivity 

hittable     hitChildren     hitSelf     hitFill     hitStroke

### Edit / Drag 

editable     draggable

### Cursor style 

cursor

### Interaction states 

state     hover     press     focus     selected     disabled

### Event handling 

on() / once()     off()     emit()     Naming     Capture / Bubble     Simulated interaction

## 🐆 Animation 

### Animation 

animation     animate()

### Transition 

transition

### Motion path 

motionPath     motion     getMotionTotal()     getMotionPoint()

## 🌴 Advanced 

### Drag constraints 

dragBounds

### Force rendering 

forceUpdate()     updateLayout()     forceRender()     nextRender()

### Search / Picking 

find()     findOne()     pick()

### Custom properties 

changeAttr()     addAttr()
