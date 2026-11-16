<!-- source: https://www.leaferjs.com/ui/en/reference/UI/state/selected.html -->

# selected 

Selected state supports adding transition effects.

Box / Group can use the button property to let child elements automatically sync interaction states.

Note

You need to install the state plugin to use this feature.

## Key Properties 

### selected: `boolean` 

Whether the element is selected.

### selectedStyle: `IUIInputData` 

Style applied when `selected` is set to true. It is automatically restored when `selected` is set to false.

## Belongs To 

### UI Element 

## Examples 

LeaferApp

ts

```
// #选中状态  (Leafer)
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/state' // 导入交互状态插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: 'rgba(50,205,121, 0.7)',
    cornerRadius: 30,
    selectedStyle: { // [!code hl:3] // 选中样式
        fill: 'rgba(50,205,121, 1)'
    }
})

leafer.add(rect)

setTimeout(() => {

    rect.selected = true  // [!code hl:1] // 设置选中状态 

    setTimeout(() => { rect.selected = false }, 2000)

}, 1000)
```

ts

```
// #选中状态 (App)
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
    selectedStyle: { // [!code hl:3] // 选中样式
        fill: 'rgba(50,205,121, 1)'
    }
})

app.tree.add(rect)

setTimeout(() => {

    rect.selected = true  // [!code hl:1] // 设置选中状态 

    setTimeout(() => { rect.selected = false }, 2000)

}, 1000)
```
