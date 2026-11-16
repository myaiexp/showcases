<!-- source: https://www.leaferjs.com/ui/en/reference/UI/hitStroke.html -->

# hitStroke 

Further defines the interactivity of an element’s stroke.

## Key Property 

### hitStroke: `IHitType` 

The hit detection type for `stroke`. Defaults to `path`.

Setting it to `pixel` enables pixel-level hit detection for PNG / SVG images, filtering out transparent pixels.

ts

```
type IHitType =
  | 'path' // Hit only the visible stroke path shape
  | 'pixel' // Pixel-level hit detection on visible stroke (excludes transparent pixels in PNG/SVG images)
  | 'all' // Always hit stroke, even if not visible
  | 'none' // Never hit stroke
```

## Belongs to 

### UI Element 

## Example 

### Only stroke responds to interactions 

Try dragging the rectangle.

LeaferApp

ts

```
// #交互功能 [只有 stroke 能响应交互 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#FEB02730',
    stroke: {
        type: "radial",
        stops: [{ offset: 0, color: '#FF4A2C' }, { offset: 1, color: '#FEB027' }]
    },
    strokeWidth: 10,
    draggable: true,
    hitFill: 'none' // [!code hl] // 只有 stroke 能响应交互
})

leafer.add(rect)
```

ts

```
// #交互功能 [只有 stroke 能响应交互 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#FEB02730',
    stroke: {
        type: "radial",
        stops: [{ offset: 0, color: '#FF4A2C' }, { offset: 1, color: '#FEB027' }]
    },
    strokeWidth: 10,
    draggable: true,
    hitFill: 'none' // [!code hl] // 只有 stroke 能响应交互
})

app.tree.add(rect)
```
