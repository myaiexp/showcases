<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/editOuter/use.html -->

# Using Edit Tool 

The third step of customizing an edit tool is: **using the edit tool**.

Elements of the same type generally use the same edit tool.

## Usage Steps 

### 1. Set edit tool 

Use the element’s static method `setEditOuter()` to set the edit tool name.

Implementation: this automatically modifies the getter method of the element’s `editOuter` property. A function can also be passed in.

### 2. Run and test 

After selecting an element, the edit tool will add a new control point.

Dragging this control point will print logs to the console, and it will follow movement when scaling the viewport.

## FAQ 

### 1. Cannot access custom property value? 

Add the createAttr() decorator to custom properties. This resolves issues where, due to JS class inheritance execution order and overridden internal methods, property values cannot be accessed.

## Inheritance 

### EditTool 

## Example 

index.tsindex.js

ts

```
// #图形编辑器 [自定义编辑工具]
import { App, Rect, Box, DragEvent } from 'leafer-ui'
import { EditTool, Editor, registerEditTool } from '@leafer-in/editor'


@registerEditTool()
export class CustomEditTool extends EditTool {

    public get tag() { return 'CustomEditTool' }

    public point: Box

    constructor(editor: Editor) {
        super(editor)

        // 创建控制点
        this.view.add(this.point = new Box()) // 可以添加多个
        this.eventIds = [
            this.point.on_(DragEvent.DRAG, () => { console.log('drag point') })
        ]
    }

    public onLoad(): void {
        this.point.set({ ...this.editBox.getPointStyle(), strokeWidth: 1 })
        this.editBox.add(this.view) // 添加在 editor 或 editBox 中都可以， 注意editBox本身具有定位
    }

    public onUpdate(): void {
        const { boxBounds, worldTransform } = this.editor.element // 单个选中时 element 代表选中的元素
        const { x, y } = boxBounds, { scaleX, scaleY } = worldTransform
        this.point.set({ x: (x + 15) * Math.abs(scaleX), y: (y + 15) * Math.abs(scaleY) })
    }

    public onUnload(): void {
        this.editBox.remove(this.view)
    }

    public onDestroy(): void {
        this.point = null
    }

}


Rect.setEditOuter('CustomEditTool') // 1. 为元素类绑定编辑工具
// Rect.setEditTool(function (rect: Rect) {
//     return rect.cornerRadius ? 'CustomEditTool' : 'EditTool' // 支持函数
// })


const app = new App({ view: window, editor: {} })

app.tree.addMany(
    Rect.one({ editable: true, fill: '#FEB027', cornerRadius: 20 }, 100, 100),
    Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: 20 }, 300, 100)
)
```

js

```
import { App, Rect, Box, DragEvent } from 'leafer-ui'
import { EditTool, registerEditTool } from '@leafer-in/editor'


export class CustomEditTool extends EditTool {

    get tag() { return 'CustomEditTool' }

    onCreate() { 
        this.view.add(this.point = new Box()) // 可以添加多个
        this.eventIds = [
            this.point.on_(DragEvent.DRAG, () => { console.log('drag point') })
        ]
    }

    onLoad() { 
        this.point.set({ ...this.editBox.getPointStyle(), strokeWidth: 1 })
        this.editBox.add(this.view) // 添加在 editor 或 editBox 中都可以， 注意editBox本身具有定位
    }

    onUpdate() {   
        const { boxBounds, worldTransform } = this.editor.element // 单个选中时 element 代表选中的元素
        const { x, y } = boxBounds, { scaleX, scaleY } = worldTransform
        this.point.set({ x: (x + 15) * Math.abs(scaleX), y: (y + 15) * Math.abs(scaleY) })
    }

    onUnload() {  
        this.editBox.remove(this.view)
    }

    onDestroy() {
       this.point = null
    }

}

CustomEditTool.registerEditTool() 


Rect.setEditOuter('CustomEditTool') // 1. 为元素类绑定编辑工具
// Rect.setEditTool(function (rect: Rect) {
//     return rect.cornerRadius ? 'CustomEditTool' : 'EditTool' // 支持函数
// })


const app = new App({ view: window, editor: {} })

app.tree.addMany(
    Rect.one({ editable: true, fill: '#FEB027', cornerRadius: 20 }, 100, 100),
    Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: 20 }, 300, 100)
)
```

## Congratulations 🎉 

You have completed the basic learning of customizing edit tools. Go ahead and try building it yourself~

### Custom Internal Editor 
