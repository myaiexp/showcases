<!-- source: https://www.leaferjs.com/ui/en/reference/event/basic/Leafer.html -->

# LeaferEvent 

Leafer events.

To understand the event trigger order, please refer to the engine lifecycle diagram.

Inheritance

LeaferEvent  >  Event

## Event Names 

### LeaferEvent.START 

Start engine.

`leafer.start`

### LeaferEvent.BEFORE\_READY 

Before engine is ready.

`leafer.before_ready`

### LeaferEvent.READY 

Engine ready (first layout completed).

`leafer.ready`

### LeaferEvent.AFTER\_READY 

After engine is ready.

`leafer.after_ready`

### LeaferEvent.VIEW\_READY 

View ready (first render completed).

`leafer.view_ready`

### LeaferEvent.STOP 

Stop engine.

`leafer.stop`

### LeaferEvent.RESTART 

Restart engine.

`leafer.restart`

### LeaferEvent.END 

End (engine is about to be destroyed).

`leafer.end`

### View Events 

### LeaferEvent.TRANSFORM 

Triggered when the Leafer instance viewport properties change: x, y, scaleX, scaleY, rotation, skew viewport properties.

In App architecture, this event must be listened to on sub-Leafer instances such as `app.tree`.

`leafer.transform`

### LeaferEvent.MOVE 

Triggered when x, y viewport properties change.

In App architecture, this event must be listened to on sub-Leafer instances such as `app.tree`.

`leafer.move`

### LeaferEvent.SCALE 

Triggered when scale, scaleX, scaleY viewport properties change.

In App architecture, this event must be listened to on sub-Leafer instances such as `app.tree`.

`leafer.scale`

### LeaferEvent.ROTATE 

Triggered when rotation changes.

In App architecture, this event must be listened to on sub-Leafer instances such as `app.tree`.

`leafer.rotate`

### LeaferEvent.SKEW 

Triggered when skew changes.

In App architecture, this event must be listened to on sub-Leafer instances such as `app.tree`.

`leafer.skew`

### Interaction Mode 

### LeaferEvent.UPDATE\_MODE 

Triggered when Leafer's mode changes.

In App architecture, this event must be listened to on the app instance.

`leafer.update_mode`

ts

```
app.on_(LeaferEvent.UPDATE_MODE, (data: { mode: ILeaferMode }) => {
  if (data.mode && data.mode !== 'normal') this.cancel()
})
```

## Inherited Events 

### LeaferEvent  >  Event 

## Example 

### Listen to Leafer events 

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

### Listen to Leafer scale change event 

ts

```
// #监听 Leafer 事件 - 缩放变化事件
import { Leafer, Rect, LeaferEvent } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({ view: window, type: 'viewport' })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

leafer.on(LeaferEvent.SCALE, function () {
    // 缩放视图、或修改scale后，这里可以实时收到缩放比例变化
    console.log('leafer.scale', leafer.scaleX)
})
```
