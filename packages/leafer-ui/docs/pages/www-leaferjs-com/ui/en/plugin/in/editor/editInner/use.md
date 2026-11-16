<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/editInner/use.html -->

# Using the Internal Editor 

The third step of customizing the internal editor is: **using the internal editor**.

Elements of the same type generally use the same internal editor.

## Usage Steps 

### 1. Set internal editor 

Use the element’s static method `setEditInner()` to set the name of the internal editor.

Implementation: this automatically modifies the getter method of the element’s `editInner` property. A function can also be passed in.

### 2. Run and test 

After selecting and double-clicking an element, the internal editor will open. It includes a control point and a confirm button.

Dragging this control point will print logs to the console, and it will follow movement when scaling the viewport.

Clicking the confirm button will exit the internal editor.

## FAQ 

### 1. Cannot access custom property value? 

Add the createAttr() decorator to custom properties. This resolves issues where, due to JS class inheritance execution order and overridden internal methods, property values cannot be accessed.

## Inheritance 

### InnerEditor 

## Example 

index.tsindex.js

ts

```
// #图形编辑器 [自定义内部编辑工具]
import { App, Star, Box, DragEvent, PointerEvent } from 'leafer-ui'
import { InnerEditor, Editor, registerInnerEditor } from '@leafer-in/editor'


@registerInnerEditor()
export class CustomEditor extends InnerEditor {

    public get tag() { return 'CustomEditor' }

    public point: Box
    public closeBtn: Box

    constructor(editor: Editor) {
        super(editor)

        // 创建控制点
        this.point = new Box()
        this.closeBtn = new Box({ fill: '#FF4B4B', cornerRadius: 20, around: 'top', cursor: 'pointer', children: [{ tag: 'Text', text: '完成', padding: [10, 20] }] })
        this.view.addMany(this.point, this.closeBtn)
        this.eventIds = [
            this.point.on_(DragEvent.DRAG, () => { console.log('drag point') }),
            this.closeBtn.on_(PointerEvent.TAP, () => { this.editor.closeInnerEditor() }) // 关闭内部编辑器
        ]
    }

    public onLoad(): void {
        this.point.set({ ...this.editBox.getPointStyle(), strokeWidth: 1 })
        this.editBox.add(this.view) // 添加在 editor 或 editBox 中都可以， 注意editBox本身具有定位
    }

    public onUpdate(): void {
        const { boxBounds, worldTransform } = this.editor.element // 单个选中时 element 代表选中的元素
        const { x, y, height } = boxBounds, { scaleX, scaleY } = worldTransform
        this.point.set({ x: (x + 50) * Math.abs(scaleX), y: y * Math.abs(scaleY) })
        this.closeBtn.set({ x: (x + 50) * Math.abs(scaleX), y: (y + height) * Math.abs(scaleY) })
    }

    public onUnload(): void {
        this.editBox.remove(this.view)
    }

    public onDestroy(): void {
        this.point = this.closeBtn = null
    }

}


Star.setEditInner('CustomEditor') // 1. 为元素类设置内部编辑器
// Star.setEditInner(function (star: Rect) {
//     return star.pathInputed ? 'PathEditor' : 'CustomEditor' // 支持函数
// })


const app = new App({ view: window, editor: {} })

app.tree.addMany(
    Star.one({ editable: true, fill: '#FEB027' }, 100, 100),
    Star.one({ editable: true, fill: '#FFE04B' }, 300, 100)
)
```

js

```
import { App, Star, Box, Group,PointerEvent,DragEvent } from 'leafer-ui'
import { InnerEditor} from '@leafer-in/editor'


export class CustomEditor extends InnerEditor {

    get tag() { return 'CustomEditor' }

    onCreate() {
        this.point = new Box()
        this.closeBtn = new Box({ fill: '#FF4B4B', cornerRadius: 20, around: 'top', cursor: 'pointer', children: [{ tag: 'Text', text: '完成', padding: [10, 20] }] })
        this.view.addMany(this.point, this.closeBtn)
        this.eventIds = [
            this.point.on_(DragEvent.DRAG, () => { console.log('drag point') }),
            this.closeBtn.on_(PointerEvent.TAP, () => { this.editor.closeInnerEditor() }) // 关闭内部编辑器
        ]
    }

    onLoad() {
        this.point.set({ ...this.editBox.getPointStyle(), strokeWidth: 1 })
        this.editBox.add(this.view) // 添加在 editor 或 editBox 中都可以， 注意editBox本身具有定位
    }

    onUpdate() {
        const { boxBounds, worldTransform } = this.editor.element // 单个选中时 element 代表选中的元素
        const { x, y, height } = boxBounds, { scaleX, scaleY } = worldTransform
        this.point.set({ x: (x + 50) * Math.abs(scaleX), y: y * Math.abs(scaleY) })
        this.closeBtn.set({ x: (x + 50) * Math.abs(scaleX), y: (y + height) * Math.abs(scaleY) })
    }

    onUnload() {
        this.editBox.remove(this.view)
    }

    onDestroy() {
        this.point = this.closeBtn = null
    }
}

CustomEditor.registerInnerEditor()


Star.setEditInner('CustomEditor') // 1. 为元素类设置内部编辑器
// Star.setEditInner(function (star: Rect) {
//     return star.pathInputed ? 'PathEditor' : 'CustomEditor' // 支持函数
// })


const app = new App({ view: window, editor: {} })

app.tree.addMany(
    Star.one({ editable: true, fill: '#FEB027' }, 100, 100),
    Star.one({ editable: true, fill: '#FFE04B' }, 300, 100)
)
```

## Congratulations 🎉 

You have completed the basic learning of customizing the internal editor. Go ahead and try building it yourself~

### Custom Editing Tool 
