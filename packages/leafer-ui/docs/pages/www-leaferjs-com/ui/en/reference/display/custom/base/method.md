<!-- source: https://www.leaferjs.com/ui/en/reference/display/custom/base/method.html -->

# Add Methods 

The **4th step** in creating a custom element is: **adding methods**.

Custom methods can be used to implement operations such as controlling animations.

## Example 

index.tsindex.js

ts

```
// #自定义元素 [添加方法]
import { Rect, RectData, registerUI, dataProcessor, PointerEvent } from '@leafer-ui/core' // 引入跨平台核心包
import { IRectInputData, IRectData } from '@leafer-ui/interface'


export interface ICustomInputData extends IRectInputData { }

export interface ICustomData extends IRectData { }

export class CustomData extends RectData implements ICustomData { }


@registerUI()
export class Custom extends Rect {

    public get __tag() { return 'Custom' }

    @dataProcessor(CustomData)
    declare public __: ICustomData

    // 1. 添加普通属性，不用进json，只是辅助逻辑判断
    public rotating: boolean

    constructor(data: ICustomInputData) {
        super(data)
        // ...
    }

    // 2. 添加自定义方法, 动画开关
    startAnimate(): void {
        this.rotating = true
        this.rotateAnimate()
    }

    stopAnimate(): void {
        this.rotating = false
    }

    rotateAnimate(): void {
        this.nextRender(() => {
            this.rotation += 1
            if (this.rotating) this.rotateAnimate()
        })
    }

}


// 使用自定义元素
import { Leafer } from 'leafer-ui'

const leafer = new Leafer({ view: window })
const custom = new Custom({ x: 100, y: 100, width: 100, height: 200, around: 'center', fill: 'blue', draggable: true })

leafer.add(custom)

// 3. 使用方法， 通过按下鼠标切换开启/停止旋转动画
custom.on(PointerEvent.DOWN, () => {
    custom.rotating ? custom.stopAnimate() : custom.startAnimate()
})
```

js

```
import { Rect, RectData, PointerEvent } from '@leafer-ui/core' // 引入跨平台核心包


export class Custom extends Rect {

    get __tag() { return 'Custom' }

    // 1. 添加普通属性，不用进json，只是辅助逻辑判断
    rotating = false

    // 2. 添加自定义方法，动画开关
    startAnimate() {
        this.rotating = true
        this.rotateAnimate()
    }

    stopAnimate() {
        this.rotating = false
    }

    rotateAnimate() {
        this.nextRender(() => {
            this.rotation += 1
            if (this.rotating) this.rotateAnimate()
        })
    }

}

export class CustomData extends RectData {}

Custom.registerUI()
Custom.registerData(CustomData)


// 使用自定义元素
import { Leafer } from 'leafer-ui'

const leafer = new Leafer({ view: window })
const custom = new Custom({ x: 100, y: 100, width: 100, height: 200, around: 'center', fill: 'blue', draggable: true })

leafer.add(custom)

// 3. 使用方法， 通过按下鼠标切换开启/停止旋转动画
custom.on(PointerEvent.DOWN, () => {
    custom.rotating ? custom.stopAnimate() : custom.startAnimate()
})
```

## Congratulations 🎉 

You have completed the basics of custom elements. You can now continue learning through the Advanced Examples to further master custom elements.
