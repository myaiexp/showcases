<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/options/ending.html -->

# Ending Style 

## Key Property 

### ending: `IAnimateEnding` 

The style applied when the animation ends. Default is `'auto'`.

`from` represents the starting style, and `to` represents the ending style.

ts

```
type IAnimateEnding = 'auto' | 'from' | 'to'
```

## Belongs to 

### Animate Class 

## Examples 

### Return to initial state after animation ends 

animationtransitionsetanimateAnimate

ts

```
// #动画 - 动画结束时回到起始状态  [from（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        duration: 2,
        ending: 'from' // 动画结束时回到起始状态
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 动画结束时回到起始状态  [from（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        duration: 2,
        ending: 'from' // 动画结束时回到起始状态
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 动画结束时回到起始状态  [from（set）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        ending: 'from' // 动画结束时回到起始状态
    } // options
)
```

ts

```
// #动画 - 动画结束时回到起始状态  [from（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        ending: 'from' // 动画结束时回到起始状态
    } // options
)
```

ts

```
// #动画 - 动画结束时回到起始状态  [from（Animate）]
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
        ending: 'from' // 动画结束时回到起始状态
    } // options
)
```

### Keep final state after animation ends 

animationtransitionsetanimateAnimate

ts

```
// #动画 - 动画结束时保持结束状态  [to（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        duration: 2,
        ending: 'to' // 动画结束时保持结束状态
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 动画结束时保持结束状态  [to（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        duration: 2,
        ending: 'to' // 动画结束时保持结束状态
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 动画结束时保持结束状态  [to（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        ending: 'to' // 动画结束时保持结束状态
    } // options
)
```

ts

```
// #动画 - 动画结束时保持结束状态  [to（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        ending: 'to' // 动画结束时保持结束状态
    } // options
)
```

ts

```
// #动画 - 动画结束时保持结束状态  [to（Animate）]
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
        ending: 'to' // 动画结束时保持结束状态
    } // options
)
```
