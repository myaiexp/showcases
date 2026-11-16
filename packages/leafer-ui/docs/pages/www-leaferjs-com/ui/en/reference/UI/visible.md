<!-- source: https://www.leaferjs.com/ui/en/reference/UI/visible.html -->

# visible 

The visibility of an element, used to hide elements.

## Key Properties 

### visible: `boolean` | `number` 

Whether the element is visible, defaults to true.

Setting it to false will hide the element, but it will still occupy layout space.

Setting it to 0 will make it not occupy layout space, similar to CSS `display: none`.

## Belongs To 

### UI Elements 

## Example 

### Hide element 

LeaferApp

ts

```
// #隐藏元素 (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

leafer.add(rect)

setTimeout(() => {

    // 隐藏元素
    rect.visible = false

}, 1000)
```

ts

```
// #隐藏元素 (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

app.tree.add(rect)

setTimeout(() => {

    // 隐藏元素
    rect.visible = false

}, 1000)
```

### Hide element and remove it from layout flow 

LeaferApp

ts

```
// #隐藏元素，且不占空间 (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

leafer.add(rect)

setTimeout(() => {

    // 隐藏元素，且不占空间
    rect.visible = 0

}, 1000)
```

ts

```
// #隐藏元素，且不占空间 (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

app.tree.add(rect)

setTimeout(() => {

    // 隐藏元素，且不占空间
    rect.visible = 0

}, 1000)
```
