<!-- source: https://www.leaferjs.com/ui/en/reference/UI/offset.html -->

# offset 

Element offset properties, used for relative positioning in animations and interaction states.

## Key Properties 

### offsetX: `number` 

Offset value on the x-axis.

### offsetY: `number` 

Offset value on the y-axis.

## Belongs to 

### UI Element 

## Example 

### Offset an element 

LeaferApp

ts

```
// #偏移元素 (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

leafer.add(rect)

setTimeout(() => {

    // 沿 X/Y 偏移 100 像素
    rect.set({ offsetX: 100, offsetY: 100 }) 

}, 1000)
```

ts

```
// #偏移元素 (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

app.tree.add(rect)

setTimeout(() => {

    // 沿 X/Y 偏移 100 像素
    rect.set({ offsetX: 100, offsetY: 100 }) 

}, 1000)
```
