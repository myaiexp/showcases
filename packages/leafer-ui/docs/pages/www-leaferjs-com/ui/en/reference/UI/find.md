<!-- source: https://www.leaferjs.com/ui/en/reference/UI/find.html -->

# find 

Element search functionality (selector), returns an array of elements.

If you want to get a single element, use findOne().

Note

Requires the find plugin, or install leafer-game / leafer-editor (both already include the find plugin).

## Key Methods 

### find(condition: `number` | `string` | `IFindMethod`): `UI`[] 

Find elements by id, innerId, className, tag, or a custom function condition. Returns an array of matched elements.

### findTag(tag: `number` | `number[]`): `UI`[] 

Find elements by tag. Supports passing an array to search multiple tags at once. Returns an array of matched elements.

## Belongs to 

### UI Element 

## Examples 

### Find by id 

LeaferApp

ts

```
// #查找功能 [通过 id 查找 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window })

const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79' })

leafer.add(rect1)
leafer.add(rect2)

console.log(
    leafer.find('#block') // [!code hl] // [rect1]
)
```

ts

```
// #查找功能 [通过 id 查找 (App)]
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
    app.find('#block') // [!code hl] // [rect1]
)
```

### Find by innerId 

LeaferApp

ts

```
// #查找功能 [通过 innerId 查找 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window })

const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79' })

leafer.add(rect1)
leafer.add(rect2)
console.log(
    leafer.find(rect2.innerId)  // [!code hl] // [rect2]
)
```

ts

```
// #查找功能 [通过 innerId 查找 (App)]
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
    app.find(rect2.innerId)  // [!code hl] // [rect2]
)
```

### Find by className 

LeaferApp

ts

```
// #查找功能 [通过 className 查找 (Leafer)]
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
    leafer.find('.menu') // [!code hl] // [rect1, rect2]
)
```

ts

```
// #查找功能 [通过 className 查找 (App)]
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
    app.find('.menu') // [!code hl] // [rect1, rect2]
)
```

### Find by tag 

LeaferApp

ts

```
// #查找功能 [通过 tag 查找 (Leafer)]
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
    leafer.find('Rect')  // [!code hl] // [rect1, rect2]
)
```

ts

```
// #查找功能 [通过 tag 查找 (App)]
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
    app.find('Rect')  // [!code hl] // [rect1, rect2]
)
```

### Find by function 

LeaferApp

ts

```
// #查找功能 [通过 自定义函数 查找 (Leafer)]
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
    leafer.find(function (item) {
        return item.stroke === 'black' ? 1 : 0 // [rect1, ellipse]
    })
)
```

ts

```
// #查找功能 [通过 自定义函数 查找 (App)]
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
    app.find(function (item) {
        return item.stroke === 'black' ? 1 : 0 // [rect1, ellipse]
    })
)
```
