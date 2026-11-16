<!-- source: https://www.leaferjs.com/ui/en/reference/UI/name.html -->

# name 

The name of the element. It can be used as a condition in find() / findOne().

## Key Property 

### name: `string` 

The name of the element. Defaults to an empty string.

## Belongs to 

### UI Element 

## Example 

### Find by name using a function condition 

Note

The Find Element Plugin must be installed to use this feature, or you can directly install leafer-game or leafer-editor (both already include the find element plugin).

LeaferApp

ts

```
// #查找功能 [通过 name 查找 (Leafer)]
import { Leafer, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window })

const rect1 = new Rect({ name: 'hello', fill: '#32cd79', stroke: 'black' })
const rect2 = new Rect({ fill: '#32cd79', x: 150 })
const ellipse = new Ellipse({ name: 'hello', fill: '#32cd79', stroke: 'black', x: 300 })

leafer.add(rect1)
leafer.add(rect2)
leafer.add(ellipse)

console.log(
    leafer.find(function (item) {
        return item.name === 'hello' ? 1 : 0 // [rect1, ellipse]
    })
)
```

ts

```
// #查找功能 [通过 name 查找 (App)]
import { App, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/find' // 导入查找元素插件

const app = new App({ view: window, editor: {} })

const rect1 = new Rect({ name: 'hello', fill: '#32cd79', stroke: 'black' })
const rect2 = new Rect({ fill: '#32cd79', x: 150 })
const ellipse = new Ellipse({ name: 'hello', fill: '#32cd79', stroke: 'black', x: 300 })

app.tree.add(rect1)
app.tree.add(rect2)
app.tree.add(ellipse)

console.log(
    app.find(function (item) {
        return item.name === 'hello' ? 1 : 0 // [rect1, ellipse]
    })
)
```
