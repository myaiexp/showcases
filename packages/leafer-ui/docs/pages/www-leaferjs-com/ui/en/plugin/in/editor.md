<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/ -->

# Editor Element 

The graphic editor is used for editing and manipulating graphics. It supports moving, scaling, rotating, and skewing elements, as well as multi-selection, box selection, grouping, entering groups via double-click, locking, and z-index control—aiming to match professional design tools. It supports custom configuration, edit tools, and inner editors.

Inheritance

Editor  >  Group  >  UI

  

It is usually created automatically by the application and can be accessed via app.editor.

In future versions, more fine-grained property editors (such as corner radius, shapes, and paths) will be added. Currently, it cannot be mixed with auto layout elements.

## Install Plugin 

You need to install the editor plugin and the resize plugin to use it. Visit GitHub repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/editor
npm install @leafer-in/resize
```

sh

```
pnpm add @leafer-in/editor
pnpm add @leafer-in/resize
```

sh

```
yarn add @leafer-in/editor
yarn add @leafer-in/resize
```

sh

```
bun add @leafer-in/editor
bun add @leafer-in/resize
```

Or include via script tag and access plugin APIs through the global variable `LeaferIN.editor`.

editor.mineditor

html

```
<script src="https://unpkg.com/@leafer-in/editor@2.2.0/dist/editor.min.js"></script>
<script src="https://unpkg.com/@leafer-in/resize@2.2.0/dist/resize.min.js"></script>
<script>
  const { Editor } = LeaferIN.editor
</script>
```

html

```
<script src="https://unpkg.com/@leafer-in/editor@2.2.0/dist/editor.js"></script>
<script src="https://unpkg.com/@leafer-in/resize@2.2.0/dist/resize.js"></script>
<script>
  const { Editor } = LeaferIN.editor
