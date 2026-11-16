<!-- source: https://www.leaferjs.com/ui/en/reference/UI/opacity.html -->

# opacity 

The opacity of an element.

When setting opacity on a Group, child elements are treated as a single unit, so no cumulative transparency effect will occur.

## Key Property 

### opacity: `number` 

The opacity of the element, ranging from `0` to `1`. Defaults to `1`.

## Computed Property (Read-only) 

### worldOpacity: `number` 

The opacity of the element in the global view (affected by parent elements).

When `visible` is `false`, this value will be `0`.

## Belongs to 

### UI Element 

## Example 

### Set opacity 

LeaferApp

ts

```
// #设置不透明度 (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

leafer.add(rect)

setTimeout(() => {

    // 设置不透明度
    rect.opacity = 0.5

}, 1000)
```

ts

```
// #设置不透明度 (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

app.tree.add(rect)

setTimeout(() => {

    // 设置不透明度
    rect.opacity = 0.5

}, 1000)
```
