<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/options/duration.html -->

# Duration 

## Key Property 

### duration: `number` 

Total duration of the animation (excluding delay and loop time).

## Belongs to 

### Animate Class 

## Example 

### Animation duration 

animationtransitionsetanimateAnimate

ts

```
// #动画 - 时长  [duration（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        duration: 5, // 动画时长为 5 秒
        loop: true
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 时长  [duration（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        duration: 5, // 动画时长为 5 秒
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 时长  [duration（set）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500 }, // style keyframe
    {
        duration: 5 // 动画时长为 5 秒
    } // options
)
```

ts

```
// #动画 - 时长  [duration（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 5, // 动画时长为 5 秒
        loop: true
    } // options
)
```

ts

```
// #动画 - 时长  [duration（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

new Animate(
    rect,
    { x: 500 }, // style keyframe
    {
        duration: 5, // 动画时长为 5 秒
        loop: true
    } // options
)
```
