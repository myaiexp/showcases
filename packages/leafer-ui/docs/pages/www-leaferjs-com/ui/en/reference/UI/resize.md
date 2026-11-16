<!-- source: https://www.leaferjs.com/ui/en/reference/UI/resize.html -->

# resize 

Adjust the bounding box size of an element or Group.

It resizes the bounding box by modifying width/height, paths, font size, etc., instead of using scale.

The resize plugin is required. The graphic editor and auto layout will install this plugin automatically.

## Key Methods 

### resizeWidth ( width: `number`, relative?: `ILocationType` = 'inner' ) 

Resize the bounding box width of an element or Group.

If the element’s lockRatio is `true`, the height will be adjusted proportionally.

ts

```
type ILocationType = 'world' | 'page' | 'local' | 'inner' // coordinate systems
```

### resizeHeight ( height: `number`, relative?: `ILocationType` = 'inner' ) 

Resize the bounding box height of an element or Group.

If the element’s lockRatio is `true`, the width will be adjusted proportionally.

## Helper Method 

### scaleResize ( scaleX: `number`, scaleY = scaleX ) 

Convert scale operations into width/height changes incremental operation.

The graphic editor plugin uses this method when resizing elements.

## Box / Frame Elements 

### resizeChildren: `boolean` 

Whether children of Box / Frame follow resize. Defaults to `false`.

Group forces children to follow resize automatically, so this property is not needed.

## Text Element 

### resizeFontSize: `boolean` 

Whether auto-sized text resizes by changing font size. Defaults to `false`.

## Helper Property 

### lockRatio: `boolean` 

Whether to lock the aspect ratio of the element. Defaults to `false`.

## Other Resize Methods 

The following methods support an optional `resize: boolean` parameter, which converts scale operations into width/height adjustments.

### setTransform () 

### transform () 

### scaleOf () 

### skewOf () 

### transformWorld () 

### scaleOfWorld () 

### skewOfWorld () 

### dropTo () 

Convert scaling into width/height operations.

## Belongs to 

### UI Element 

## Example 

### Resize a Group without using the scale property 

LeaferApp

ts

```
// #调整 Group 大小，不使用 scale 属性 (Leafer)
import { Leafer, Group, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/resize' // 导入 resize 插件

const leafer = new Leafer({ view: window })

const group = new Group({
    children: [
        new Rect({
            width: 100,
            height: 100,
            fill: '#32cd79',
            draggable: true
        }),
        new Ellipse({
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            innerRadius: 0.5,
            fill: "#FEB027"
        })
    ]
})

leafer.add(group)

setTimeout(() => {

    // resize group
    group.resizeWidth(200)  
    group.resizeHeight(200)

}, 1000)
```

ts

```
// #调整 Group 大小，不使用 scale 属性 (Leafer)
import { Leafer, Group, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/resize' // 导入 resize 插件

const leafer = new Leafer({ view: window })

const group = new Group({
    children: [
        new Rect({
            width: 100,
            height: 100,
            fill: '#32cd79',
            draggable: true
        }),
        new Ellipse({
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            innerRadius: 0.5,
            fill: "#FEB027"
        })
    ]
})

leafer.add(group)

setTimeout(() => {

    // resize group
    group.resizeWidth(200)  
    group.resizeHeight(200)

}, 1000)
```

### Add resize parameter to scaleOf 

ts

```
// #图形编辑器 [添加底部固定按钮]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 0, 0, 100, 100)

app.tree.add(rect)


const resize = true

rect.scaleOf({ x: 0, y: 0 }, 2, 2, resize) // scale值将转为宽高

console.log(rect.scaleX, rect.scaleY, rect.width, rect.height)  // 1, 1, 200, 200
```
