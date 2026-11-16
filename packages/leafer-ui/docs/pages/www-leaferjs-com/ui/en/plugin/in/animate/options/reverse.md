<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/options/reverse.html -->

# Reverse 

## Key Property 

### reverse?: `boolean` 

Whether to reverse the animation direction (`to -> from`). Default is `false`.

## Belongs to 

### Animate Class 

## Example 

### Reverse animation 

animationtransitionsetanimateAnimate

ts

```
// #动画 - 反向 [reverse（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        duration: 2,
        reverse: true // 反向动画
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 反向 [reverse（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        duration: 2,
        reverse: true // 反向动画
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 反向 [reverse（set）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        reverse: true // 反向动画
    } // options
)
```

ts

```
// #动画 - 反向 [reverse（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        reverse: true // 反向动画
    } // options
)
```

ts

```
// #动画 - 反向 [reverse（Animate）]
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
        reverse: true // 反向动画
    } // options
)
```
