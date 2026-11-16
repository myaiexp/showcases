<!-- source: https://www.leaferjs.com/ui/en/reference/UI/bright.html -->

# bright 

Highlight elements by rendering them on top. Can be used together with the dim property to fade other elements, suitable for scenarios such as product walkthrough demonstrations.

In addition, configuring bright and dimOthers in the graphic editor can highlight the selected element and dim other content.

Note

You need to install the bright plugin to use this feature.

## Key Properties 

### bright: `boolean` 

Highlight the element and render it on top. It is not affected by `dim`. Default is `false`.

## Belongs to 

### UI Elements 

## Examples 

### Highlight and render element on top 

LeaferApp

ts

```
// #突出显示，置顶渲染元素 [leafer]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/bright' // 导入突出显示元素插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79', draggable: true }, 260, 150)

leafer.add(Rect.one({ fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
leafer.add(rect)
leafer.add(Rect.one({ fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 320, 100))

setTimeout(() => {

    rect.bright = true // 突出显示，置顶渲染

}, 1000)
```

ts

```
// #突出显示，置顶渲染元素 [App]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件 
import '@leafer-in/bright' // 导入突出显示元素插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {
        bright: true, // 突出显示、置顶渲染选中元素
    }
})

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({ editable: true, fill: '#32cd79' }, 260, 150))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 320, 100))

setTimeout(() => { app.editor.select(app.tree.children[1]) }, 1000) // 模拟旋转元素
```

### Highlight and render on top while dimming other elements 

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
