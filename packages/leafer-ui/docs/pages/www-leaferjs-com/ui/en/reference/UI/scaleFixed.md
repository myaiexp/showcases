<!-- source: https://www.leaferjs.com/ui/en/reference/UI/scaleFixed.html -->

# scaleFixed 

Fixes the global scale of an element so it does not scale with the viewport zoom.

Note

The scale-fixed plugin is required, or you can use leafer-editor which already includes this plugin.

## Key Property 

### scaleFixed: `'zoom-in'` | `number` | `false` 

Controls whether the element’s global scale is fixed. Defaults to `false`.

Setting `'zoom-in'` or `1` means the element will not scale up when the viewport zooms in, but will still scale down when zooming out (to prevent elements from clustering).

When set to a value between `0` and `1`, the element will only start scaling down after the viewport zoom level drops below that threshold.

TIP

This can be used together with the around property for positioning. If you only want to fix stroke width, use strokeScaleFixed instead.

## Belongs to 

### UI Element 

## Example 

### Element does not scale with zoom-in 

LeaferApp

ts

```
// #scaleFixed [元素不随画面放大 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
leafer.add(Rect.one({
    scaleFixed: 'zoom-in', // 元素不随画面放大，但会跟随缩小
    editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0]
}, 300, 100))

setTimeout(() => {

    leafer.scale = 2 // 画面放大2倍

}, 1000)
```

ts

```
// #scaleFixed [元素不随画面放大 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const app = new App({ view: window, editor: {} })

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({
    scaleFixed: 'zoom-in', // 元素不随画面放大，但会跟随缩小
    editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0]
}, 300, 100))

setTimeout(() => {

    app.tree.scale = 2 // 画面放大2倍

}, 1000)
```

### Start scaling only when canvas zoom reaches 0.5 

LeaferApp

ts

```
// #scaleFixed [画布缩放到0.5时才跟随缩小 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
leafer.add(Rect.one({
    scaleFixed: 0.5, // 画布缩放到0.5时，才跟随缩小
    editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0]
}, 300, 100))

setTimeout(() => {

    leafer.scale = 0.5 // 画面缩小到0.5倍

}, 1000)
```

ts

```
// #scaleFixed [画布缩放到0.5时才跟随缩小 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const app = new App({ view: window, editor: {} })

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({
    scaleFixed: 0.5, // 画布缩放到0.5时，才跟随缩小
    editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0]
}, 300, 100))

setTimeout(() => {

    app.tree.scale = 0.5 // 画面缩小到0.5倍

}, 1000)
```
