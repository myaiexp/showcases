<!-- source: https://www.leaferjs.com/ui/en/reference/UI/id.html -->

# id 

The unique id of an element. It can be used with findId() / findOne() for searching.

## Key Property 

### id: `string` 

The unique id of the element. Defaults to an empty string.

## Belongs to 

### UI Element 

## Example 

### Find by id 

Note

The Find Element Plugin must be installed to use this feature, or you can directly install leafer-game or leafer-editor (both already include the find element plugin).

LeaferApp

ts

```
// #查找单个元素 [通过 id 查找 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window })

const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79' })

leafer.add(rect1)
leafer.add(rect2)

console.log(
    leafer.findOne('#block') // [!code hl:2] // rect1
    // = leafer.findId('block') 
)
```

ts

```
// #查找单个元素 [通过 id 查找 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/find' // 导入查找元素插件

const app = new App({ view: window, editor: {} })

const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79' })

app.tree.add(rect1)
app.tree.add(rect2)

console.log(
    app.findOne('#block') // [!code hl:2] // rect1
    // = app.findId('block') 
)
```
