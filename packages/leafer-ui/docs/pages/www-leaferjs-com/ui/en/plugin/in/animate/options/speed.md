<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/options/speed.html -->

# Speed 

## Key Property 

### speed: `number` 

Animation playback speed multiplier. Default is `1`.

For example, a 10-second animation with `speed = 5` will finish in 2 seconds.

## Belongs to 

### Animate Class 

## Example 

### Play animation at 5x speed 

animationtransitionsetanimateAnimate

ts

```
// #动画 - 以5倍速播放动画 [speed（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        duration: 2,
        speed: 5 // 以5倍速播放动画
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 以5倍速播放动画 [speed（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        duration: 2,
        speed: 5 // 以5倍速播放动画
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 以5倍速播放动画 [speed（set）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        speed: 5 // 以5倍速播放动画
    } // options
)
```

ts

```
// #动画 - 以5倍速播放动画 [speed（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        speed: 5 // 以5倍速播放动画
    } // options
)
```

ts

```
// #动画 - 以5倍速播放动画 [speed（Animate）]
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
        speed: 5 // 以5倍速播放动画
    } // options
)
```
