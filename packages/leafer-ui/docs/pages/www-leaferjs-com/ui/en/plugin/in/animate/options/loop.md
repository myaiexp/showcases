<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/options/loop.html -->

# Loop 

## Key Properties 

### loop: `boolean | number` 

Whether the animation should loop. You can also set the number of loops. Default is `false`.

### loopDelay: `number` 

Delay time before starting the next loop cycle.

### swing?: `boolean | number` 

Whether to enable swing looping. You can also set the number of cycles (number of times reaching `to`). Pattern: `from -> to -> from -> to ...` Default is `false`.

## Belongs to 

### Animate Class 

## Examples 

### Loop 

animationtransitionsetanimateAnimate

ts

```
// #动画 - 循环执行  [loop（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        duration: 2,
        loop: true // 循环执行动画
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 循环执行  [loop（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        duration: 2,
        loop: true // 循环执行动画
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 循环执行  [loop（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        loop: true // 循环执行动画
    } // options
)
```

ts

```
// #动画 - 循环执行  [loop（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        loop: true // 循环执行动画
    } // options
)
```

ts

```
// #动画 - 循环执行  [loop（Animate）]
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
        loop: true // 循环执行动画
    } // options
)
```

### Loop 2 times 

animationtransitionsetanimateAnimate

ts

```
// #动画 - 循环 2 次  [loop（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        duration: 2,
        loop: 2 // 循环 2 次动画
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 循环 2 次  [loop（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        duration: 2,
        loop: 2 // 循环 2 次动画
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 循环 2 次  [loop（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        loop: 2 // 循环 2 次动画
    } // options
)
```

ts

```
// #动画 - 循环 2 次  [loop（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        loop: 2 // 循环 2 次动画
    } // options
)
```

ts

```
// #动画 - 循环 2 次  [loop（Animate）]
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
        loop: 2 // 循环 2 次动画
    } // options
)
```

### Loop delay 

animationtransitionsetanimateAnimate

ts

```
// #动画 - 循环间隔  [loopDelay（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        duration: 2,
        loop: true,
        loopDelay: 1 // 循环间隔 1 秒，再进入下一次循环动画
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 循环间隔  [loopDelay（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        duration: 2,
        loop: true,
        loopDelay: 1 // 循环间隔 1 秒，再进入下一次循环动画
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 循环间隔  [loopDelay（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        loop: true,
        loopDelay: 1 // 循环间隔 1 秒，再进入下一次循环动画
    } // options
)
```

ts

```
// #动画 - 循环间隔  [loopDelay（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        loop: true,
        loopDelay: 1 // 循环间隔 1 秒，再进入下一次循环动画
    } // options
)
```

ts

```
// #动画 - 循环间隔  [loopDelay（Animate）]
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
        loop: true,
        loopDelay: 1 // 循环间隔 1 秒，再进入下一次循环动画
    } // options
)
```

### Swing loop 

animationtransitionanimateAnimate

ts

```
// #动画 - 摇摆循环  [swing（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        duration: 2,
        swing: true // 摇摆循环动画
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 摇摆循环  [swing（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        duration: 2,
        swing: true // 摇摆循环动画
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 摇摆循环  [swing（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        swing: true // 摇摆循环动画
    } // options
)
```

ts

```
// #动画 - 摇摆循环  [swing（Animate）]
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
        swing: true // 摇摆循环动画
    } // options
)
```
