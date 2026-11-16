<!-- source: https://www.leaferjs.com/ui/en/reference/UI/parent.html -->

# parent 

The parent node of the element.

## Read-only Property 

### parent: `Group` 

The parent element.

## Helper Method 

### waitParent ( item: `function`, bind?: `object` ) 

Wait until the element has a `parent` property, then execute the `item` callback. You can bind `this` via the `bind` parameter.

If it already exists, it will be executed immediately.

### waitParentChange ( item: `function` ) 

Waits for the element's `parent` property to change before executing the `item` function. Note that the `item` function remains in the listener queue (the same function is automatically deduplicated).

If the parent already exists, the function is executed immediately.

## Belongs to 

### UI Element 

## Example 

### Execute a callback when the element is added to a parent 

LeaferApp

ts

```
// #等待元素被添加到父元素中时，执行回调 (Leafer)
import { Leafer, Group, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ fill: '#32cd79' })

const group = new Group()

rect.waitParent(() => {
    rect.draggable = true
})

group.add(rect)
leafer.add(group)
```

ts

```
// #等待元素被添加到父元素中时，执行回调 (App)
import { App, Group, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({ fill: '#32cd79' })

const group = new Group()

rect.waitParent(() => {
    rect.draggable = true
})

group.add(rect)
app.tree.add(group)
```
