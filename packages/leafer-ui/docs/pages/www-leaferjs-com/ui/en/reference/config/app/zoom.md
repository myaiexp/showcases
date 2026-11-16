<!-- source: https://www.leaferjs.com/ui/en/reference/config/app/zoom.html -->

# Application and Engine Configuration 

### Basics     Viewport Type     Canvas     Pointer     Multi-touch     Touch     Wheel     Panning View     Zoom View 

## 

Zoom view related configuration. Changes made during engine runtime will take effect immediately via app.config.zoom.

Note

Under the App structure, settings can only be configured on the App config.

## Key Properties 

### zoom.disabled: `boolean` 

Whether to disable zooming the view. Default is false.

### zoom.min: `number` 

Minimum zoom scale of the view. Default is 0.02.

### zoom.max: `number` 

Maximum zoom scale of the view. Default is 256.

## Example 

### Control zoom range of the view 

AppLeafer

ts

```
// #应用与引擎配置 - 控制视图缩放范围 [App]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const app = new App({
    view: window,
    tree: { type: 'viewport' },
    zoom: { min: 0.02, max: 256 }
})

app.tree.add(new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true }))
```

ts

```
// #应用与引擎配置 - 控制视图缩放范围 [Leafer]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({
    view: window,
    type: 'viewport',
    zoom: { min: 0.02, max: 256 }
})

leafer.add(new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true }))
```
