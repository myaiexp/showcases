<!-- source: https://www.leaferjs.com/ui/en/reference/UI/editable.html -->

# editable 

Element editing properties.

Note

You need to install the editor plugin to use this feature, or directly install leafer-editor (which already includes editor-related plugins).

## Key Properties 

### editable: `boolean` | `'single'` 

Whether the element is editable. Default is `false`.

This includes draggable behavior, so you do not need to set `draggable` again.

When set to `'single'`, only this element can be selected.

### locked: `boolean` 

Whether the element is locked. Default is `false`.

Locked elements cannot be moved, edited, or selected.

### widthRange: `IRangeSize` 

Limits the width range of the element (currently only effective when selecting a single element in the editor).

The editor also supports the beforeScale event hook to constrain width.

ts

```
interface IRangeSize {
  min?: number
  max?: number
}

rect.widthRange = { min: 10, max: 200 }
```

### heightRange: `IRangeSize` 

Limits the height range of the element (currently only effective when selecting a single element in the editor).

The editor also supports the beforeScale event hook to constrain height.

ts

```
interface IRangeSize {
  min?: number
  max?: number
}

rect.heightRange = { min: 10, max: 200 }
```

### lockRatio: `boolean` 

Whether to lock the aspect ratio of the element. Default is `false`.

You can also configure this globally in the editor via global settings.

## Resize 

### resize element / group 

## Editor Configuration Properties 

### editConfig: `IEditorConfig` 

Element-specific editor configuration.

ts

```
// #图形编辑器 [editConfig]
import { Text } from 'leafer-ui'

// 1. 设置类，所有 Text 元素生效，不会导出json（推荐）
Text.setEditConfig({
    editSize: 'scale' // 使用对象
})

Text.setEditConfig(function (text: Text) {
    return {  // 使用函数返回对象，可增加业务逻辑分流
        editSize: text.get('width') ? 'size' : 'scale'
    }
})

// 2. 设置单个元素，不会导出json
const text = new Text({ text: 'hello', editable: true })
Object.defineProperty(text, 'editConfig', {
    get() { return { moveable: false } }
})

// 3. 设置单个元素，支持导出json，会增加内存开销
new Text({
    text: 'hello',
    editable: true,
    editConfig: { moveable: false }
})
```

### editOuter: `string` 

The outer shape editing tool, typically used for resizing and shape adjustment. Default is `'EditTool'`.

For Line, the default is `'LineEditTool'`. You can also customize edit tools.

ts

```
// #图形编辑器 [editOuter]
import { Text } from 'leafer-ui'

// 1. 设置类，所有 Text 元素生效（推荐）
Text.setEditOuter('TextEditTool')

Text.setEditOuter(function (text: Text) {
    // 使用函数返回名称，可增加业务逻辑分流
    return text.get('width') ? 'EditTool' : 'TextEditTool'
})

// 2. 设置单个元素，不会导出json
const text = new Text({ text: 'hello', editable: true })
Object.defineProperty(text, 'editOuter', {
    get() { return 'TextEditTool' }
})

// 2. 设置单个元素，支持导出json，会增加内存开销
new Text({
    text: 'hello',
    editable: true,
    editOuter: 'TextEditTool'
})
```

### editInner: `string` 

The inner detail editor, typically used for editing paths and text. Default is `'PathEditor'`.

For Text, the default is `'TextEditor'`. You can customize inner editors.

ts

```
// #图形编辑器 [editInner]
import { Text } from 'leafer-ui'

// 1. 设置类，所有 Text 元素生效，不会导出json（推荐）
Text.setEditInner('TextEditor')

Text.setEditInner(function (text: Text) {
    // 使用函数返回名称，可增加业务逻辑分流
    return text.get('width') ? 'PathEditor' : 'TextEditor'
})

// 2. 设置单个元素，不会导出json
const text = new Text({ text: 'hello', editable: true })
Object.defineProperty(text, 'editInner', {
    get() { return 'TextEditor' }
})

// 3. 设置单个元素，支持导出json，会增加内存开销
new Text({
    text: 'hello',
    editable: true,
    editInner: 'TextEditor'
})
```

## Belongs to 

### UI Elements 

## Examples 

### Only editable elements can be selected 

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

### Editable elements with custom hover styles 

ts

```
// #图形编辑器 [元素单独配置hover样式]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}  //  配置 editor 会自动创建并添加 app.editor 实例、tree 层、sky 层
})

app.tree.add(Rect.one({
    editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20],
    editConfig: { hoverStyle: { stroke: 'red' } }, // 单独配置 hover 编辑样式
}, 100, 100))

app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100))
```
