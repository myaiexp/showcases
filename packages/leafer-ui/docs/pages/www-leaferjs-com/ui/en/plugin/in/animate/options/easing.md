<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/options/easing.html -->

# Easing 

## Key Property 

### easing: `IAnimateEasing` 

Animation easing function. Default is `ease`. See animation easing chart.

ts

```
type IAnimateEasing =
  | 'ease' // default, slow start, fast middle, slow end
  | 'linear' // linear easing, constant speed

  // easing
  | 'ease-in' // slow start, then faster
  | 'ease-out' // fast start, slow end
  | 'ease-in-out' // slow start and end

  // sine
  | 'sine-in'
  | 'sine-out'
  | 'sine-in-out'
  // quadratic
  | 'quad-in'
  | 'quad-out'
  | 'quad-in-out'
  // cubic
  | 'cubic-in'
  | 'cubic-out'
  | 'cubic-in-out'
  // quartic
  | 'quart-in'
  | 'quart-out'
  | 'quart-in-out'
  // quintic
  | 'quint-in'
  | 'quint-out'
  | 'quint-in-out'
  // exponential
  | 'expo-in'
  | 'expo-out'
  | 'expo-in-out'
  // circular
  | 'circ-in'
  | 'circ-out'
  | 'circ-in-out'
  // back
  | 'back-in'
  | 'back-out'
  | 'back-in-out'
  // elastic
  | 'elastic-in'
  | 'elastic-out'
  | 'elastic-in-out'
  // bounce
  | 'bounce-in'
  | 'bounce-out'
  | 'bounce-in-out'
  | ICubicBezierEasing
  | IStepsEasing

interface ICubicBezierEasing {
  name: 'cubic-bezier' // cubic bezier curve 0,0, x1,y1, x2,y2, 1,1
  value: [number, number, number, number] // [x1, y1, x2, y2]
}

interface IStepsEasing {
  name: 'steps' // step animation
  // first param: steps count
  // second param: rounding method for steps Math.floor(t * steps) / steps, default is floor
  value: number | [number, 'floor' | 'round' | 'ceil']
}
```

## Belongs to 

### Animate Class 

## Examples 

### ease 

Slow start, fast middle, slow end

animationtransitionsetanimateAnimate

ts

```
// #动画 - 缓动方式  [ease（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        easing: 'ease',  // ease 缓动：慢速开始，中间快，缓慢结束
        duration: 2,
        loop: true
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [ease（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        easing: 'ease',  // ease 缓动：慢速开始，中间快，缓慢结束
        duration: 2
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [ease（set）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500 }, // style keyframe
    {
        easing: 'ease',  // ease 缓动： 慢速开始，中间快，缓慢结束
        duration: 2
    } // options
)
```

ts

```
// #动画 - 缓动方式  [ease（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        easing: 'ease',  // ease 缓动： 慢速开始，中间快，缓慢结束
        duration: 2,
        loop: true
    } // options
)
```

ts

```
// #动画 - 缓动方式  [ease（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

new Animate(
    rect,
    { x: 500 }, // style keyframe
    {
        easing: 'ease',  // ease 缓动： 慢速开始，中间快，缓慢结束
        duration: 2,
        loop: true
    } // options
)
```

### linear 

Constant speed

animationtransitionsetanimateAnimate

ts

```
// #动画 - 缓动方式  [linear（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        easing: 'linear',  // 线性缓动：匀速进行
        duration: 2,
        loop: true
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [linear（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        easing: 'linear',  // 线性缓动：匀速进行
        duration: 2
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [linear（set）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500 }, // style keyframe
    {
        easing: 'linear',  // 线性缓动：匀速进行
        duration: 2
    } // options
)
```

ts

```
// #动画 - 缓动方式  [linear（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        easing: 'linear',  // 线性缓动：匀速进行
        duration: 2,
        loop: true
    } // options
)
```

ts

```
// #动画 - 缓动方式  [linear（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

new Animate(
    rect,
    { x: 500 }, // style keyframe
    {
        easing: 'linear',  // 线性缓动：匀速进行
        duration: 2,
        loop: true
    } // options
)
```

### back-in 

Back-in easing (overshooting start)

animationtransitionsetanimateAnimate

ts

```
// #动画 - 缓动方式  [back-in（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        easing: 'back-in',  // 拉力进入
        duration: 2,
        loop: true
    }
}, 50, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [back-in（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        easing: 'back-in',  // 拉力进入
        duration: 2
    }
}, 50, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [back-in（set）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 50, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500 }, // style keyframe
    {
        easing: 'back-in',  // 拉力进入
        duration: 2
    } // options
)
```

ts

```
// #动画 - 缓动方式  [back-in（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 50, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        easing: 'back-in',  // 拉力进入
        duration: 2,
        loop: true
    } // options
)
```

ts

