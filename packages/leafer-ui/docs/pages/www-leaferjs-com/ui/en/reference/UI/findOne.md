<!-- source: https://www.leaferjs.com/ui/en/reference/UI/findOne.html -->

# findOne 

Element search (selector) that returns a single matched element.

If you want to get multiple results, use find().

Note

Requires the find plugin, or install leafer-game / leafer-editor (both already include the find plugin).

## Key Methods 

### findOne(condition: `number` | `string` | `IFindMethod`): `UI` 

Find an element by id, innerId, className, tag, or a custom function condition. Returns a single matched element.

### findId(id: `number` | `string`): `UI` 

Find element by id. Supports numeric id lookup (only when the original id type is a number).

## Belongs to 

### UI Element 

## Examples 

### Find by id 

LeaferApp

ts

```
// #查找单个元素 [通过 id 查找 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window })

const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79' })

leafer.add(rect1)
leafer.add(rect2)

console.log(
    leafer.findOne('#block') // [!code hl:2] // rect1
    // = leafer.findId('block') 
)
```

ts

```
// #查找单个元素 [通过 id 查找 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/find' // 导入查找元素插件

const app = new App({ view: window, editor: {} })

const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79' })

app.tree.add(rect1)
app.tree.add(rect2)

console.log(
    app.findOne('#block') // [!code hl:2] // rect1
    // = app.findId('block') 
)
```

### Find by innerId 

LeaferApp

ts

```
// #查找单个元素 [通过 innerId 查找 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window })

const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79' })

leafer.add(rect1)
leafer.add(rect2)
console.log(
    leafer.findOne(rect2.innerId)  // [!code hl] // rect2
)
```

ts

```
// #查找单个元素 [通过 innerId 查找 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/find' // 导入查找元素插件

const app = new App({ view: window, editor: {} })

const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79' })

app.tree.add(rect1)
app.tree.add(rect2)
console.log(
    app.findOne(rect2.innerId)  // [!code hl] // rect2
)
```

### Find by className 

LeaferApp

ts

```
// #查找单个元素 [通过 className 查找 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window })

const rect1 = new Rect({ className: 'menu', fill: '#32cd79' })
const rect2 = new Rect({ className: 'menu', fill: '#32cd79', x: 150 })
const rect3 = new Rect({ fill: '#32cd79', x: 300 })

leafer.add(rect1)
leafer.add(rect2)
leafer.add(rect3)

console.log(
    leafer.findOne('.menu') // [!code hl] // rect1
)
```

ts

```
// #查找单个元素 [通过 className 查找 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/find' // 导入查找元素插件

const app = new App({ view: window, editor: {} })

const rect1 = new Rect({ className: 'menu', fill: '#32cd79' })
const rect2 = new Rect({ className: 'menu', fill: '#32cd79', x: 150 })
const rect3 = new Rect({ fill: '#32cd79', x: 300 })

app.tree.add(rect1)
app.tree.add(rect2)
app.tree.add(rect3)

console.log(
    app.findOne('.menu') // [!code hl] // rect1
)
```

### Find by tag 

LeaferApp

ts

```
// #查找单个元素 [通过 tag 查找 (Leafer)]
import { Leafer, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window })

const rect1 = new Rect({ fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79', x: 150 })
const ellipse = new Ellipse({ fill: '#32cd79', x: 300 })

leafer.add(rect1)
leafer.add(rect2)
leafer.add(ellipse)

console.log(
    leafer.findOne('Rect')  // [!code hl] // rect1
)
```

ts

```
// #查找单个元素 [通过 tag 查找 (App)]
import { App, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/find' // 导入查找元素插件

const app = new App({ view: window, editor: {} })

const rect1 = new Rect({ fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79', x: 150 })
const ellipse = new Ellipse({ fill: '#32cd79', x: 300 })

app.tree.add(rect1)
app.tree.add(rect2)
app.tree.add(ellipse)

console.log(
    app.findOne('Rect')  // [!code hl] // rect1
)
```

### Find by function 

LeaferApp

ts

```
// #查找单个元素 [通过 自定义函数 查找 (Leafer)]
import { Leafer, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window })

const rect1 = new Rect({ fill: '#32cd79', stroke: 'black' })
const rect2 = new Rect({ fill: '#32cd79', x: 150 })
const ellipse = new Ellipse({ fill: '#32cd79', stroke: 'black', x: 300 })

leafer.add(rect1)
leafer.add(rect2)
leafer.add(ellipse)

console.log(
    leafer.findOne(function (item) {
        return item.stroke === 'black' ? 1 : 0 // rect1
    })
)
```

ts

```
// #查找单个元素 [通过 自定义函数 查找 (App)]
import { App, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/find' // 导入查找元素插件

const app = new App({ view: window, editor: {} })

const rect1 = new Rect({ fill: '#32cd79', stroke: 'black' })
const rect2 = new Rect({ fill: '#32cd79', x: 150 })
const ellipse = new Ellipse({ fill: '#32cd79', stroke: 'black', x: 300 })

app.tree.add(rect1)
app.tree.add(rect2)
app.tree.add(ellipse)

console.log(
    app.findOne(function (item) {
        return item.stroke === 'black' ? 1 : 0 // rect1
    })
)
```
