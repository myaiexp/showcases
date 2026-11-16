<!-- source: https://www.leaferjs.com/ui/en/guide/basic/remove.html -->

# Removing Elements 

## Standard Removal 

ts

```
// #移除元素 [标准移除]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

leafer.add(rect)

setTimeout(() => {

    rect.remove() // [!code hl] // 等同于 leafer.remove(rect)

}, 2000)
```

## Conditional Removal 

Same parameters as the find() method. It first performs `find()` internally and then removes all matched elements in batch.

Note

You need to install the find element plugin to use this feature, or install leafer-game or leafer-editor (both already include the find element plugin).

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

## Destroy Removal 

ts

```
// #移除元素 [销毁移除]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

leafer.add(rect)

setTimeout(() => {

    rect.destroy() // [!code hl] // 等同于 rect.remove() => rect.destroy()

}, 2000)
```

## Clearing Elements 

ts

```
// #移除元素 [清空元素]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
const rect2 = Rect.one({ fill: 'blue' }, 300, 100)

leafer.addMany(rect, rect2)

setTimeout(() => {

    leafer.clear() // [!code hl] // 清空并销毁所有子元素

}, 2000)
```

## Destroy Engine 

ts

```
// #销毁引擎
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({ fill: '#32cd79' }, 100, 100))

setTimeout(() => {

    leafer.destroy() // [!code hl:2] // 销毁引擎，默认为异步方式
    // leafer.destroy(true)  //  销毁引擎，同步方式

}, 2000)
```

## Next Step 

### Export Elements 
