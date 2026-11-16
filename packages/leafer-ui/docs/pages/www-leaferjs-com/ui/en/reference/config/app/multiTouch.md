<!-- source: https://www.leaferjs.com/ui/en/reference/config/app/multiTouch.html -->

# Application and Engine Configuration 

### Basics     Viewport Type     Canvas     Pointer     Multi-touch     Touch     Wheel     Panning View     Zoom View 

## 

Multi-touch event related configuration. Changes made during engine runtime will take effect immediately via app.config.multiTouch.

Note

Under the App structure, settings can only be configured on the App config.

## Key Properties 

### multiTouch.disabled: `boolean` 

Whether to disable multi-touch zoom/pan/rotation events. Default is false.

### multiTouch.singleGesture: `boolean` | `ISingleGestureConfig` 

Whether to recognize and lock to a single gesture operation (zoom/pan/rotation will prioritize only one at a time). Default is false.

When set as an object, gesture recognition thresholds can be further customized.

ts

```
interface ISingleGestureConfig {
  move?: number // threshold for detecting movement, default is 5
  scale?: number // threshold for detecting scaling, default is 0.03
  rotation?: number // threshold for detecting rotation, default is 2 degrees
  count?: number // number of consecutive detections required to lock gesture type, default is 2
  time?: number // maximum gesture recognition time window, default is 160ms
}
```

## Example 

### Disable multi-touch functionality 

LeaferApp

ts

```
// #应用与引擎配置 - 禁用多点触屏功能 [Leafer]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({
    view: window,
    type: 'viewport',
    multiTouch: { disabled: true }
})

leafer.add(Rect.one({ fill: '#32cd79' }, 100, 100))
```

ts

```
// #应用与引擎配置 - 禁用多点触屏功能 [App]
import { App, Rect } from 'leafer-ui'

const app = new App({
    view: window,
    tree: { multiTouch: { disabled: true } }
})

app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 100))
```

### Lock single gesture mode 

LeaferApp

ts

```
// #应用与引擎配置 - 锁定单一手势操作 [Leafer]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({
    view: window,
    type: 'viewport',
    mobile: true, // 适配移动端
    multiTouch: {
        singleGesture: true // 识别并锁定单一手势操作
    }
})

leafer.add(Rect.one({ fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
leafer.add(Rect.one({ ill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100))
```

ts

```
// #应用与引擎配置 - 锁定单一手势操作 [App]
import { App, Rect, Frame } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件

const app = new App({
    view: window,
    fill: '#333',
    mobile: true, // 适配移动端
    multiTouch: {
        singleGesture: true // 识别并锁定单一手势操作
    },
    editor: { moveable: 'gesture', resizeable: 'gesture', rotateable: 'gesture' }  //  编辑元素支持手势操作 
})

app.tree.add(Frame.one({ // 页面内容
    children: [
        Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100)
    ]
}, 100, 100, 500, 600))
```
