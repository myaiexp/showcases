<!-- source: https://www.leaferjs.com/ui/en/guide/advanced/viewport.html -->

# Zoom and Pan View 

Use mouse wheel / touchpad scrolling or pinch gestures to zoom and pan the view, similar to browser or design software viewport interactions.

The engine defaults to block scene type, and you can quickly change the viewport type by configuring leafer.config.type, which will automatically add the corresponding scene interaction logic.

Notes

You need to install the viewport plugin to use it, or directly install leafer-editor (this plugin is already integrated).

You can also use the view control plugin / scrollbar plugin to conveniently control the view, supporting centering content and focusing on specific elements.

## Manually Zoom and Pan View 

By modifying the Leafer viewport properties / App viewport properties such as x, y, scale, scaleX, scaleY, you can zoom and pan the view.

## viewport Types 

Zooming and panning via mouse wheel / touchpad scroll or pinch gestures will prevent the default native right-click menu.

### Pan View Operations 

1. Mobile / touchpad: two-finger drag.
2. Mouse: wheel scroll (vertical), Shift + wheel (horizontal).

For more configuration, see app.config.move, which provides rich options for different scenarios.

### Zoom View Operations 

1. Mobile / touchpad: pinch gesture.
2. Mouse: Ctrl / Command + wheel.

For more configuration, see app.config.zoom / app.config.wheel.

AppLeaferImplementation

ts

```
// #应用与引擎配置 - viewport 视口类型 [App]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const app = new App({
    view: window,
    tree: { type: 'viewport' } // 给 tree 层添加视口
})

app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 100, 200, 200))
```

ts

```
// #应用与引擎配置 - viewport 视口类型 [Leafer]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({
    view: window,
    type: 'viewport' // 添加视口
})

leafer.add(Rect.one({ fill: '#32cd79' }, 100, 100, 200, 200))
```

ts

```
// #应用与引擎配置 - viewport 视口类型 [实现原理]
import { App, Rect, MoveEvent, ZoomEvent } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const app = new App({
    view: window,
    // 以下配置及事件监听 = tree: { type: 'viewport' }
    tree: {},
    wheel: { preventDefault: true }, // 阻止浏览器默认滚动页面事件
    touch: { preventDefault: true }, // 阻止移动端默认触摸屏滑动页面事件
    pointer: { preventDefaultMenu: true } // 阻止浏览器默认菜单事件
})

app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 100, 200, 200))

// 平移视图
app.tree.on(MoveEvent.BEFORE_MOVE, (e: MoveEvent) => {
    app.tree.zoomLayer.move(app.tree.getValidMove(e.moveX, e.moveY))
})

// 缩放视图
app.tree.on(ZoomEvent.BEFORE_ZOOM, (e: ZoomEvent) => {
    app.tree.zoomLayer.scaleOfWorld(e, app.tree.getValidScale(e.scale))
})
```

## custom viewport Type 

On top of viewport mode, customize the zoom and pan handling logic.

AppLeaferImplementation

ts

```
// #应用与引擎配置 - custom 视口类型 [App]
import { App, Rect, MoveEvent, ZoomEvent } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const app = new App({
    view: window,
    tree: { type: 'custom' } // 给 tree 层添加自定义视口
})

// 需要自定义平移视图逻辑
app.tree.on(MoveEvent.BEFORE_MOVE, (e: MoveEvent) => {
    const { x, y } = app.tree.getValidMove(e.moveX, e.moveY)
    app.tree.zoomLayer.move(x, y)
})

// 需要自定义缩放视图逻辑
app.tree.on(ZoomEvent.BEFORE_ZOOM, (e: ZoomEvent) => {
    const center = { x: e.x, y: e.y }
    app.tree.zoomLayer.scaleOfWorld(center, app.tree.getValidScale(e.scale))
})

app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 100, 200, 200))
```

ts

```
// #应用与引擎配置 - custom 视口类型 [Leafer]
import { Leafer, Rect, MoveEvent, ZoomEvent } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({
    view: window,
    type: 'custom' // 添加自定义视口
})

// 需要自定义平移视图逻辑
leafer.on(MoveEvent.BEFORE_MOVE, (e: MoveEvent) => {
    const { x, y } = leafer.getValidMove(e.moveX, e.moveY)
    leafer.zoomLayer.move(x, y)
})

// 需要自定义缩放视图逻辑
leafer.on(ZoomEvent.BEFORE_ZOOM, (e: ZoomEvent) => {
    const center = { x: e.x, y: e.y }
    leafer.zoomLayer.scaleOfWorld(center, leafer.getValidScale(e.scale))
})

leafer.add(Rect.one({ fill: '#32cd79' }, 100, 100, 200, 200))
```

