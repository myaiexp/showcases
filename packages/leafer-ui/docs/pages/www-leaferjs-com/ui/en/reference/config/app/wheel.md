<!-- source: https://www.leaferjs.com/ui/en/reference/config/app/wheel.html -->

# Application and Engine Configuration 

### Basics     Viewport Type     Canvas     Pointer     Multi-touch     Touch     Wheel     Panning View     Zoom View 

## 

Wheel interaction related configuration. Changes made during engine runtime will take effect immediately via app.config.wheel.

Note

Under the App structure, settings can only be configured on the App config.

## Key Properties 

### wheel.disabled: `boolean` 

Whether to disable wheel events. Default is false.

### wheel.zoomMode: `boolean` ｜ `'mouse'` 

Whether to enable zooming the view directly via mouse wheel. Default is false.

'mouse'

To support both mouse and touchpad input, some devices may not be accurately detected. Setting this to `'mouse'` enables precise zoom behavior (requires confirmation that the user is using a mouse, not a touchpad).

### wheel.zoomSpeed: `number` 

Zoom speed used to adapt different browser behaviors. Default is 0.5.

Range: 0 to 1.

### wheel.moveSpeed: `number` 

Scroll movement speed used to adapt different browser behaviors. Default is 0.5.

Range: 0 to 1.

### wheel.rotateSpeed: `number` 

Rotation speed used to adapt different browser behaviors. Default is 0.5.

Range: 0 to 1.

### wheel.posDeltaSpeed: `number` 

Positive delta scroll speed. Can be set to a negative value to reverse scrolling.

### wheel.negDeltaSpeed: `number` 

Negative delta scroll speed. Can be set to a negative value to reverse scrolling.

### wheel.preventDefault: `boolean` 

Whether to prevent the browser’s default page scroll behavior. Default is false.

### wheel.delta: `IPointData` 

Base delta calibration used for speed tuning across different systems and browsers.

When `moveSpeed` and `zoomSpeed` do not produce expected results, adjust this value for optimal behavior.

Default values:

ts

```
  // base speed (affects zoomSpeed), can be tuned per system/browser
  delta: {
    x: 80 / 4, // horizontal wheel delta per tick
    y: 8.0 // vertical wheel delta per tick
  },
```

## Example 

### Zoom view directly with mouse wheel 

In zoom priority mode, the mouse wheel directly controls zoom. Press the middle mouse button to pan the view.

AppLeafer

ts

```
// #应用与引擎配置 - 鼠标滚动直接缩放视图 [App]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const app = new App({
    view: window,
    tree: { type: 'viewport' },
    wheel: { zoomMode: true }
})

app.tree.add(new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true }))
```

ts

```
// #应用与引擎配置 - 鼠标滚动直接缩放视图 [Leafer]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({
    view: window,
    type: 'viewport',
    wheel: { zoomMode: true }
})

leafer.add(new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true }))
```