</script>
```

## Key Properties 

### target：`UI` | `UI`[] 

Sets the elements to be edited. By default, editable elements are automatically selected via the selection editor (no need to set `draggable`).

### element: `UI` 

A unique representative of the selected element (read-only). You can directly use the layout and transform methods of the element to manipulate the edit box.

For single selection, it is the selected element. For multi-selection, it is a proxy element used to synchronize the layout of the edit box.

### config: `IEditorConfig` 

Editor configuration, passed during initialization via `editor: {}`.

It can be updated at runtime via app.editor.config. In special cases, call updateEditTool() to apply changes immediately.

## Secondary Properties 

### hoverTarget: `UI` 

Hover element, automatically selected via the selection editor by default.

### targetLeafer: `Leafer` 

The leafer layer instance containing the first target element (read-only).

### dimTarget: `Group` | `Group`[] 

Defines the scope of elements affected by dimOthers. Supports arrays. Defaults to `targetLeafer`.

### mergeConfig: `IEditorConfig` 

The actual merged editor configuration (read-only), combining config and element-level editConfig. Access may have performance cost.

### mergedConfig: `IEditorConfig` 

Cached version of `mergeConfig`, safe for frequent access.

## More Properties 

| Name | Description |
| --- | --- |
| visible | Whether the editor is visible; when hidden, interaction is disabled |
| hittable | Whether the editor responds to interaction events |
| single | Whether only one element is selected |
| multiple | Whether multiple elements are selected |
| editing | Whether in editing state |
| innerEditing | Whether in inner editing state (double-click into text/path editing) |
| groupOpening | Whether a group is opened for editing |
| dragging | Whether the editor is being dragged |
| gesturing | Whether touch gestures are active |
| moving | Whether moving |
| resizing | Whether resizing |
| rotating | Whether rotating |
| skewing | Whether skewing |
| list | Selected element list (read-only) |
| leafList | High-performance selected list object |
| openedGroupList | Opened group list object |
| buttons | Button group at bottom of editor |
| editBox | Edit box container |
| editTool | Current edit tool |
| innerEditor | Current inner editor |
| selector | Selection handler |

## Key Methods 

| Name | Description |
| --- | --- |
| select() | Select elements |
| cancel() | Cancel selection |
| hasItem() | Check if item is selected |
| addItem() | Add item to selection |
| removeItem() | Remove item from selection |
| group() | Group selected elements |
| ungroup() | Ungroup selected elements |
| openGroup() | Open group (simulate double click) |
| closeGroup() | Close group |
| getInnerEditor() | Get inner editor instance |
| openInnerEditor() | Open inner editor |
| closeInnerEditor() | Close inner editor |
| lock() | Lock selected elements |
| unlock() | Unlock selected elements |
| toTop() | Bring to top within group |
| toBottom() | Send to bottom within group |
| update() | Update editor layout and style |
| updateEditBox() | Update edit box alignment |
| getEditTool() | Get edit tool instance |
| updateEditTool() | Update edit tool |
| move() | Move elements (incremental) |
| flip() | Flip elements along axis |
| scaleOf() | Scale around origin |
| rotateOf() | Rotate around origin |
| skewOf() | Skew around origin |

## Editor Configuration 

### Base     Event     Style     Buttons     Cursor     Select     Control     Enable     Inner Editor 

### Resize behavior 

The editor modifies element width/height and path coordinates by default, similar to professional design tools.

It also supports resizing via `fontSize` or scaling attributes. See editSize.

## Utilities 

### Shortcut Keys 

### History 

## Events 

Editor operation events can be listened to via `app.editor.on()`.

It also supports hooks like `beforeMove`, `beforeScale`, and `beforeRotate`.

| Name | Description |
| --- | --- |
| EditorEvent | Select / hover events |
| EditorMoveEvent | Move events |
| EditorScaleEvent | Resize events |
| EditorRotateEvent | Rotate events |
| EditorSkewEvent | Skew events |
| EditorGroupEvent | Group events |
| InnerEditorEvent | Inner editor events |

## Edit Tools 

Used for editing element size and shape. Automatically loaded when elements are selected.

### EditTool 

### LineEditTool 

### Custom Edit Tool 

## Inner Editors 

Used for editing text, paths, and other internal details via double-click.

### InnerEditor 

### Custom Inner Editor 

## Inheritance 

### Editor  >  Group  >  UI 

## Getting Started 

1. Click to select elements (supports multi-select and box select).
2. Drag control points or edges to resize elements.
3. Drag outside control points to rotate elements.

Hold `Ctrl` / `Command` to skew elements by dragging edges.

Note

The editor must be used inside an App. By passing `editor` configuration, `app.editor` and layered structure (`app.tree`, `app.sky`) are automatically created, and the editor is mounted to the sky layer.

editorimplementation

ts

```
// #图形编辑器 [简洁创建]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}  //  配置 editor 会自动创建并添加 app.editor 实例、tree 层、sky 层
})

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100))
```

ts

```
// #图形编辑器 [实现原理]
import { App, Rect } from 'leafer-ui'
import { Editor } from '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window }) 

app.tree = app.addLeafer({ type: 'design' }) // 添加 tree 层
app.sky = app.addLeafer() // 添加 sky 层

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100))

app.sky.add(app.editor = new Editor())  // 添加图形编辑器，用于选中元素进行编辑操作
```

## Examples 

### Click to select elements 

Elements must have the editable property to be selectable. You can access the editor via `app.editor`.

ts

```
// #图形编辑器 [editable]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100) 
const rect2 = Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100)

app.tree.add(rect1)
app.tree.add(rect2)
```

### Rotation handle 

ts

```
// #图形编辑器 [显示旋转控制点]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: { circle: {} }
})

const rect = Rect.one({ editable: true, fill: '#32cd79', cornerRadius: 30 }, 100, 100)
app.tree.add(rect)

app.editor.select(rect)
```

### Middle control points 

ts

```
// #图形编辑器 [显示中间控制点，并修改样式]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {
        point: { cornerRadius: [0, 0, 10, 0] },
        middlePoint: { width: 12, height: 4, cornerRadius: 2 }
    }
})

