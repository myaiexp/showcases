<!-- source: https://www.leaferjs.com/ui/en/reference/UI/clone.html -->

# clone 

Clone an element.

## Key Properties 

### clone ( data?: `IUIInputData`) 

Clone the current element. You can pass a `data` parameter to override existing data.

## Belongs to 

### UI Elements 

## Examples 

### Clone an element and set its position 

LeaferApp

ts

```
// #克隆元素 (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' })

leafer.add(rect)

setTimeout(() => {

    // 克隆元素，并设置位置
    const rect2 = rect.clone({ x: 200, y: 200 }) 
    leafer.add(rect2)

}, 1000)
```

ts

```
// #克隆元素 (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' })

app.tree.add(rect)

setTimeout(() => {

    // 克隆元素，并设置位置
    const rect2 = rect.clone({ x: 200, y: 200 }) 
    app.tree.add(rect2)

}, 1000)
```
