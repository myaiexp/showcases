<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/editInner/load.html -->

# Custom Control Points 

The second step of customizing the internal editor is: **custom control points**.

Control points are generally used to adjust path nodes. Text editors need to replace control points by creating DOM elements, allowing full customization.

## Custom Steps 

### 1. Create control points 

Create custom control points in the `constructor()` or `onCreate()` method.

This method is automatically called when the internal editor instance is created.

### 2. Load control points 

Add control points to the view in the `onLoad()` method.

When the user double-clicks an element, the internal editor opens and this method is automatically called to load the control points.

### 3. Update control points 

Update the position and state of control points in the `onUpdate()` method.

This method is automatically called when the user interacts with the view or elements.

### 4. Unload control points 

Remove control points from the view in the `onUnload()` method.

This method is automatically called when the user exits the internal editor.

Path editors generally exit via a confirm button click, while text editors usually exit automatically when clicking outside the page.

## Inheritance 

### InnerEditor 

## Example 

index.tsindex.js

ts

```
import { Box, DragEvent } from 'leafer-ui'
import { InnerEditor, Editor, registerInnerEditor } from '@leafer-in/editor'


@registerInnerEditor()
export class CustomEditor extends InnerEditor {

    public get tag() { return 'CustomEditor' }

    public point: Box

    constructor(editor: Editor) {
        super(editor)

        // 1. 创建控制点
        this.view.add(this.point = new Box()) // 可以添加多个
        this.eventIds = [
            this.point.on_(DragEvent.DRAG, () => { console.log('drag point') })
        ]
    }

    public onLoad(): void { // 2. 载入控制点
        this.point.set({ ...this.editBox.getPointStyle(), strokeWidth: 1 })
        this.editBox.add(this.view) // 添加在 editor 或 editBox 中都可以， 注意editBox本身具有定位
    }

    public onUpdate(): void {   // 3. 更新控制点
        const { boxBounds, worldTransform } = this.editor.element // 单个选中时 element 代表选中的元素
        const { x, y } = boxBounds, { scaleX, scaleY } = worldTransform
        this.point.set({ x: (x + 15) * Math.abs(scaleX), y: (y + 15) * Math.abs(scaleY) })
    }

    public onUnload(): void {  // 4. 卸载控制点
        this.editBox.remove(this.view)
    }

    public onDestroy(): void {
        this.point = null
    }

}
```

js

```
import { Box, Group, DragEvent } from 'leafer-ui'
import { InnerEditor } from '@leafer-in/editor'


export class CustomEditor extends InnerEditor {

    get tag() { return 'CustomEditor' }

    onCreate() {  // 1. 创建控制点
        this.view.add(this.point = new Box()) // 可以添加多个
        this.eventIds = [
            this.point.on_(DragEvent.DRAG, () => { console.log('drag point') })
        ]
    }

    onLoad() { // 2. 载入控制点
        this.point.set({ ...this.editBox.getPointStyle(), strokeWidth: 1 })
        this.editBox.add(this.view) // 添加在 editor 或 editBox 中都可以， 注意editBox本身具有定位
    }

    onUpdate() {   // 3. 更新控制点
       const { boxBounds, worldTransform } = this.editor.element // 单个选中时 element 代表选中的元素
        const { x, y } = boxBounds, { scaleX, scaleY } = worldTransform
        this.point.set({ x: (x + 15) * Math.abs(scaleX), y: (y + 15) * Math.abs(scaleY) })
    }

    onUnload() {  // 4. 卸载控制点
        this.editBox.remove(this.view)
    }

    onDestroy() {
        this.point = null
    }

}

CustomEditor.registerInnerEditor()
```

## Next Step 

### Using the Internal Editor 
