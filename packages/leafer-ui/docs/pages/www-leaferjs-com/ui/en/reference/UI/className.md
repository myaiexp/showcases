<!-- source: https://www.leaferjs.com/ui/en/reference/UI/className.html -->

# layer 

The classification name of an element, similar to `className` in HTML. It can be queried using find() / findOne().

## Key Properties 

### className: `string` 

The classification name. Currently only one value is supported. Default is empty.

## Belongs to 

### UI Elements 

## Examples 

### Find by className 

Note

You need to install the find plugin to use this feature, or directly install leafer-game or leafer-editor (which already include the find plugin).

LeaferApp

ts

```
// #查找功能 [通过 className 查找 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window })

const rect1 = new Rect({ className: 'menu', fill: '#32cd79' })
const rect2 = new Rect({ className: 'menu', fill: '#32cd79', x: 150 })
const rect3 = new Rect({ fill: '#32cd79', x: 300 })

leafer.add(rect1)
leafer.add(rect2)
leafer.add(rect3)

console.log(
    leafer.find('.menu') // [!code hl] // [rect1, rect2]
)
```

ts

```
// #查找功能 [通过 className 查找 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/find' // 导入查找元素插件

const app = new App({ view: window, editor: {} })

const rect1 = new Rect({ className: 'menu', fill: '#32cd79' })
const rect2 = new Rect({ className: 'menu', fill: '#32cd79', x: 150 })
const rect3 = new Rect({ fill: '#32cd79', x: 300 })

app.tree.add(rect1)
app.tree.add(rect2)
app.tree.add(rect3)

console.log(
    app.find('.menu') // [!code hl] // [rect1, rect2]
)
```
