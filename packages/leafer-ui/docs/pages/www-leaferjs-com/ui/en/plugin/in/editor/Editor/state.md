<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/Editor/state.html -->

# Editor State 

## Key Properties 

### visible: `boolean` 

Whether the editor is visible. Default is true.

When hidden, interaction is also disabled.

### hittable: `boolean` 

Whether the editor responds to interaction events. Default is true.

When set to false, all editor interactions are disabled.

### single: `boolean` 

Whether a single element is selected.

### multiple: `boolean` 

Whether multiple elements are selected.

### editing: `boolean` 

Whether the editor is in editing state. Entered after selecting an element.

### innerEditing: `boolean` 

Whether the editor is in internal editing state. Entered by double-clicking a single element (when an internal editor exists).

### groupOpening: `boolean` 

Whether a group is currently opened. Double-clicking a group enters this state, allowing easier selection of elements inside the group.

### dragging: `boolean` 

Whether the editor is being dragged, including control points and edges.

### gesturing: `boolean` 

Whether the editor is being manipulated via mobile gestures (drag, zoom, rotate).

### moving: `boolean` 

Whether the editor is being moved.

### resizing: `boolean` 

Whether the editor is being resized.

### rotating: `boolean` 

Whether the editor is being rotated.

### skewing: `boolean` 

Whether the editor is being skewed.

## Belongs to 

### Editor Element 

## Example 

### Create shape mode 

create-mode.tscreate-mode.js

ts

```
// #图形编辑器 [创建图形 - 进入绘制模式]
import { App, DragEvent, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)


const app = new App({ view: window, editor: {}, fill: '#333' })

app.tree.add({ tag: 'Text', x: 100, y: 100, text: '2秒后进入绘制模式，按下鼠标拖动可创建矩形，10 秒后再回到正常模式', fill: '#999', fontSize: 16 })


app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 300))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', rotation: 10, cornerRadius: [0, 20, 20, 0] }, 300, 300))

app.editor.select(app.tree.children[2])

setTimeout(() => {

    // 2秒后进入绘制模式
    app.mode = 'draw'

    // 创建矩形（拖拽）
    let rect: Rect

    const events = [
        app.on_(DragEvent.START, () => {
            rect = new Rect({ editable: true, fill: '#32cd79' })
            app.tree.add(rect)
        }),

        app.on_(DragEvent.DRAG, (e: DragEvent) => {
            if (rect) rect.set(e.getPageBounds()) // 获取事件在 page 坐标系中绘制形成的包围盒
        })]


    setTimeout(() => {

        app.off_(events)

        // 10 秒后回到正常模式
        app.mode = 'normal'

    }, 10000)

}, 2000)
```

js

```
// #图形编辑器 [创建图形 - 进入绘制模式]
import { App, DragEvent, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)


const app = new App({ view: window, editor: {}, fill: '#333' })

app.tree.add({ tag: 'Text', x: 100, y: 100, text: '2秒后进入绘制模式，按下鼠标拖动可创建矩形，10 秒后再回到正常模式', fill: '#999', fontSize: 16 })


app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 300))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', rotation: 10, cornerRadius: [0, 20, 20, 0] }, 300, 300))

app.editor.select(app.tree.children[2])

setTimeout(() => {

    // 2秒后进入绘制模式
    app.mode = 'draw'

    // 创建矩形（拖拽）
    let rect

    const events = [
        app.on_(DragEvent.START, () => {
            rect = new Rect({ editable: true, fill: '#32cd79' })
            app.tree.add(rect)
        }),

        app.on_(DragEvent.DRAG, (e) => {
            if (rect) rect.set(e.getPageBounds()) // 获取事件在 page 坐标系中绘制形成的包围盒
        })]


    setTimeout(() => {

        app.off_(events)

        // 10 秒后回到正常模式
        app.mode = 'normal'

    }, 10000)

}, 2000)
```
