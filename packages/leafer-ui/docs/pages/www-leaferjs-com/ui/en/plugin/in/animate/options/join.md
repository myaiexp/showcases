<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/options/join.html -->

# Join Keyframe 

## Key Property 

### join: `boolean` 

Whether to include the element’s state before the animation starts as the `from` keyframe.

When there is only one keyframe, it is forced to `true`, performing a `from -> to` animation.

When there are multiple keyframes, the default is `false`, and the animation will follow the predefined keyframe list.

## Belongs to 

### Animate Class 

## Example 

### Include pre-animation element state as from keyframe 

animationanimateAnimate

ts

```
// #动画 - 加入动画前的元素状态作为 from 关键帧 [join（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        keyframes: [{ x: 500 }, { x: 200 }], // style keyframe
        duration: 2,
        join: true // 加入动画前的元素状态作为 from 关键帧 {x: 0}
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 加入动画前的元素状态作为 from 关键帧 [join（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    [{ x: 500 }, { x: 200 }], // style keyframe
    {
        duration: 2,
        join: true // 加入动画前的元素状态作为 from 关键帧 {x: 0}
    } // options
)
```

ts

```
// #动画 - 加入动画前的元素状态作为 from 关键帧 [join（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

new Animate(
    rect,
    [{ x: 500 }, { x: 200 }], // style keyframe
    {
        duration: 2,
        join: true // 加入动画前的元素状态作为 from 关键帧 {x: 0}
    } // options
)
```
