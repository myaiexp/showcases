<!-- source: https://www.leaferjs.com/ui/en/reference/UI/destroy.html -->

# destroy 

Destroy the current element.

## Read-only Properties 

### destroyed: `boolean` 

Whether the element has been destroyed.

## Key Methods 

### destroy ( ) 

Remove and destroy the current element. If it has child elements, they will also be recursively destroyed.

## Belongs to 

### UI Elements 

## Examples 

## Destroy and Remove 

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

## Clear Elements 

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
