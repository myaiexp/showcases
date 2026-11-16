<!-- source: https://www.leaferjs.com/ui/en/reference/UI/state/hover.html -->

# hover 

`pointer.enter` state supports adding transition effects.

Box / Group can use the button property to let child elements automatically sync interaction states.

Note

You need to install the state plugin to use this feature.

## Key Properties 

### hoverStyle: `IUIInputData` 

Interaction style applied when the pointer enters the element. It is automatically restored when the pointer leaves.

## Belongs To 

### UI Element 

## Examples 

### Darken color on mouse hover 

LeaferApp

ts

```
// #光标移入时的交互样式 (Leafer)
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/state' // 导入交互状态插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: 'rgba(50,205,121, 0.7)',
    cornerRadius: 30,
    hoverStyle: { // [!code hl:3] // hover 样式
        fill: 'rgba(50,205,121, 0.8)'
    }
})

leafer.add(rect)
```

ts

```
// #光标移入时的交互样式 (App)
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
    hoverStyle: { // [!code hl:3] // hover 样式
        fill: 'rgba(50,205,121, 0.8)'
    }
})

app.tree.add(rect)
```
