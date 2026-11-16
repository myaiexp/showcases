<!-- source: https://www.leaferjs.com/ui/en/reference/UI/state/focus.html -->

# focus 

Focus state supports adding transition effects.

Box / Group can use the button property to let child elements automatically sync interaction states.

Note

You need to install the state plugin to use this feature.

## Key Properties 

### focusStyle: `IUIInputData` 

Style applied when the element is focused via `focus()`. It is automatically restored when the element loses focus.

## Key Methods 

### focus ( value?: `boolean` ) 

Focuses the element. Only one element in a single App can be focused at the same time. When a new element is focused, the previously focused element will lose focus.

## Belongs To 

### UI Element 

## Examples 

LeaferApp

ts

```
// #聚焦状态  (Leafer)
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/state' // 导入交互状态插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: 'rgba(50,205,121, 0.7)',
    cornerRadius: 30,
    focusStyle: { // [!code hl:3] // 聚焦样式
        stroke: '#FEB027'
    }
})

leafer.add(rect)

setTimeout(() => {

    rect.focus()  // [!code hl:1] // 设置聚焦状态 

    setTimeout(() => { rect.focus(false) }, 2000)

}, 1000)
```

ts

```
// #聚焦状态 (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/state' // 导入交互状态插件

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: 'rgba(50,205,121, 0.7)',
    cornerRadius: 30,
    focusStyle: { // [!code hl:3] // 聚焦样式
        stroke: '#FEB027'
    }
})

app.tree.add(rect)

setTimeout(() => {

    rect.focus()  // [!code hl:1] // 设置聚焦状态 

    setTimeout(() => { rect.focus(false) }, 2000)

}, 1000)
```
