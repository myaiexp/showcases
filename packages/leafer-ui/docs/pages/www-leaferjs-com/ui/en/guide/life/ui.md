<!-- source: https://www.leaferjs.com/ui/en/guide/life/ui.html -->

# Element Lifecycle 

The lifecycle of an element covers the entire process from creation, addition, mounting, removal, unmounting, to destruction. These can be listened to during initialization.

  
  

## Example 

Different states in the lifecycle are notified through ChildEvent and PropertyEvent.

### Listening to element lifecycle events 

Listen during initialization

ts

```
// #监听元素生命周期事件 [通过 event 对象监听]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    fill: '#32cd79',
    cornerRadius: [50, 80, 0, 80],
    draggable: true,
    event: {
        created() {
            console.log('rect created')
        },
        mounted: () => {
            console.log('mounted, leafer', rect.leafer) // 元素已挂载到 leafer 的树结构上，可以被渲染
        },
        unmounted() {
            console.log('unmounted')
        },
    }
})

leafer.add(rect)
```

Listen via `on`

ts

```
// #监听元素生命周期事件 [通过 on 监听]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    fill: '#32cd79',
    cornerRadius: [50, 80, 0, 80],
    draggable: true
})

leafer.add(rect)

rect.on('created', () => {
    console.log('rect created')
})

rect.on('mounted', () => {
    console.log('mounted, leafer', rect.leafer) // 元素已挂载到 leafer 的树结构上，可以被渲染
})

rect.on('unmounted', () => {
    console.log('unmounted')
})
```

## Next Step 

### Engine Lifecycle 
