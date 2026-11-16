<!-- source: https://www.leaferjs.com/ui/en/reference/event/basic/Image.html -->

# ImageEvent 

Image event.

Inheritance

ImageEvent  >  Event

## Key Properties 

### image: `ILeaferImage` 

Original wrapped image object.

### error: `string` | `object` 

Image loading error information.

## Auxiliary Properties 

Used to distinguish cases where multiple image patterns are used within a single shape.

### attrName: `string` 

Pattern fill attribute name: `fill` | `stroke`

### attrValue: `ImagePaint` 

Pattern fill attribute value.

## Event Names 

### ImageEvent.LOAD 

Image starts loading.

`image.load`

### ImageEvent.LOADED 

Image loading completed.

`image.loaded`

### ImageEvent.ERROR 

Image loading failed.

`image.error`

## Inherited Events 

### ImageEvent  >  Event 

## Example 

### Listen to image loading on Image 

image.tsimage.js

ts

```
// #监听图片事件 [加载成功]
import { Leafer, Image, ImageEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const image = new Image({
    url: '/image/leafer.jpg',
    draggable: true
})

image.once(ImageEvent.LOADED, function (e: ImageEvent) {
    console.log(e)
})

leafer.add(image)
```

js

```
// #监听图片事件 [加载成功]
import { Leafer, Image, ImageEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const image = new Image({
    url: '/image/leafer.jpg',
    draggable: true
})

image.once(ImageEvent.LOADED, function (e) {
    console.log(e)
})

leafer.add(image)
```

### Listen to image loading in fill 

rect.tsrect.js

ts

```
// #监听 fill 图片事件 [加载成功]
import { Leafer, Rect, ImageEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    fill: { type: 'image', url: '/image/leafer.jpg' },
    draggable: true
})

rect.once(ImageEvent.LOADED, function (e: ImageEvent) {
    console.log(e)
})

leafer.add(rect)
```

js

```
// #监听 fill 图片事件 [加载成功]
import { Leafer, Rect, ImageEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    fill: { type: 'image', url: '/image/leafer.jpg' },
    draggable: true
})

rect.once(ImageEvent.LOADED, function (e) {
    console.log(e)
})

leafer.add(rect)
```

### Listen to error 

error.tserror.js

ts

```
// #监听图片事件 [加载失败]
import { Leafer, Image, ImageEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const image = new Image({
    url: '/image/leafer.jpg',
    draggable: true
})

image.once(ImageEvent.ERROR, function (e: ImageEvent) {
    console.log(e.error)
})

leafer.add(image)
```

js

```
// #监听图片事件 [加载失败]
import { Leafer, Image, ImageEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const image = new Image({
    url: '/image/leafer.jpg',
    draggable: true
})

image.once(ImageEvent.ERROR, function (e) {
    console.log(e.error)
})

leafer.add(image)
```