ts

```
// #应用与引擎配置 - custom 视口类型 [实现原理]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const app = new App({
    view: window,
    // 以下配置 = tree: { type: 'custom' }
    tree: {},
    wheel: { preventDefault: true }, // 阻止浏览器默认滚动页面事件
    touch: { preventDefault: true }, // 阻止移动端默认触摸屏滑动页面事件
    pointer: { preventDefaultMenu: true } // 阻止浏览器默认菜单事件
})

app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 100, 200, 200))
```

## design viewport Type 

On top of viewport mode, adds support for holding middle mouse button / Space + drag to pan the view, and limits zoom range to 0.01 ~ 256, suitable for graphic editing and design applications.

AppLeaferImplementation

ts

```
// #应用与引擎配置 - design 视口类型 [App]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const app = new App({
    view: window,
    tree: { type: 'design' } // 给 tree 层添加视口
})

app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 100, 200, 200))
```

ts

```
// #应用与引擎配置 - design 视口类型 [Leafer]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({
    view: window,
    type: 'design' // 添加视口
})

leafer.add(Rect.one({ fill: '#32cd79' }, 100, 100, 200, 200))
```

ts

```
// #应用与引擎配置 - design 视口类型 [实现原理]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const app = new App({
    view: window,
    // 以下配置 = tree: { type: 'design' },
    tree: { type: 'viewport' }, // 添加基础视口
    zoom: {
        min: 0.01, // 视图缩放范围
        max: 256
    },
    move: {
        holdSpaceKey: true,  // 按住空白键拖拽可平移视图
        holdMiddleKey: true, // 按住滚轮中键拖拽可平移视图
    }
})

app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 100, 200, 200))
```

## document viewport Type 

On top of viewport mode, restricts scrolling within valid content areas and limits zoom range to 1 ~ ∞, suitable for document-based applications.

AppLeaferImplementation

ts

```
// #应用与引擎配置 - document 视口类型 [App]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const app = new App({
    view: window,
    tree: { type: 'document' } // 给 tree 层添加视口
})

app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 100, 200, 200))
app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 600, 200, 200))
app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 1200, 200, 200))
app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 1800, 200, 200))
```

ts

```
// #应用与引擎配置 - document 视口类型 [Leafer]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({
    view: window,
    type: 'document' // 添加视口
})

leafer.add(Rect.one({ fill: '#32cd79' }, 100, 100, 200, 200))
leafer.add(Rect.one({ fill: '#32cd79' }, 100, 600, 200, 200))
leafer.add(Rect.one({ fill: '#32cd79' }, 100, 1200, 200, 200))
leafer.add(Rect.one({ fill: '#32cd79' }, 100, 1800, 200, 200))
```

ts

```
// #应用与引擎配置 - document 视口类型 [实现原理]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const app = new App({
    view: window,
    // 以下配置 = tree: { type: 'document' } ,
    tree: { type: 'viewport' }, // 添加基础视口
    zoom: { min: 1 }, // 视图缩放范围
    move: { scroll: 'limit' } // 限制在有内容的区域内滚动
})

app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 100, 200, 200))
app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 600, 200, 200))
app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 1200, 200, 200))
app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 1800, 200, 200))
```

## Mobile Gesture Control Elements 

The graphic editor can be configured with mobile mode and gesture control elements.

You can also listen to viewport interaction events yourself to implement gesture-controlled elements (requires stopping event propagation).

## Listen to Viewport Changes 

The engine can listen to PropertyEvent to detect changes in Leafer viewport properties / App viewport properties, such as x, y, scaleX, scaleY, to synchronize related logic.

When a Leafer instance is used as a zoom-pan layer, it can directly listen to its own view change events.

## More Examples 

### Mouse wheel zoom directly 

### Control zoom range 

### Specify zoom layer 

### Listen to Leafer zoom change events 

## Viewport Interaction Events 

### MoveEvent     ZoomEvent     RotateEvent 

## Next Step 

### Coordinate Conversion 
