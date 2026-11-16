<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/options/attrs.html -->

# Transition Attributes 

## Key Property 

### attrs: `string[]` 

List of element attributes participating in the animation transition. Defaults to all attributes.

## Belongs to 

### Animate Class 

## Example 

### Only x attribute participates in animation transition 

animationtransitionsetanimateAnimate

ts

```
// #动画 - 只有 x 属性参与动画过渡 [attrs（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500, y: 200 }, // style keyframe
        duration: 2,
        attrs: ['x'] // 只有 x 属性参与动画过渡
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 只有 x 属性参与动画过渡 [attrs（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500, y: 200 }, // 鼠标 hover 时的过渡效果
    transition: {
        duration: 2,
        attrs: ['x'] // 只有 x 属性参与动画过渡
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 只有 x 属性参与动画过渡 [attrs（set）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500, y: 200 }, // style keyframe
    {
        duration: 2,
        attrs: ['x'] // 只有 x 属性参与动画过渡
    } // options
)
```

ts

```
// #动画 - 只有 x 属性参与动画过渡 [attrs（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500, y: 200 }, // style keyframe
    {
        duration: 2,
        attrs: ['x'] // 只有 x 属性参与动画过渡
    } // options
)
```

ts

```
// #动画 - 只有 x 属性参与动画过渡 [attrs（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

new Animate(
    rect,
    { x: 500, y: 200 }, // style keyframe
    {
        duration: 2,
        attrs: ['x'] // 只有 x 属性参与动画过渡
    } // options
)
```
