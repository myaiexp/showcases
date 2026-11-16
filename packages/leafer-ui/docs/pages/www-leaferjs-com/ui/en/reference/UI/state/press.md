<!-- source: https://www.leaferjs.com/ui/en/reference/UI/state/press.html -->

# press 

`pointer.down` state supports adding transition effects.

Box / Group can use the button property to let child elements automatically sync interaction states.

Note

You need to install the state plugin to use this feature.

## Key Properties 

### pressStyle: `IUIInputData` 

Interaction style applied when the pointer is pressed down. It is automatically restored when the pointer is released.

## Belongs To 

### UI Element 

## Examples 

### Darken color on mouse press 

LeaferApp

ts

```
// #光标按下时的交互样式 (Leafer)
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/state' // 导入交互状态插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: 'rgba(50,205,121, 0.7)',
    cornerRadius: 30,
    pressStyle: { // [!code hl:3] // press 样式
        fill: 'rgba(50,205,121, 1)'
    }
})

leafer.add(rect)
```

ts

```
// #光标按下时的交互样式 (App)
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
    pressStyle: { // [!code hl:3] // press 样式
        fill: 'rgba(50,205,121, 1)'
    }
})

app.tree.add(rect)
```
