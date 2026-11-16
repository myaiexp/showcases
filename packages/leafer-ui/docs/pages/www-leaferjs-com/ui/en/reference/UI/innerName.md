<!-- source: https://www.leaferjs.com/ui/en/reference/UI/innerName.html -->

# innerName 

A temporary runtime-generated name (innerId + tag), used for quickly identifying elements.

## Read-only Property 

### innerName: `string` 

A temporary runtime-generated name used for quick element identification.

## Belongs to 

### UI Element 

## Example 

### Display the innerName of a rectangle element 

LeaferApp

ts

```
// #显示矩形元素的 innerName (Leafer)
import { Leafer, Rect, Text } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 30)

leafer.add(rect)

leafer.add(new Text({ text: rect.innerName, fill: '#32cd79' }))
```

ts

```
// #显示矩形元素的 innerName (App)
import { App, Rect, Text } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 0, 30)

app.tree.add(rect)

app.tree.add(new Text({ text: rect.innerName, fill: '#32cd79' }))
```
