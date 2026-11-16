<!-- source: https://www.leaferjs.com/ui/en/reference/display/Box.html -->

# Box Element 

Create a Box. It combines the functionality of Group and the visual styling of Rect. Similar to a DIV in HTML5, it can be nested continuously.

  

Inheritance

Box  >  Group, Rect  >  UI

## Key Properties 

### width: `number` 

Width. If not set or set to `undefined`, it will automatically adapt to its content.

You can use the isAutoWidth property to determine whether it is auto width.

### height: `number` 

Height. If not set or set to `undefined`, it will automatically adapt to its content.

You can use the isAutoHeight property to determine whether it is auto height.

### overflow: `IOverflow` 

Controls how content exceeding the width and height is displayed. Defaults to `'show'`.

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

## Scroll Properties 

Used for scrolling internal elements in Box / Frame, enabling scrollbar behavior.

### scrollX: `number` 

Scroll amount of internal elements along the x-axis.

### scrollY: `number` 

Scroll amount of internal elements along the y-axis.

### scrollConfig: `IScrollConfig` 

Configuration for scrollbar style and behavior. Requires installation of the Box Scroll Advanced Plugin.

ts

```
interface IScrollConfig {
  theme?: IScrollTheme // scrollbar theme, can be custom registered
  style?: IBoxInputData // scrollbar style, supports Box visual styles
  size?: number // scrollbar size
  cornerRadius?: number // scrollbar corner radius, defaults to half of size
  endsMargin?: number // margin at both ends of scrollbar
  sideMargin?: number // margin on both sides
  minSize?: number // minimum visible size
  scaleFixed?: IScaleFixed // whether scale keeps original proportion
  scrollType?: 'drag' | 'move' | 'both' // scroll mode
  stopDefault?: boolean // whether to prevent default viewport scrolling
  hideOnActionEnd?: boolean | 'hover' | 'scroll' // auto-hide behavior after interaction
}

type IScrollTheme = 'light' | 'dark' | (string & {})

// whether scale keeps original proportion during zoom
// zoom-in means only preserve proportion when zooming in
type IScaleFixed = boolean | 'zoom-in'
```

## Editor Properties 

### textBox: `boolean` 

Whether this is a text box. Defaults to `false`.

When enabled, you can double-click the Box element in the editor to directly edit its internal editable child text. Suitable for input fields, sticky notes, mind maps, and flowchart text editing scenarios.

### resizeChildren: `boolean` 

Whether child elements resize together with the Box. Defaults to `false`.

Child Text elements need to enable resizeFontSize to scale their font size accordingly.

## Computed Properties (read-only) 

### isOverflow: `boolean` 

Whether child elements overflow the boxBounds. This value is available only after Box layout is completed.

### scrollWorldTransform: `IMatrixWithScaleData` 

The transformation matrix of the scroll area relative to world coordinates, including scaleX and scaleY.

If scrolling does not exist, it returns the element’s worldTransform matrix.

## Path Mode 

### Path priority mode 

## Inheritance 

### Box  >  Group, Rect  >  UI 

## Examples 

### Create a Box 

LeaferApp

ts

```
// #创建 Box [标准创建 (Leafer)]
import { Leafer, Box, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window, fill: '#333' })

const box = new Box({
    width: 100,
    height: 100,
    fill: '#FF4B4B'
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    draggable: true
})

leafer.add(box)
box.add(circle)
```

ts

```
// #创建 Box [标准创建 (App)]
import { App, Box, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {}, fill: '#333' })

const box = new Box({
    width: 100,
    height: 100,
    fill: '#FF4B4B',
    hitChildren: false, // 阻止直接选择子元素（防止父子选择冲突，可双击进入组内选择子元素）
    editable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    editable: true
})

app.tree.add(box)
box.add(circle)
```

### Hide overflow content 

LeaferApp

ts

```
// #创建 Box [隐藏超出宽高的内容 (Leafer)]
import { Leafer, Box, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window, fill: '#333' })

const box = new Box({
    width: 100,
    height: 100,
    fill: '#FF4B4B',
    overflow: 'hide'
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    draggable: true
})

leafer.add(box)
box.add(circle)
```

ts

```
// #创建 Box [隐藏超出宽高的内容 (App)]
import { App, Box, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {}, fill: '#333' })

const box = new Box({
    width: 100,
    height: 100,
    fill: '#FF4B4B',
    overflow: 'hide',
    hitChildren: false, // 阻止直接选择子元素（防止父子选择冲突，可双击进入组内选择子元素）
    editable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    editable: true
})

app.tree.add(box)
box.add(circle)
```

### Create a self-adaptive background text 

LeaferApp

ts

```
// #创建 Box [自适应文本 (Leafer)]
import { Leafer, Box } from 'leafer-ui'

const leafer = new Leafer({ view: window, fill: '#333' })

// Box 不设置宽高时，将自适应内容
const box = new Box({
    x: 100,
    y: 100,
    fill: '#FF4B4B',
    cornerRadius: 20,
    children: [{
        tag: 'Text',
        text: 'Welcome to LeaferJS',
        fill: 'black',
        padding: [10, 20],
        textAlign: 'left',
        verticalAlign: 'top'
    }]
})

leafer.add(box)
```

ts

```
// #创建 Box [自适应文本 (App)]
import { App, Box } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/text-editor' // 导入文本编辑插件 


const app = new App({ view: window, editor: {}, fill: '#333' })

// Box 不设置宽高时，将自适应内容
const box = new Box({
    x: 100,
    y: 100,
    fill: '#FF4B4B',
    cornerRadius: 20,
    textBox: true,
    hitChildren: false, // 阻止直接选择子元素（防止父子选择冲突，可双击进入组内选择子元素）
    editable: true,
    resizeChildren: true, // 同时 resize 文本
    children: [{
        tag: 'Text',
        text: 'Welcome to LeaferJS',
        fill: 'black',
        padding: [10, 20],
        textAlign: 'left',
        verticalAlign: 'top'
    }]
})

app.tree.add(box)
```