```
// #动画 - 缓动方式  [back-in（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 50, 100, 50, 50)

leafer.add(rect)

new Animate(
    rect,
    { x: 500 }, // style keyframe
    {
        easing: 'back-in',  // 拉力进入
        duration: 2,
        loop: true
    } // options
)
```

### elastic-out 

Elastic-out easing with multiple bounces

animationtransitionsetanimateAnimate

ts

```
// #动画 - 缓动方式  [elastic-out（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        easing: 'elastic-out',  // 多次回弹结束
        duration: 2,
        loop: true
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [elastic-out（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        easing: 'elastic-out',  // 多次回弹结束
        duration: 2
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [elastic-out（set）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500 }, // style keyframe
    {
        easing: 'elastic-out',  // 多次回弹结束
        duration: 2
    } // options
)
```

ts

```
// #动画 - 缓动方式  [elastic-out（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        easing: 'elastic-out',  // 多次回弹结束
        duration: 2,
        loop: true
    } // options
)
```

ts

```
// #动画 - 缓动方式  [elastic-out（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

new Animate(
    rect,
    { x: 500 }, // style keyframe
    {
        easing: 'elastic-out',  // 多次回弹结束
        duration: 2,
        loop: true
    } // options
)
```

### bounce-out 

Bounce-out easing (gravity-like rebound)

animationtransitionsetanimateAnimate

ts

```
// #动画 - 缓动方式  [bounce-out（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        easing: 'bounce-out',  // 重力反弹结束
        duration: 2,
        loop: true
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [bounce-out（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        easing: 'bounce-out',  // 重力反弹结束
        duration: 2
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [bounce-out（set）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500 }, // style keyframe
    {
        easing: 'bounce-out',  // 重力反弹结束
        duration: 2
    } // options
)
```

ts

```
// #动画 - 缓动方式  [bounce-out（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        easing: 'bounce-out',  // 重力反弹结束
        duration: 2,
        loop: true
    } // options
)
```

ts

```
// #动画 - 缓动方式  [bounce-out（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

new Animate(
    rect,
    { x: 500 }, // style keyframe
    {
        easing: 'bounce-out',  // 重力反弹结束
        duration: 2,
        loop: true
    } // options
)
```

### cubic-bezier 

Custom cubic-bezier easing `0,0, x1,y1, x2,y2, 1,1`

animationtransitionsetanimateAnimate

ts

```
// #动画 - 缓动方式  [cubic-bezier（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        easing: { name: 'cubic-bezier', value: [0.5, 0.1, 0.25, 1] },  // 自定义缓动曲线
        duration: 2,
        loop: true
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [cubic-bezier（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        easing: { name: 'cubic-bezier', value: [0.5, 0.1, 0.25, 1] },  // 自定义缓动曲线
        duration: 2
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [ease（set）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500 }, // style keyframe
    {
        easing: { name: 'cubic-bezier', value: [0.5, 0.1, 0.25, 1] },   // 自定义缓动曲线
        duration: 2
    } // options
)
```

ts

```
// #动画 - 缓动方式  [ease（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        easing: { name: 'cubic-bezier', value: [0.5, 0.1, 0.25, 1] },   // 自定义缓动曲线
        duration: 2,
        loop: true
    } // options
)
```

ts

```
// #动画 - 缓动方式  [ease（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

new Animate(
    rect,
    { x: 500 }, // style keyframe
    {
        easing: { name: 'cubic-bezier', value: [0.5, 0.1, 0.25, 1] },   // 自定义缓动曲线
        duration: 2,
        loop: true
    } // options
)
```

### steps 

Step-based animation

animationtransitionsetanimateAnimate

ts

```
// #动画 - 缓动方式  [steps（animation）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    animation: {
        style: { x: 500 }, // style keyframe
        easing: { name: 'steps', value: 6 },  // 步长动画
        duration: 2,
        loop: true
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [steps（transition）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({
    fill: '#32cd79',
    hoverStyle: { x: 500 }, // 鼠标 hover 时的过渡效果
    transition: {
        easing: { name: 'steps', value: 6 },  // 步长动画
        duration: 2
    }
}, 0, 100, 50, 50))
```

ts

```
// #动画 - 缓动方式  [steps（set）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.set(
    { x: 500 }, // style keyframe
    {
        easing: { name: 'steps', value: 6 },  // 步长动画
        duration: 2
    } // options
)
```

ts

```
// #动画 - 缓动方式  [steps（animate）]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

rect.animate(
    { x: 500 }, // style keyframe
    {
        easing: { name: 'steps', value: 6 },  // 步长动画
        duration: 2,
        loop: true
    } // options
)
```

ts

```
// #动画 - 缓动方式  [steps（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

new Animate(
    rect,
    { x: 500 }, // style keyframe
    {
        easing: { name: 'steps', value: 6 },  // 步长动画
        duration: 2,
        loop: true
    } // options
)
```
