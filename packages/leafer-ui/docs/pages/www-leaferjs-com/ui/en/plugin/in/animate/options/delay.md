<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/options/delay.html -->

# Delay 

## Key Property 

### delay: `number` 

The delay duration before the animation starts.

## Belongs to 

### Animate Class 

## Example 

### Delayed animation 

animationtransitionsetanimateAnimate

ts

```
// #动画 - 延迟执行  [delay（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        delay: 1, // 延迟 1 秒开始动画
        duration: 2
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 延迟执行  [delay（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        delay: 1, // 延迟 1 秒开始动画
        duration: 2
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 延迟执行  [delay（set）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500 }, // style keyframe
    {
        delay: 1, // 延迟 1 秒开始动画
        duration: 2
    } // options
)
```

ts

```
// #动画 - 延迟执行  [delay（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2
    } // options
)
```

ts

```
// #动画 - 延迟执行  [delay（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

new Animate(
    rect,
    { x: 500 }, // style keyframe
    {
        delay: 1, // 延迟 1 秒开始动画
        duration: 2
    } // options
)
```
