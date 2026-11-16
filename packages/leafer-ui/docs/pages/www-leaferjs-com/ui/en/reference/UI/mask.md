<!-- source: https://www.leaferjs.com/ui/en/reference/UI/mask.html -->

# mask 

Mask functionality. It allows you to designate an element inside a Group as a mask, enabling complex clipping effects. It supports 5 mask types.

## Key Property 

### mask: `boolean` | `IMaskType` 

When an element is set as a mask, it will not be rendered itself (except for `clipping` type). Elements above it within the same Group will be affected by the mask.

The default mask type is `pixel`. You can set it to `path` for better performance.

ts

```
type IMaskType =
  | 'path' // Path mask, high performance, uses vector path clipping, does not render itself
  | 'pixel' // Pixel mask, uses per-pixel alpha transparency, can create complex effects, does not render itself
  | 'grayscale' // Grayscale mask, lower performance, converts color to grayscale then to alpha (black = transparent, white = opaque), does not render itself
  | 'clipping' // Clipping mask, same as Photoshop clipping mask, uses pixel alpha and renders itself
  | 'clipping-path' // Clipping path mask, high performance, similar to clipping but uses vector path clipping
```

## Mask Bounds 

By default, the mask’s bounds will be used as the Group’s bounds. In this case, all child elements can still trigger interaction events and are not affected by the Group bounds, unless hitChildren is set to `false`.

## Belongs to 

### UI Element 

## Example 

### Use a ring as a mask 

LeaferApp

ts

```
// #遮罩功能 [将圆环设为遮罩 (Leafer)]
import { Leafer, Group, Ellipse, Image } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group({ x: 100, y: 100 })

const mask = new Ellipse({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: 'black',
    mask: true
})

const image = new Image({
    width: 100,
    height: 100,
    url: '/image/leafer.jpg'
})

leafer.add(group)

group.add([mask, image])
```

ts

```
// #遮罩功能 [将圆环设为遮罩 (App)]
import { App, Group, Ellipse, Image } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const group = new Group({ x: 100, y: 100 })

const mask = new Ellipse({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: 'black',
    mask: true
})

const image = new Image({
    width: 100,
    height: 100,
    url: '/image/leafer.jpg'
})

app.tree.add(group)

group.add([mask, image])
```

### Use a semi-transparent ring as a mask 

LeaferApp

ts

```
// #遮罩功能 [将半透明的圆环设为遮罩 (Leafer)]
import { Leafer, Group, Ellipse, Image } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group({ x: 100, y: 100 })

const mask = new Ellipse({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    opacity: 0.5,
    fill: 'black',
    mask: true,
})

const image = new Image({
    width: 100,
    height: 100,
    url: '/image/leafer.jpg'
})

leafer.add(group)

group.add([mask, image])
```

ts

```
// #遮罩功能 [将半透明的圆环设为遮罩 (App)]
import { App, Group, Ellipse, Image } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const group = new Group({ x: 100, y: 100 })

const mask = new Ellipse({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    opacity: 0.5,
    fill: 'black',
    mask: true,
})

const image = new Image({
    width: 100,
    height: 100,
    url: '/image/leafer.jpg'
})

app.tree.add(group)

group.add([mask, image])
```

### Use a circle group as a mask 

LeaferApp

ts

```
// #遮罩功能 [将圆形组设为遮罩 (Leafer)]
import { Leafer, Group, Ellipse, Image } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group({ x: 100, y: 100 })

const maskGroup = new Group({
    mask: true
})

maskGroup.add(new Ellipse({ width: 60, height: 60, fill: 'black' }))
maskGroup.add(new Ellipse({ x: 50, y: 50, width: 50, height: 50, fill: 'black' }))

const image = new Image({
    width: 100,
    height: 100,
    url: '/image/leafer.jpg'
})

leafer.add(group)

group.add([maskGroup, image])   // [!code hl:]
```

ts

