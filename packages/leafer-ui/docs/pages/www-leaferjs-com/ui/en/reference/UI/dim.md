<!-- source: https://www.leaferjs.com/ui/en/reference/UI/dim.html -->

# dim 

Dim (fade) elements by reducing opacity. It can be used together with the bright property to highlight elements, making it suitable for product walkthrough and decomposition presentations.

In addition, configuring bright and dimOthers in the graphic editor allows highlighting selected elements while dimming others.

Note

You need to install the bright plugin to use this feature.

## Key Properties 

### dim: `boolean` | `number` 

Dim (fade) the element and all its child elements by applying opacity reduction. Default is `false`.

When set to `true`, opacity is automatically set to `0.2`. You can also set a custom opacity value.

### dimskip: `boolean` 

Skip dimming for this element, keeping it highlighted without bringing it to the top layer. Default is `false`.

If you need to render the element on top, use the bright property instead.

## Belongs to 

### UI Elements 

## Examples 

### Highlight main element and dim others 

LeaferApp

ts

```
// #突出主体、淡化其他元素 [Leafer]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/bright' // 导入突出显示元素插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79', draggable: true }, 260, 150)

leafer.add(Rect.one({ fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
leafer.add(rect)
leafer.add(Rect.one({ fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 320, 100))

setTimeout(() => {

    leafer.dim = true // 进行淡化
    // leafer.dim = 0.2 // 指定透明度

    rect.dimskip = true // 跳过淡化，突出主体

}, 1000)
```

ts

```
// #突出主体、淡化其他元素 [App]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件 
import '@leafer-in/bright' // 导入突出显示元素插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {
        dimOthers: true, // 淡化其他元素，突出选中元素
        //dimOthers: 0.2 // 可指定淡化的透明度
    }
})

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({ editable: true, fill: '#32cd79' }, 260, 150))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 320, 100))

setTimeout(() => { app.editor.select(app.tree.children[1]) }, 1000) // 模拟旋转元素
```

### Highlight element (render on top) and dim others 

LeaferApp

ts

```
// #突出显示并置顶渲染，淡化其他元素 [leafer]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/bright' // 导入突出显示元素插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79', draggable: true }, 260, 150)

leafer.add(Rect.one({ fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
leafer.add(rect)
leafer.add(Rect.one({ fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 320, 100))

setTimeout(() => {

    rect.bright = true // 突出显示，置顶渲染

    leafer.dim = true // 淡化其他元素 
    // leafer.dim = 0.2 // 可指定淡化的透明度

}, 1000)
```

ts

```
// #突出显示并置顶渲染，淡化其他元素 [App]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件 
import '@leafer-in/bright' // 导入突出显示元素插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {
        bright: true, // 突出显示、置顶渲染选中元素
        dimOthers: true, // 淡化其他元素
        //dimOthers: 0.2 // 可指定淡化的透明度
    }
})

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({ editable: true, fill: '#32cd79' }, 260, 150))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 320, 100))

setTimeout(() => { app.editor.select(app.tree.children[1]) }, 1000) // 模拟旋转元素
```
