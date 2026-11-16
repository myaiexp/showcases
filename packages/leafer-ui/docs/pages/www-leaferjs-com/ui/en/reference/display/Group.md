<!-- source: https://www.leaferjs.com/ui/en/reference/display/Group.html -->

# Group Element 

Create a Group. It is used to combine multiple child elements. It has no visual styles such as fill or stroke. It supports properties like x, y, scale, rotation, etc. Child elements are positioned relative to it, and it can be nested continuously.

Inheritance

Group  >  UI

  

Note: The actual width and height depend on child elements. `width` / `height` cannot be set. Use bounds to get actual size information.

## Key Properties (readonly) 

### children: `UI`[] 

List of child elements. Cannot be modified directly.

When used in the graph editor, you must set hitChildren to `false`. Child elements can only be edited by double-clicking into the group.

## Editor Properties 

### resizeChildren: `boolean` 

Whether child elements resize along with the Group. Defaults to `true`.

## Auxiliary Properties 

### childlessJSON: `boolean` 

Whether to exclude child elements when exporting JSON (usually used for custom elements). Defaults to `false`.

## Key Methods 

### add ( child: `UI` | `UI`[] ) 

Add child elements. Multiple elements can be added at once: `add([child, child, ...])`.

### remove ( child: `UI`, destroy?: `boolean` ) 

Remove the specified child element. If `destroy` is `true`, the removed element will also be destroyed.

### remove ( ) 

Remove the current element.

### destroy ( ) 

Remove and destroy the current element, including all its children.

### clear ( ) 

Clear all child elements (remove and destroy them).

## Helper Methods 

### addAt ( child: `UI` | `UI`[], index: `number` ) 

Add child elements at a specified index, Now supports compatibility with the zIndex logic.

### addBefore ( child: `UI` | `UI`[], before: `UI` ) 

Add child elements before the specified element, Now supports compatibility with the zIndex logic.

### addAfter ( child: `UI` | `UI`[], after: `UI` ) 

Add child elements after the specified element, Now supports compatibility with the zIndex logic.

## Inheritance 

### Group  >  UI 

## Examples 

### Add via add method 

LeaferApp

ts

```
// #创建 Group [通过 add 方法添加 (Leafer)]
import { Leafer, Group, Rect, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79',
    draggable: true
})

const ellipse = new Ellipse({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: "#FEB027"
})

const group = new Group({
    x: 100,
    y: 100
})

group.add([rect, ellipse])

leafer.add(group)
```

ts

```
// #创建 Group [通过 add 方法添加 (App)]
import { App, Group, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79',
    editable: true
})

const ellipse = new Ellipse({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: "#FEB027",
    editable: true
})

const group = new Group({
    x: 100,
    y: 100,
    hitChildren: false, // 阻止直接选择子元素（防止父子选择冲突，可双击进入组内选择子元素）
    editable: true
})

group.add([rect, ellipse])

app.tree.add(group)
```

### Add via children property 

LeaferApp

ts

```
// #创建 Group [通过 children 属性添加 (Leafer)]
import { Leafer, Group, Rect, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 200,
    height: 200,
    fill: '#32cd79',
    draggable: true
})

const ellipse = new Ellipse({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: "white"
})

const group = new Group({
    x: 100,
    y: 100,
    children: [rect, ellipse]
})

leafer.add(group)
```

ts

```
// #创建 Group [通过 children 属性添加 (App)]
import { App, Group, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 200,
    height: 200,
    fill: '#32cd79',
    editable: true
})

const ellipse = new Ellipse({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: "white",
    editable: true
})

const group = new Group({
    x: 100,
    y: 100,
    children: [rect, ellipse],
    hitChildren: false, // 阻止直接选择子元素（防止父子选择冲突，可双击进入组内选择子元素）
    editable: true
})

app.tree.add(group)
```

### Create via tag object 

ts

```
// #创建元素 [使用 tag]
import { Leafer } from 'leafer-ui'

const leafer = new Leafer({ view: window })

leafer.add({
    tag: 'Rect', // 必须要有类名tag
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: '#32cd79'
})
```

### Conditional removal 

Supports all find() query parameters.

ts

```
// #移除元素 [条件移除]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ id: 'book', fill: '#32cd79' }, 100, 100)
const rect2 = Rect.one({ fill: 'blue' }, 300, 100)

leafer.addMany(rect, rect2)

setTimeout(() => {

    // 移除 id 为 book 的元素
    leafer.remove('#book') // [!code hl] // 等同于 leafer.find('#book').forEach(item => item.remove())

}, 2000)
```
