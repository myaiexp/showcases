<!-- source: https://www.leaferjs.com/ui/en/reference/display/Frame.html -->

# Frame Element 

Create a canvas/artboard. It extends Box and has a default white background. Content exceeding its width and height will be clipped, similar to a webpage in HTML5. It is commonly used to create artboards in design applications.

  

Inheritance

Frame  >  Box  >  Group, Rect  >  UI

## Key Properties 

### width: `number` 

Width.

### height: `number` 

Height.

### fill: `string` | `Paint` ｜ `Paint`[] 

Default background is white. To make it transparent, you can set an empty string or `'#FFF0'`.

### overflow: `IOverflow` 

Controls how content exceeding width and height is displayed. Defaults to `hide`.

When set to `'scroll'`, you need to install the Box Scroll Advanced Plugin.

ts

```
type IOverflow =
  | 'show' // show
  | 'hide' // hide
  | 'scroll' // show scrollbars
  | 'x-scroll' // only horizontal scrollbar
  | 'y-scroll' // only vertical scrollbar
```

## Editor Properties 

### resizeChildren: `boolean` 

Whether child elements resize along with the Frame. Defaults to `false`.

## Computed Properties (read-only) 

### isOverflow: `boolean` 

Whether child elements overflow the boxBounds. This value is available only after Box layout is completed.

### scrollWorldTransform: `IMatrixWithScaleData` 

The transformation matrix of the scroll area relative to world coordinates, including scaleX and scaleY.

If scrolling does not exist, it returns the element’s worldTransform matrix.

## Inheritance 

### Frame  >  Box  >  Group, Rect  >  UI 

## Examples 

### Create Artboard 

LeaferApp

ts

```
// #创建 Frame [标准创建 (Leafer)]
import { Leafer, Frame, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window, fill: '#333' })

const frame = new Frame({
    width: 100,
    height: 100
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#32cd79',
    draggable: true
})

leafer.add(frame)
frame.add(circle)
```

ts

```
// #创建 Frame [标准创建 (App)]
import { App, Frame, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {}, fill: '#333' })

const frame = new Frame({
    width: 100,
    height: 100,
    hitChildren: false, // 阻止直接选择子元素（防止父子选择冲突，可双击进入组内选择子元素）
    editable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#32cd79',
    editable: true
})

app.tree.add(frame)
frame.add(circle)
```
