<!-- source: https://www.leaferjs.com/ui/en/reference/config/app/touch.html -->

# Application and Engine Configuration 

### Basics     Viewport Type     Canvas     Pointer     Multi-touch     Touch     Wheel     Panning View     Zoom View 

## 

Touch event related configuration. Changes made during engine runtime will take effect immediately via app.config.touch.

Note

Under the App structure, settings can only be configured on the App config.

## Key Properties 

### touch.preventDefault: `boolean` | `'auto'` 

Whether to prevent the default mobile touch scrolling behavior. Default is 'auto'.

When set to 'auto', elements with draggable/editable behavior or those listening to DragEvent.DRAG can still be dragged independently, while other areas will scroll the page.

When set to true, all dragging is disabled from triggering page scrolling. This is automatically used when enabling viewport zoom and pan features.

When set to false, all dragging will allow page scrolling.

## Example 

### Prevent default mobile page scrolling behavior 

LeaferApp

ts

```
// #应用与引擎配置 - 阻止移动端默认滑动页面事件 [Leafer]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({
    view: window,
    touch: { preventDefault: true }
})

leafer.add(Rect.one({ fill: '#32cd79' }, 100, 100))
```

ts

```
// #应用与引擎配置 - 阻止移动端默认滑动页面事件 [App]
import { App, Rect } from 'leafer-ui'

const app = new App({
    view: window,
    tree: { touch: { preventDefault: true } }
})

app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 100))
```
