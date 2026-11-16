<!-- source: https://www.leaferjs.com/ui/en/reference/UI/tag.html -->

# tag 

The element tag name (i.e. the class name of the element), such as `Rect` or `Box`. It can be used with find() / findOne() for searching elements.

In the future, it may also be used to create elements in an HTML-like syntax.

## Read-only Property 

### tag: `string` 

The tag name of the element (i.e. the class name).

## Belongs to 

### UI Element 

## Example 

### Find elements by tag 

Note

The find element plugin is required, or you can install leafer-game or leafer-editor, which already include the find plugin.

LeaferApp

ts

```
// #查找功能 [通过 tag 查找 (Leafer)]
import { Leafer, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window })

const rect1 = new Rect({ fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79', x: 150 })
const ellipse = new Ellipse({ fill: '#32cd79', x: 300 })

leafer.add(rect1)
leafer.add(rect2)
leafer.add(ellipse)

console.log(
    leafer.find('Rect')  // [!code hl] // [rect1, rect2]
)
```

ts

```
// #查找功能 [通过 tag 查找 (App)]
import { App, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/find' // 导入查找元素插件

const app = new App({ view: window, editor: {} })

const rect1 = new Rect({ fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79', x: 150 })
const ellipse = new Ellipse({ fill: '#32cd79', x: 300 })

app.tree.add(rect1)
app.tree.add(rect2)
app.tree.add(ellipse)

console.log(
    app.find('Rect')  // [!code hl] // [rect1, rect2]
)
```
