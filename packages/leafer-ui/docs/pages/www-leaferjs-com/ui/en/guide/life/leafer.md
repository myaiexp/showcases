<!-- source: https://www.leaferjs.com/ui/en/guide/life/leafer.html -->

# Engine Lifecycle 

From creating the engine to termination, it goes through processes such as creating elements, starting the engine, initial layout, engine ready, first render, view ready, multiple render lifecycles, stop/restart, destruction, and more—forming the lifecycle of an engine.

  
  

## Example 

Different states in the lifecycle are notified through LeaferEvent. You can also listen to these events via the Leafer instance to implement your own product logic.

### Listen to ready event 

ts

```
// #监听 Leafer 事件
import { Leafer, Rect, LeaferEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

leafer.on(LeaferEvent.READY, function () {
    // ready
})
```

## Next Step 

### Render Lifecycle 
