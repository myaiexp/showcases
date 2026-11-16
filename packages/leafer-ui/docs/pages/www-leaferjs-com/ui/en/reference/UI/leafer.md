<!-- source: https://www.leaferjs.com/ui/en/reference/UI/leafer.html -->

# leafer 

The Leafer engine instance that the element belongs to.

## Read-only Properties 

### leafer: `Leafer` 

The Leafer engine instance that the element belongs to.

### app: `App` | `Leafer` 

The App instance (root application) that the element belongs to. If not in an App structure, it will be a Leafer instance.

### isLeafer: `boolean` 

Whether the element is a Leafer engine.

### leaferIsCreated: `boolean` 

Whether the Leafer engine and its children have been created (initial creation completed).

### leaferIsReady: `boolean` 

Whether the Leafer engine is ready (initial layout completed).

### zoomLayer: `Group` 

The Leafer engine’s zoom/pan viewport layer.

### frame: `Frame` 

The `Frame` artboard that contains the element.

## Helper Method 

### waitLeafer ( item: `function`, bind?: `object` ) 

Wait until the element has the `leafer` property, then execute the `item` callback. You can bind `this` via the `bind` parameter.

If it already exists, it will be executed immediately.

## Belongs to 

### UI Element 

## Example 

### Execute callback when element is added to the engine 

LeaferApp

ts

```
// #等待元素被添加到引擎中时，执行回调 (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ fill: '#32cd79' })

rect.waitLeafer(() => {
    rect.draggable = true
})

leafer.add(rect)
```

ts

```
// #等待元素被添加到引擎中时，执行回调 (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({ fill: '#32cd79' })

rect.waitLeafer(() => {
    rect.draggable = true
})

app.tree.add(rect)
```
