<!-- source: https://www.leaferjs.com/ui/en/reference/UI/hitFill.html -->

# hitFill 

Further defines the interactivity of an element’s fill.

## Key Property 

### hitFill: `IHitType` 

The hit detection type for `fill`. Defaults to `path`.

Setting it to `pixel` enables pixel-level hit detection for PNG / SVG images, filtering out transparent pixels.

ts

```
type IHitType =
  | 'path' // Hit only the visible fill path shape
  | 'pixel' // Pixel-level hit detection on visible fill (excludes transparent pixels in PNG/SVG images)
  | 'all' // Always hit fill, even if not visible
  | 'none' // Never hit fill
```

## Belongs to 

### UI Element 

## Example 

### Invisible fill can still respond to interactions 

Try dragging the rectangle.

LeaferApp

ts

```
// #交互功能 [不可见的 fill 也能响应交互 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    stroke: {
        type: 'linear',
        stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }]
    },
    strokeWidth: 10,
    draggable: true,
    hitFill: 'all' // [!code hl] // 不可见的 fill 也能响应交互
})

leafer.add(rect)
```

ts

```
// #交互功能 [不可见的 fill 也能响应交互 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    stroke: {
        type: 'linear',
        stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }]
    },
    strokeWidth: 10,
    draggable: true,
    hitFill: 'all' // [!code hl] // 不可见的 fill 也能响应交互
})

app.tree.add(rect)
```
