<!-- source: https://www.leaferjs.com/ui/en/reference/UI/hit.html -->

# hittable 

Whether the element responds to mouse, touch, or other pointer device interactions, similar to the CSS `pointer-events` property.

You can set the default pointer collision radius in the engine configuration, or set it individually per element using hitRadius.

## Key Property 

### hittable: `boolean` 

Whether the element responds to interaction events. Defaults to `true`.

This can be further refined using hitChildren, hitSelf, hitFill, and hitStroke. Note that hitFill supports pixel-level hit detection.

## Auxiliary Properties 

### hitBox: `boolean` 

Whether the element's boxBounds area always responds to interaction events (including transparent pixels). Defaults to `false`.

It is typically used for Text elements with padding. Group does not support this property.

### hitRadius: `number` 

Sets the collision radius for the pointer. When the pointer is within the `hitRadius` range of the element, the engine can prioritize picking the element.

### hitThrough?: `IHitThrough` 

Defines the scope within which an element can be picked through other overlapping elements. By default, it is `undefined`, meaning the element cannot be picked through.

ts

```
type IHitThrough =
  | 'parent' // Pick-through is enabled within the same parent
  | 'leafer' // Pick-through is enabled within the same Leafer layer
  | 'app' // Pick-through is enabled throughout the entire app
```

## Key Method 

### hit ( worldPoint: `IPointData`, hitRadius: `number` = 0 ): `boolean` 

Quickly checks whether a world coordinate point (world coordinate system) collides with the element. Supports specifying a collision radius via `hitRadius`.

## Belongs to 

### UI Element 

## Example 

### Disable interaction for an element 

LeaferApp

ts

```
// #停用元素交互事件 (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79', draggable: true })

leafer.add(rect)

setTimeout(() => {

    // 停用元素交互事件，将无法拖拽元素
    rect.hittable = false

}, 1000)
```

ts

```
// #停用元素交互事件 (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79', draggable: true })

app.tree.add(rect)

setTimeout(() => {

    // 停用元素交互事件，将无法拖拽元素
    rect.hittable = false

}, 1000)
```
