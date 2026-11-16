<!-- source: https://www.leaferjs.com/ui/en/reference/UI/remove.html -->

# remove 

Remove the current element.

## Key Methods 

### remove ( ) 

Remove the current element.

### remove ( child: `UI`) 

For Group elements, remove the specified child element.

## Belongs to 

### UI Element 

## Example 

### Standard removal 

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

### Conditional removal 

Uses the same parameters as the find() method. It first performs `find()` internally, then removes elements in batch.

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
