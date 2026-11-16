<!-- source: https://www.leaferjs.com/ui/en/reference/event/ui/Swipe.html -->

# SwipeEvent 

Swipe event.

Inheritance

SwipeEvent  >  DragEvent  >  PointerEvent  >  UIEvent  >  Event

## Event Names 

### SwipeEvent.LEFT 

Swipe left event.

`swipe.left`

### SwipeEvent.RIGHT 

Swipe right event.

`swipe.right`

### SwipeEvent.UP 

Swipe up event.

`swipe.up`

### SwipeEvent.DOWN 

Swipe down event.

`swipe.down`

## Inherited Events 

### SwipeEvent  >  DragEvent  >  PointerEvent  >  UIEvent  >  Event 

## Example 

ts

```
// #监听滑动事件
import { Leafer, Rect, SwipeEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 300, y: 100, width: 200, height: 300, fill: '#32cd79' })

leafer.add(rect)

rect.on(SwipeEvent.LEFT, function () {
    rect.x -= 200
    rect.fill = 'blue'
})

rect.on(SwipeEvent.RIGHT, function () {
    rect.x += 200
    rect.fill = '#32cd79'
})
```
