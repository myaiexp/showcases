<!-- source: https://www.leaferjs.com/ui/en/reference/resource/Resource.html -->

# Resource 

Resource library, external resource management (static class).

Used to manage and orderly load assets such as images, videos, sounds, etc.

## Key Properties 

### task: `TaskProcessor` 

Global parallel asynchronous resource loading tasks, automatically limits the maximum concurrency, see example.

### queue: `TaskProcessor` 

Global sequential task queue (currently mainly used for pattern generation), prevents blocking main thread rendering, see example.

## Key Methods 

### loadImage ( key: `string`, format?: `IExportFileType` ): Promise<`ILeaferImage`> 

Preload image resources. `key` is the image URL, and `format` is used to force the image type.

### setImage ( key: `string`, value: `string` | `IObject` | `ILeaferImage` | `ILeaferCanvas`, format?: `IExportFileType` ): `ILeaferImage` 

Customize the `key` of image resources. It is recommended to use the leafer:// protocol + file extension for easy identification when exporting resources.

`value` supports base64, raw images, canvas, and wrapped cross-platform images and canvas.

`format` is used to force the image type.

### set ( key: `string`, value: `any` ) 

Set the resource `key`. Image types must be `ILeaferImage`.

### get ( key: `string` ): `any` 

Get the resource object by `key`.

### remove ( key: `string` ) 

Remove the resource by `key`. Memory will be automatically released after removal.

### destroy ( ) 

Destroy all resources.

## Examples 

### Wait for the image to load, then add it to the engine 

ts

```
// #等待图片加载完，再添加到引擎中
import { Leafer, Image, Resource } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const url = '/image/leafer.jpg'

Resource.loadImage(url).then(() => {

    leafer.add(new Image({ url }))

})
```

### Convert raw image object to URL 

ts

```
// #图片 url [原始图片对象转 url]  
import { Leafer, Image, Platform, Resource } from 'leafer-ui'

const leafer = new Leafer({ view: window })

Platform.origin.loadImage('/image/leafer.jpg').then((img) => { // 加载原始图片对象（跨平台）

    const { url } = Resource.setImage('leafer://test1.jpg', img) // 原始图片对象 转为 自定义资源符

    leafer.add(new Image({ url })) // url = leafer://test1.jpg

})
```

### Convert raw canvas object to URL 

ts

```
// #图片 url [原始 canvas 对象转 url]
import { Leafer, Image, Platform, Resource } from 'leafer-ui'

const leafer = new Leafer({ view: window })

Platform.origin.loadImage('/image/leafer.jpg').then((img) => {

    const canvas = document.createElement('canvas') // 原始画布
    canvas.width = img.width
    canvas.height = img.height
    canvas.getContext('2d').drawImage(img, 0, 0)

    const { url } = Resource.setImage('leafer://test2.jpg', canvas) // 原始canvas 对象 转为 自定义资源符

    leafer.add(new Image({ url })) // url = leafer://test2.jpg

})
```

### Convert cross-platform LeaferCanvas object to URL 

ts

```
// #图片 url [跨平台 LeaferCanvas 对象转 url] 
import { Leafer, Image, LeaferCanvas, Platform, Resource } from 'leafer-ui'

const leafer = new Leafer({ view: window })

Platform.origin.loadImage('/image/leafer.jpg').then((img) => {

    const leaferCanvas = new LeaferCanvas({ width: img.width, height: img.height }) // LeaferCanvas 跨平台画布
    leaferCanvas.drawImage(img, 0, 0)

    const { url } = Resource.setImage('leafer://test3.jpg', leaferCanvas) // LeaferCanvas 转为 自定义资源符

    leafer.add(new Image({ url })) // url = leafer://test3.jpg

})
```

### Add a custom asynchronous task 

export() will wait for this task to complete before exporting the image.

ts

```
// #添加一个自定义异步任务（导出图片时会等待此任务执行完再导出）
import { Resource } from 'leafer-ui'

async function doSomething() {
    // 执行异步任务
}

// 添加异步任务
Resource.tasker.add(async () => await doSomething())
```

### Add a queue task 

ts

```
// #添加一个自定义队列任务（防止阻塞主线程渲染）
import { Resource } from 'leafer-ui'

async function doSomething() {
    // 执行队列任务
}

// 添加队列任务
Resource.queue.add(async () => await doSomething())

// 如果队列被卡住，可以调用 stop 强制结束队列，不影响后续添加任务的执行。
Resource.queue.stop()
```
