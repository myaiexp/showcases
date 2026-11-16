<!-- source: https://www.leaferjs.com/ui/en/reference/display/Canvas.html -->

# Canvas Element 

Canvas object. It allows free drawing, pixel manipulation, or directly rendering other graphics onto the Canvas.

  

Inheritance

Canvas  >  Rect  >  UI

## Key Properties 

### width: `number` 

Canvas height.

### height: `number` 

Canvas width.

### pixelRatio: `number` 

Canvas resolution. Defaults to `1`.

### smooth: `boolean` 

Whether image rendering is smooth. Defaults to `true`.

### safeResize: `boolean` 

Whether to preserve previous content when resizing the canvas (may slightly reduce performance). Defaults to `false`.

### contextSettings: `ICanvasRenderingContext2DSettings` 

Native canvas context settings. Learn more.

ts

```
canvas.getContext('2d', settings)

interface ICanvasRenderingContext2DSettings {
  alpha?: boolean // whether canvas includes alpha channel, defaults to false
  colorSpace?: 'display-p3' | 'srgb' // color space, defaults to srgb
  desynchronized?: boolean // low-latency rendering, defaults to false
  willReadFrequently?: boolean // optimization for getImageData(), defaults to false
}
```

## Readonly Properties 

### ready: `boolean` 

Whether canvas import has completed.

### canvas: `ILeaferCanvas` 

Cross-platform canvas wrapper object.

### context: `ICanvasContext2D` 

Cross-platform `2D` context object, consistent with HTML CanvasRenderingContext2D API.

## Key Methods 

### draw ( ) 

draw(ui: `UI` | `Group`, offset?: `IPointData`, scale?: `number` | `IPointData`, rotation?: `number`)

Draws graphical elements.

Uses the element’s inner coordinate system as the base. Currently only supports `2D` canvas.

### paint ( ) 

Renders the canvas.

Content drawn via `context` must call this method to be rendered.

## JSON 

Export JSON: converts canvas data into a base64 URL attribute.

Import JSON: restores the canvas by asynchronously loading an image via the URL attribute. You can listen to ImageEvent.LOADED.

## Inheritance 

### Canvas  >  Rect  >  UI 

## Examples 

### Using context drawing 

LeaferApp

ts

```
// #创建 Canvas [使用 context 绘制 (Leafer)]
import { Leafer, Canvas } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const canvas = new Canvas({ width: 800, height: 600 }) 
const { context } = canvas

context.fillStyle = '#FF4B4B'
context.beginPath()
context.roundRect(0, 0, 100, 100, 30)
context.arc(50, 50, 25, 0, Math.PI * 2)
context.fill('evenodd')

context.fillStyle = '#FEB027'
context.beginPath()
context.arc(50, 50, 20, 0, Math.PI * 2)
context.fill()

canvas.paint() // 更新渲染

leafer.add(canvas)
```

ts

```
// #创建 Canvas [使用 context 绘制 (App)]
import { App, Canvas } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const canvas = new Canvas({ width: 800, height: 600 }) 
const { context } = canvas

context.fillStyle = '#FF4B4B'
context.beginPath()
context.roundRect(0, 0, 100, 100, 30)
context.arc(50, 50, 25, 0, Math.PI * 2)
context.fill('evenodd')

context.fillStyle = '#FEB027'
context.beginPath()
context.arc(50, 50, 20, 0, Math.PI * 2)
context.fill()

canvas.paint() // 更新渲染

app.tree.add(canvas)
```

### Using graphic elements drawing 

LeaferApp

ts

```
// #创建 Canvas [使用图形元素绘制 (Leafer)]
import { Leafer, Canvas, Pen } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const canvas = new Canvas({ width: 800, height: 600 })
leafer.add(canvas)

const pen = new Pen()

pen.setStyle({ fill: { type: 'radial', stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }] } })
pen.roundRect(0, 0, 100, 100, 30)

pen.setStyle({ y: -5, fill: 'white' })
pen.moveTo(40, 30).bezierCurveTo(70, 30, 90, 60, 63, 80).quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30)

canvas.draw(pen)
```

ts

```
// #创建 Canvas [使用图形元素绘制 (App)]
import { App, Canvas, Pen } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const canvas = new Canvas({ width: 800, height: 600 })
app.tree.add(canvas)

const pen = new Pen()

pen.setStyle({ fill: { type: 'radial', stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }] } })
pen.roundRect(0, 0, 100, 100, 30)

pen.setStyle({ y: -5, fill: 'white' })
pen.moveTo(40, 30).bezierCurveTo(70, 30, 90, 60, 63, 80).quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30)

canvas.draw(pen)
```
