<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/editOuter/load.html -->

# Custom Control Points 

The second step of customizing the edit tool is: **custom control points**.

Control points are generally used to control the shape of elements, such as controlling the four corners of a rounded rectangle or the number of sides of a polygon.

## Custom Steps 

### 1. Create control points 

Create custom control points in the `constructor()` or `onCreate()` method (optional).

This method is automatically called when the edit tool instance is created.

### 2. Load control points 

Add control points to the view in the `onLoad()` method.

When the user selects an element, the edit tool switches and this method is automatically called to load the control points.

### 3. Update control points 

Update the position and state of control points in the `onUpdate()` method.

This method is automatically called when the user interacts with the view or elements.

### 4. Unload control points 

Remove control points from the view in the `onUnload()` method.

This method is automatically called when the user switches to another edit tool.

## Inheritance 

### EditTool 

## Example 

index.tsindex.js

ts

```
import { Box, DragEvent } from 'leafer-ui'
import { EditTool, Editor, registerEditTool } from '@leafer-in/editor'


@registerEditTool()
export class CustomEditTool extends EditTool {

    public get tag() { return 'CustomEditTool' }

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
import { Box, DragEvent } from 'leafer-ui'
import { EditTool, registerEditTool } from '@leafer-in/editor'


export class CustomEditTool extends EditTool {

    get tag() { return 'CustomEditTool' }
 
    onCreate() {  // 1. 创建控制点
        this.view.add( this.point = new Box()) // 可以添加多个
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

CustomEditTool.registerEditTool()
```

## Next Step 

### Using Edit Tool 
