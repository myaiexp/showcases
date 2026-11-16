<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/Editor/transform.html -->

# Transform 

By default, the editor allows visual manipulation of elements (move, scale, rotate). You can also manually control them using the methods below.

## Key Methods 

You can also directly use the layout property methods of the element to move and transform the editor frame.

### move(x: `number` | `IPointData`, y = 0): void 

Translate selected elements as an incremental operation. Supports passing a point object.

### flip(axis: `'x'` | `'y'`) 

Mirror/flip selected elements along the specified axis (in world coordinate system).

### scaleOf(origin: `IAlign` | `IPointData`, multiplyScaleX: `number`, multiplyScaleY = scaleX) 

Scale selected elements around the origin of the element (in box coordinates) as an incremental operation.

### rotateOf(origin: `IAlign` | `IPointData`, addRotation: `number`) 

Rotate selected elements around the origin of the element (in box coordinates) as an incremental operation.

### skewOf(origin: `IAlign` | `IPointData`, addSkewX: `number`, addSkewY = 0) 

Skew selected elements around the origin of the element (in box coordinates) as an incremental operation.

ts

```
// current selected element
const { element } = app.editor

// To scale to a target scale, divide by current scale:
app.editor.scaleOf('center', 1.5 / element.scale)

// To rotate to a target rotation, subtract current rotation:
app.editor.rotateOf('center', 45 - element.rotation)

// To skew to a target skewX, subtract current skewX:
app.editor.skewOf('center', 45 - element.skewX)
```

## Belongs to 

### Editor Element 

## Example 

### Manually rotate element 

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