```
// #遮罩功能 [将圆形组设为遮罩 (App)]
import { App, Group, Ellipse, Image } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const group = new Group({ x: 100, y: 100 })

const maskGroup = new Group({
    mask: true
})

maskGroup.add(new Ellipse({ width: 60, height: 60, fill: 'black' }))
maskGroup.add(new Ellipse({ x: 50, y: 50, width: 50, height: 50, fill: 'black' }))

const image = new Image({
    width: 100,
    height: 100,
    url: '/image/leafer.jpg'
})

app.tree.add(group)

group.add([maskGroup, image])   // [!code hl:]
```

### Use a path as a mask 

LeaferApp

ts

```
// #遮罩功能 [将路径设为遮罩 (Leafer)]
import { Leafer, Group, Path, Image } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group({ x: 100, y: 100 })

const mask = new Path({
    scaleX: 0.1,
    scaleY: 0.1,
    path: 'M945.344 586.304c-13.056-93.44-132.48-98.048-132.48-98.048 0-29.888-39.808-47.424-39.808-47.424L201.664 440.832c-36.736 0-42.112 51.264-42.112 51.264 7.68 288 181.44 382.976 181.44 382.976l299.456 0c42.88-31.36 101.888-122.56 101.888-122.56 9.216 3.072 72.768-0.832 97.984-6.144C865.6 740.992 958.336 679.68 945.344 586.304zM365.568 825.28c-145.472-105.664-130.944-328.576-130.944-328.576l80.448 0c-44.416 126.4 43.648 285.696 55.872 307.904C383.232 826.816 365.568 825.28 365.568 825.28zM833.472 694.272c-37.568 22.272-65.152 7.68-65.152 7.68 39.04-54.4 42.112-159.296 42.112-159.296 6.848 2.304 12.288-26.048 61.312 23.744C920.768 616.128 871.04 672.064 833.472 694.272z M351.68 129.856c0 0-119.424 72.832-44.416 140.928 75.008 68.16 68.16 93.44 24.512 153.216 0 0 81.92-41.344 71.168-104.192s-89.6-94.208-72.768-137.792C347.136 138.304 351.68 129.856 351.68 129.856z M615.232 91.648c0 0-119.488 72.832-44.352 140.928 74.944 68.16 68.032 93.44 24.448 153.216 0 0 81.984-41.344 71.232-104.192-10.688-62.784-89.6-94.208-72.832-137.792C610.624 100.032 615.232 91.648 615.232 91.648z M491.136 64c0 0-74.304 6.144-88.128 78.144C389.248 214.144 435.968 240.96 471.936 276.992 507.904 312.96 492.608 380.352 452.032 427.904c0 0 72.768-25.344 89.6-94.976 16.832-69.76-17.344-94.272-52.8-134.784C453.312 157.504 456.64 83.968 491.136 64z',
    fill: 'black',
    mask: true,
})

const image = new Image({
    width: 100,
    height: 100,
    url: '/image/leafer.jpg'
})

leafer.add(group)

group.add([mask, image])
```

ts

