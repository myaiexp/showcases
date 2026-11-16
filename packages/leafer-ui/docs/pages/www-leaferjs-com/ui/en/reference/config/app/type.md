<!-- source: https://www.leaferjs.com/ui/en/reference/config/app/type.html -->

# Application and Engine Configuration 

### Basics     Viewport Type     Canvas     Pointer     Multi-touch     Touch     Wheel     Panning View     Zoom View 

## 

Initialize viewport type. It cannot be changed during runtime.

Note

Under the App structure, this must be configured on the config of a child Leafer layer (e.g. ground, tree, sky layers).

## Key Properties 

### type: `string` 

Viewport type with built-in scene logic. Default is block scene type.

Current available types include block, viewport, custom, design, document. More scene types will be added in the future.

ts

```
type ILeaferType =
  | 'block' // block-style embedded scene
  | 'viewport' // basic viewport scene
  | 'editor' // graphic editing scene
  | 'design' // design scene
  | 'board' // whiteboard scene
  | 'document' // document scene
  | 'app' // application scene
  | 'website' // website scene
  | 'game' // game scene
  | 'player' // animation playback scene
  | 'chart' // chart scene
  | 'custom' // custom
```

## block scene type 

Elements inside Leafer can behave like standard HTML block elements embedded in a browser page and respond to interaction events.

On mobile devices, when elements are not draggable/editable and no DragEvent.DRAG listener is attached, dragging will directly scroll the page. See touch configuration.

ts

```
// #应用与引擎配置 - block 视口类型 [Leafer]
import { Leafer, Rect } from 'leafer-ui'

const div = document.body.appendChild(document.createElement('div'))
const canvas = document.body.appendChild(document.createElement('canvas'))

div.style.height = '600px'
div.innerText = '请往下滑，会出现一个矩形'

const leafer = new Leafer({ view: canvas, height: 800 }) // 默认 block 类型，不要设置

const rect = new Rect({
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    fill: '#32cd79',
    cornerRadius: [50, 80, 0, 80],
    draggable: true
})

leafer.add(rect)
```

## viewport type 

Zoom and pan view via mouse wheel or touchpad gestures. This will also disable the native browser right-click menu (pointer.preventDefaultMenu).

### Pan operations 

1. Mobile / touchpad: two-finger drag.
2. Mouse: scroll wheel (vertical), Shift + scroll wheel (horizontal).

See app.config.move for more configuration options covering various scenarios.

### Zoom operations 

1. Mobile / touchpad: pinch gesture.
2. Mouse: Ctrl / Command + scroll wheel.

See app.config.zoom / app.config.wheel for more configuration options.

## custom viewport type 

Based on the viewport type, you can customize zoom and pan handling logic.

## design viewport type 

Based on the viewport type, adds support for holding the middle mouse button or Space + drag to pan the view, and limits zoom range to 0.01–256. Suitable for graphic editing and design tools.

## document viewport type 

Based on the viewport type, restricts scrolling within valid content areas and limits zoom range to 1–∞. Suitable for document-based applications.
