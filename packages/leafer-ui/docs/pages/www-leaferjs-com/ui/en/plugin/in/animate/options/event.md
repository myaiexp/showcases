<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/options/event.html -->

# Events 

## Key Property 

### event: `IAnimateEvents` 

Event listener object. Also supports the AnimateEvent style.

ts

```
interface IAnimateEvents {
  created?: IAnimateEventFunction // animation instance created event

  play?: IAnimateEventFunction // play animation event
  pause?: IAnimateEventFunction // pause animation event
  stop?: IAnimateEventFunction // stop animation event
  seek?: IAnimateEventFunction // seek animation event

  update?: IAnimateEventFunction // update animation event, triggered on every style change
  completed?: IAnimateEventFunction // animation completed event
}

interface IAnimateEventFunction {
  (animate?: Animate): void
}
```

## Belongs to 

### Animate Class 

## Examples 

### Listen to animation events 

animationtransitionsetanimateAnimate

ts

```
// #动画 - 监听动画事件 [event（animation）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        duration: 2,
        event: { // 监听动画事件
            created() { // 动画创建
                console.log('created')
            },
            update(animate: Animate) {  // 更新中...
                console.log(animate.style.x)
            },
            completed() {  // 动画已完成
                console.log('completed')
            },
        }
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 监听动画事件 [event（transition）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        duration: 2,
        event: { // 监听动画事件
            created() { // 动画创建
                console.log('created')
            },
            update(animate: Animate) {  // 更新中...
                console.log(animate.style.x)
            },
            completed() {  // 动画已完成
                console.log('completed')
            },
        }
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 监听动画事件 [event（set）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        event: { // 监听动画事件
            created() { // 动画创建
                console.log('created')
            },
            update(animate: Animate) {  // 更新中...
                console.log(animate.style.x)
            },
            completed() {  // 动画已完成
                console.log('completed')
            },
        }
    } // options
)
```

ts

```
// #动画 - 监听动画事件 [event（animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        event: { // 监听动画事件
            created() { // 动画创建
                console.log('created')
            },
            update(animate: Animate) {  // 更新中...
                console.log(animate.style.x)
            },
            completed() {  // 动画已完成
                console.log('completed')
            },
        }
    } // options
)
```

ts

```
// #动画 - 监听动画事件 [event（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

new Animate(
    rect,
    { x: 500 }, // style keyframe
    {
        duration: 2,
        event: { // 监听动画事件
            created() { // 动画创建
                console.log('created')
            },
            update(animate: Animate) {  // 更新中...
                console.log(animate.style.x)
            },
            completed() {  // 动画已完成
                console.log('completed')
            },
        }
    } // options
)
```

### Listen to events via on() 

Supports listening and removing events like elements.

animateAnimate

ts

```
// #动画 - 通过 on() 监听动画事件 [event（animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate, AnimateEvent } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

const animate = rect.animate(
    { x: 500 }, // style keyframe
    { duration: 2 } // options
)

// 监听动画事件
animate.on(AnimateEvent.PLAY, () => { // 动画创建
    console.log('play')
})

animate.on(AnimateEvent.UPDATE, (animate: Animate) => { // 更新中...
    console.log(animate.style.x)
})

animate.on(AnimateEvent.COMPLETED, () => { // 动画已完成
    console.log('completed')
})
```

ts

```
// #动画 - 通过 on() 监听动画事件 [event（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate, AnimateEvent } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

const animate = new Animate(
    rect,
    { x: 500 }, // style keyframe
    { duration: 2 } // options
)

// 监听动画事件
animate.on(AnimateEvent.PLAY, () => { // 动画创建
    console.log('play')
})

animate.on(AnimateEvent.UPDATE, (animate: Animate) => { // 更新中...
    console.log(animate.style.x)
})

animate.on(AnimateEvent.COMPLETED, () => { // 动画已完成
    console.log('completed')
})
```