const rect = Rect.one({ editable: true, fill: '#32cd79', cornerRadius: 30 }, 100, 100)
app.tree.add(rect)

app.editor.select(rect)
```

### Fixed bottom buttons 

ts

```
// #图形编辑器 [添加底部固定按钮]
import { App, Rect, Box, PointerEvent } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: { buttonsFixed: true }
})

const rect = Rect.one({ editable: true, fill: '#32cd79' }, 100, 100)
app.tree.add(rect)
app.tree.add(Rect.one({ editable: true, fill: '#32cd79' }, 100, 300))

const button = Box.one({  // [!code hl:9] // 添加移除按钮
    around: 'center',
    fill: '#FEB027',
    cornerRadius: 20,
    cursor: 'pointer',
    children: [{ tag: 'Text', fill: 'white', text: '移除', padding: [7, 10] }]
})

app.editor.buttons.add(button)

button.on(PointerEvent.TAP, () => { // 点击删除元素，并取消选择
    app.editor.list.forEach(rect => rect.remove())
    app.editor.target = null
})

app.editor.select(rect)
```

### Selection events 

select.tsselect.js

ts

```
// #图形编辑器 [选中元素事件]
import { App, Rect } from 'leafer-ui'
import { EditorEvent } from '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 100, 100))
app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 300, 100))

app.editor.on(EditorEvent.SELECT, (e: EditorEvent) => {
    console.log(e.editor.list)
})
```

js

```
import { App, Rect } from 'leafer-ui'
import { EditorEvent } from '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 100, 100))
app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 300, 100))

app.editor.on(EditorEvent.SELECT, (e) => {
    console.log(e.editor.list)
})
```

### Rotate manually 

ts

```
// #图形编辑器 [手动旋转元素]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100)

app.tree.add(rect)
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', rotation: 10, cornerRadius: [0, 20, 20, 0] }, 300, 100))


app.editor.select(rect) // 选中 rect

setTimeout(() => {

    // 手动旋转到45度 
    const rotation = 45

    // 围绕中心旋转到指定 rotation， 需减去元素的 rotation，如下：
    app.editor.rotateOf('center', rotation - rect.rotation)

}, 2000)
```

### Create mode 

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

### Transparent grid canvas 

ts

```
// #图形编辑器 [背景为透明方格的画板]
import { App, Frame, Rect, Platform } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    fill: '#333',
    editor: {},  //  配置 editor 会自动创建并添加 app.editor 实例、tree 层、sky 层
})

// 平铺的透明方格
const svg = Platform.toURL(
    `<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
<rect x="0" y="0" width="5" height="5" fill="#FFF"/><rect x="5" y="0" width="5" height="5" fill="#CCC"/>
<rect x="0" y="5" width="5" height="5" fill="#CCC"/><rect x="5" y="5" width="5" height="5" fill="#FFF"/>
</svg>`, 'svg',)


app.tree.add(Frame.one({ // 背景为透明方格的画板
    fill: {
        type: 'image',
        url: svg,
        mode: 'repeat',
        scaleFixed: 'zoom-in' // true // 固定平铺图比例，不随画布缩放
    },
    shadow: {
        x: 0,
        y: 3,
        blur: 15,
        color: '#0009',
        scaleFixed: 'zoom-in' // 固定阴影比例，不随画布放大
    },
    children: [
        Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100)
    ]
}, 100, 100, 500, 600))
```

### Mobile gesture interactions 

ts

```
// #图形编辑器 [手势操作元素]
import { App, Rect, Frame } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件

const app = new App({
    view: window,
    fill: '#333',
    mobile: true, // 适配移动端
    // multiTouch: {  singleGesture: true }, // 可配置锁定单一手势操作
    editor: { moveable: 'gesture', resizeable: 'gesture', rotateable: 'gesture' }  //  编辑元素支持手势操作
})

app.tree.add(Frame.one({ // 页面内容
    children: [
        Rect.one({ editable: true, fill: '#FEB027', dragBounds: 'parent', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100)
    ]
}, 100, 100, 500, 600))
```
