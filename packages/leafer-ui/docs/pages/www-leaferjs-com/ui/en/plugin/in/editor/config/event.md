<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/config/event.html -->

# Editor Configuration 

### Basic     Event     Style     Buttons     Cursor     Selection     Control     Enable     Inner Editor 

## 

Event-related configuration. Can be updated in real time during runtime via app.editor.config.

Each element also has an individual edit config that can override the global configuration in real time.

## Key Properties 

### keyEvent: `boolean` 

Whether to listen to keyboard events (e.g. arrow key movement). Default is `true`.

### arrowStep: `number` 

Movement step size for arrow keys. Default is `1`.

### arrowFastStep: `number` 

Movement step size when holding Shift. Default is `10`.

### multipleSelectKey: IShortcutKeysCheck 

Shortcut key hook for multi-selection.

ts

```
multipleSelectKey(event) {
    return event.shiftKey || event.ctrlKey // default is shiftKey
}
```

### rotateKey: IShortcutKeysCheck 

Shortcut key hook that switches resize handles into rotation mode.

ts

```
rotateKey(event) {
    return event.ctrlKey // default
}
```

### diagonalRotateKey: IShortcutKeysCheck 

Shortcut key hook for diagonal rotation.

ts

```
diagonalRotateKey(event) {
    return event.shiftKey // default
}
```

### beforeSelect: `IEditorBeforeSelect` 

Pre-hook before selecting elements. Only takes effect during initialization or when updating app.editor.config.

Parameter `data` is `{ target }`.

Return `false` to cancel selection. Return a `target` to modify selection data.

ts

```
beforeSelect(data) {
    const { target } = data // target can be single or multiple elements
    return true // return false | target
}
```

### beforeEditOuter: `IEditorEditOuterData` 

Pre-hook for opening external editor tools via editOuter.

Parameter `data` is `{ target, name }`, where `name` is the tool name (e.g. 'EditTool').

Return `false` to cancel. Return a string to override the tool name.

ts

```
beforeEditOuter(data) {
    const { target, name } = data
    return true // return false | name
}
```

### beforeEditInner: `IEditorEditInnerData` 

Pre-hook for opening inner editor via editInner.

Parameter `data` is `{ target, name }`, where `name` is the tool name (e.g. 'PathEditor').

Return `false` to cancel. Return a string to override the tool name.

ts

```
beforeEditInner(data) {
    const { target, name } = data
    return true // return false | name
}
```

---

### beforeMove: `IEditorBeforeMove` 

Pre-hook for move operations.

Parameter `data` is `{ target, x, y }`.

Return `false` to cancel. Return `{ x, y }` to modify movement.

ts

```
beforeMove(data) {
    const { target, x, y } = data
    return true // return false | { x, y }
}
```

### beforeScale: `IEditorBeforeScale` 

Pre-hook for resize operations.

Parameter `data` is `{ target, origin, scaleX, scaleY }`.

Return `false` to cancel. Return `{ scaleX, scaleY }` to modify scaling.

You can also limit size using widthRange and heightRange.

ts

```
beforeScale(data) {
    const { target, origin, scaleX, scaleY } = data
    return true // return false | { scaleX, scaleY }
}
```

### beforeRotate: `IEditorBeforeRotate` 

Pre-hook for rotation.

Parameter `data` is `{ target, origin, rotation }`.

Return `false` to cancel. Return a number to modify rotation.

ts

```
beforeRotate(data) {
    const { target, origin, rotation } = data
    return true // return false | rotation
}
```

### beforeSkew: `IEditorBeforeSkew` 

Pre-hook for skew operations.

Parameter `data` is `{ target, origin, skewX, skewY }`.

Return `false` to cancel. Return `{ skewX, skewY }` to modify skew.

ts

```
beforeSkew(data) {
    const { target, origin, skewX, skewY } = data
    return true // return false | { skewX, skewY }
}
```

### onCopy: `IEditorOnCopy` 

Return `true` if copy operation is executed (required).

See example.

ts

```
onCopy() {
    // clone elements
    return true
}
```

## Examples 

### Limit minimum edit size 

Implemented via the `beforeScale` pre-hook.

min sizeenable flip

ts

```
// #图形编辑器 [限制最小编辑尺寸 （resize 元素事件前置钩子函数）]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {
        lockRatio: true,
        beforeScale({ target, scaleX, scaleY }) {
            if (target.width * scaleX < 20 || target.height * scaleY < 20) {
                const scale = Math.min(20 / target.width, 20 / target.height)
                return { scaleX: scale, scaleY: scale }
            }
            return true
        }
    }
})

const rect = Rect.one({ editable: true, fill: '#32cd79', cornerRadius: 30 }, 100, 100)
app.tree.add(rect)

app.editor.select(rect)
```

ts

```
// #图形编辑器 [限制最小编辑尺寸，且支持镜像操作 （resize 元素事件前置钩子函数）]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {
        lockRatio: true,
        beforeScale({ target, scaleX, scaleY }) {
            if (target.width * Math.abs(scaleX) < 20 || target.height * Math.abs(scaleY) < 20) {
                const scale = Math.min(20 / target.width, 20 / target.height)
                return { scaleX: scaleX < 0 ? -scale : scale, scaleY: scaleY < 0 ? -scale : scale }
            }
            return true
        }
    }
})

const rect = Rect.one({ editable: true, fill: '#32cd79', cornerRadius: 30 }, 100, 100)
app.tree.add(rect)

app.editor.select(rect)
```

### Copy elements by holding Alt key while dragging 

ts

```
// #图形编辑器 [按住alt键移动可复制元素]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件 
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {
        onCopy() {  // 按住alt键移动可复制元素
            const list = app.editor.list.map(item => {
                const cloneItem = item.clone()
                item.parent.add(cloneItem)
                return cloneItem
            })
            app.editor.target = list.length > 1 ? list : list[0]
            return true
        }
    }
})

app.tree.add({ tag: 'Text', x: 150, y: 50, text: '按住alt键移动可复制元素', fill: '#999', fontSize: 16 })

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100))
```
