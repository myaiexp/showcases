<!-- source: https://www.leaferjs.com/ui/en/reference/event/basic/Watch.html -->

# WatchEvent 

Watch event.

To understand the event trigger order, please refer to the render lifecycle diagram.

Inheritance

WatchEvent  >  Event

## Event Names 

### WatchEvent.REQUEST 

Request watch data.

`watch.request`

### WatchEvent.DATA 

Emit watch data.

`watch.data`

## Key Properties 

### data: `IWatchEventData` 

Watch data.

## Inherited Events 

### WatchEvent  >  Event 

## Example 

watch.tswatch.js

ts

```
// #监听观察事件
import { Leafer, Rect, WatchEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

leafer.on(WatchEvent.DATA, function (e: WatchEvent) {
    console.log(e.data) // changed list
})
```

js

```
// #监听观察事件
import { Leafer, Rect, WatchEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

leafer.on(WatchEvent.DATA, function (e) {
    console.log(e.data) // changed list
})
```
