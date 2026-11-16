<!-- source: https://www.leaferjs.com/ui/en/guide/plugin/animate.html -->

# Animation 

The animation system supports delay, oscillating loops, seek, and animation events, enabling transition animations, keyframe animations, and path animations.

Animations can be created using animation, transition, the animate() method, or the Animate instance.

In addition, element methods such as move() and set() support animation transition parameters. Text also supports count animations and typewriter animations.

Note

You must install the animation plugin to use this feature, or install leafer-game directly (which already includes the animation plugin).

ts

```
// #动画样式 [入场和出场动画 (Leafer)]
import { Group, Leafer, Frame } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const page1 = new Frame({
    x: 300,
    y: 100,
    width: 150,
    height: 100,
    fill: '#FEB027',
    animation: { // 入场动画
        keyframes: [{ opacity: 0, offsetX: -150 }, { opacity: 1, offsetX: 0 }],
        duration: 0.8
    },
    animationOut: { // 出场动画
        style: { opacity: 0, offsetX: 150 },
        duration: 0.8
    }
})

const page2 = page1.clone({ fill: '#32cd79' }) // 克隆 page 并重新设置fill

const group = new Group({ children: [page1] })

leafer.add(group)

// 切换页面, 自动执行入场、出场动画
setInterval(() => {

    if (page1.parent) {
        group.add(page2)
        page1.remove()
    } else {
        group.add(page1)
        page2.remove()
    }

}, 2000)
```

ts

```
// #动画样式 [颜色过渡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    y: 100,
    cornerRadius: 50,
    fill: '#32cd79',
    animation: {
        style: { x: 500, cornerRadius: 0, fill: '#ffcd00' }, // style keyframe
        duration: 1,
        swing: true // 摇摆循环播放
    }
})

leafer.add(rect)
```

ts

```
// #动画样式 [关键帧动画 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    x: 50,
    y: 100,
    cornerRadius: 50,
    fill: '#32cd79',
    around: 'center',
    animation: {
        keyframes: [
            { style: { x: 150, scaleX: 2, fill: '#ffcd00' }, duration: 0.5 },  // animate keyframe
            { style: { x: 50, scaleX: 1, fill: '#ffcd00' }, duration: 0.2 },
            { style: { x: 550, cornerRadius: 0, fill: '#ffcd00' }, delay: 0.1, easing: 'bounce-out' },
            { x: 50, rotation: -720, cornerRadius: 50 } // style keyframe
        ],
        duration: 3, // 自动分配剩余的时长给未设置 duration 的关键帧： (3 - 0.5 - 0.2 - 0.1) / 2 
        loop: true,
        join: true //  加入动画前的元素状态作为 from 关键帧
    }
})

leafer.add(rect)
```

ts

```
// #动画样式 [虚线箭头动画]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    x: 100,
    y: 100,
    stroke: '#32cd79',
    strokeWidth: 5,
    dashPattern: [10, 10], // 绘制虚线
    dashOffset: 0,
    animation: { // 虚线动画
        style: { dashOffset: -20 },
        easing: 'linear',
        duration: 0.5,
        loop: true,
    }
})

leafer.add(arrow)
```

## Next Step 

### Interaction State 
