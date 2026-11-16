<!-- source: https://www.leaferjs.com/ui/en/reference/config/app/canvas.html -->

# Application & Engine Configuration 

### Basic     Viewport Type     Canvas     Pointer     Multi-touch     Touch     Wheel     Pan View     Zoom View 

## 

Configuration related to canvas creation during engine initialization.

Note

In the App structure, these settings can only be applied to the config of the App instance.

## Key Properties 

### view: `object` | `string` 

The view container where the engine is mounted.

Supports `window`, `div`, or `canvas` DOM elements. Note that when using an ID string, do not include the `#` symbol.

### shadowDOM: `boolean` 

Whether to use Shadow DOM, used for micro-frontend environments.

### width: `number` 

Canvas width.

### height: `number` 

Canvas height.

### pixelRatio: `number` 

Canvas pixel ratio. By default, it uses the device pixel ratio (1 for standard screens, 2 for HD, 3 for ultra-HD).

### fill: `string` 

Background color.

### hittable: `boolean` 

Whether the canvas responds to hit testing (interaction events).

### smooth: `boolean` 

Whether to render images and canvas elements smoothly. This may introduce slight blurring, but generally produces more natural visuals and avoids aliasing.

To prevent image blurring, you can also configure the config.pixelSnap property.

ts

```
// To make smooth take effect in real time, you also need to update canvas smooth
leafer.canvas.smooth = true
// app.tree.canvas.smooth = true

leafer.forceRender() // Force a full canvas re-render if needed
```

### contextSettings: `ICanvasRenderingContext2DSettings` 

Native canvas context settings. Learn more.

ts

```
canvas.getContext('2d', settings)

interface ICanvasRenderingContext2DSettings {
  alpha?: boolean // whether canvas contains alpha channel, default false
  colorSpace?: 'display-p3' | 'srgb' // color space, default srgb
  desynchronized?: boolean // low-latency rendering, default false
  willReadFrequently?: boolean // optimize getImageData(), default false
}
```

## Responsive Layout 

When `width` or `height` is not specified, the canvas will automatically adapt its layout.

### top: `number` 

Distance from the top, default is 0.

### left: `number` 

Distance from the left, default is 0.

### right: `number` 

Distance from the right, default is 0.

### bottom: `number` 

Distance from the bottom, default is 0.

## Auto Growth 

### grow: `boolean` | `'box'` | `'render'` 

Whether the canvas automatically grows to fit content. Default is `false`.

Note

This feature is not supported in the App structure.

* `true` or `'render'`: resize based on the render bounding box of content
* `'box'`: resize based on the box bounding box of content

### growWidth: `boolean` 

Controls whether width grows independently. Defaults to the same as `grow`.

### growHeight: `boolean` 

Controls whether height grows independently. Defaults to the same as `grow`.

## Example 

### Disable interaction events 

LeaferApp

ts

```
// #应用与引擎配置 - 关闭交互事件 [Leafer]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({
    view: window,
    hittable: false
})

leafer.add(Rect.one({ fill: '#32cd79', draggable: true }, 100, 100))
```

ts

```
// #应用与引擎配置 - 关闭交互事件 [App]
import { App, Rect } from 'leafer-ui'

const app = new App({
    view: window,
    tree: {},
    hittable: false
})

app.tree.add(Rect.one({ fill: '#32cd79', draggable: true }, 100, 100))
```