```
// #遮罩功能 [将路径设为遮罩 (App)]
import { App, Group, Path, Image } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const group = new Group({ x: 100, y: 100 })

const mask = new Path({
    scaleX: 0.1,
    scaleY: 0.1,
    path: 'M945.344 586.304c-13.056-93.44-132.48-98.048-132.48-98.048 0-29.888-39.808-47.424-39.808-47.424L201.664 440.832c-36.736 0-42.112 51.264-42.112 51.264 7.68 288 181.44 382.976 181.44 382.976l299.456 0c42.88-31.36 101.888-122.56 101.888-122.56 9.216 3.072 72.768-0.832 97.984-6.144C865.6 740.992 958.336 679.68 945.344 586.304zM365.568 825.28c-145.472-105.664-130.944-328.576-130.944-328.576l80.448 0c-44.416 126.4 43.648 285.696 55.872 307.904C383.232 826.816 365.568 825.28 365.568 825.28zM833.472 694.272c-37.568 22.272-65.152 7.68-65.152 7.68 39.04-54.4 42.112-159.296 42.112-159.296 6.848 2.304 12.288-26.048 61.312 23.744C920.768 616.128 871.04 672.064 833.472 694.272z M351.68 129.856c0 0-119.424 72.832-44.416 140.928 75.008 68.16 68.16 93.44 24.512 153.216 0 0 81.92-41.344 71.168-104.192s-89.6-94.208-72.768-137.792C347.136 138.304 351.68 129.856 351.68 129.856z M615.232 91.648c0 0-119.488 72.832-44.352 140.928 74.944 68.16 68.032 93.44 24.448 153.216 0 0 81.984-41.344 71.232-104.192-10.688-62.784-89.6-94.208-72.832-137.792C610.624 100.032 615.232 91.648 615.232 91.648z M491.136 64c0 0-74.304 6.144-88.128 78.144C389.248 214.144 435.968 240.96 471.936 276.992 507.904 312.96 492.608 380.352 452.032 427.904c0 0 72.768-25.344 89.6-94.976 16.832-69.76-17.344-94.272-52.8-134.784C453.312 157.504 456.64 83.968 491.136 64z',
    fill: 'black',
    mask: true,
})

const image = new Image({
    width: 100,
    height: 100,
    url: '/image/leafer.jpg'
})

app.tree.add(group)

group.add([mask, image])
```

## Quick Mask Setup 

You can quickly set a mask element for a Group via a custom function. By default, the mask will be added to the bottom of the Group.

LeaferApp

ts

```
// #遮罩功能 [快速设置遮罩 (Leafer)]
import { Leafer, Group, Ellipse, Image, UI } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group({ x: 100, y: 100, draggable: true })

const image = new Image({
    width: 100,
    height: 100,
    url: '/image/leafer.jpg'
})

addMask(group, new Ellipse({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: 'black',

}))

leafer.add(group)
group.add(image)


console.log(
    getMask(group) // ellipse
)


// 自定义函数

function addMask(group: Group, maskChild: UI) {
    if (group.children.some(item => item.mask)) removeMask(group)
    maskChild.mask = true
    group.addAt(maskChild, 0)
}

function getMask(group: Group): UI {
    return group.children.find(item => item.mask) as UI
}

function removeMask(group: Group, maskChild?: UI): void {
    if (maskChild) {
        maskChild.mask = false
        group.remove(maskChild)
    } else {
        const { children } = group
        for (let i = 0, len = children.length; i < len; i++) {
            maskChild = children[i] as UI
            if (maskChild.mask) {
                removeMask(group, maskChild)
                len--, i--
            }
        }
    }
}
```

ts

```
// #遮罩功能 [快速设置遮罩 (App)]
import { App, Group, Ellipse, Image, UI } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const group = new Group({ x: 100, y: 100, draggable: true })

const image = new Image({
    width: 100,
    height: 100,
    url: '/image/leafer.jpg'
})

addMask(group, new Ellipse({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: 'black',

}))

app.tree.add(group)
group.add(image)


console.log(
    getMask(group) // ellipse
)


// 自定义函数

function addMask(group: Group, maskChild: UI) {
    if (group.children.some(item => item.mask)) removeMask(group)
    maskChild.mask = true
    group.addAt(maskChild, 0)
}

function getMask(group: Group): UI {
    return group.children.find(item => item.mask) as UI
}

function removeMask(group: Group, maskChild?: UI): void {
    if (maskChild) {
        maskChild.mask = false
        group.remove(maskChild)
    } else {
        const { children } = group
        for (let i = 0, len = children.length; i < len; i++) {
            maskChild = children[i] as UI
            if (maskChild.mask) {
                removeMask(group, maskChild)
                len--, i--
            }
        }
    }
}
```
