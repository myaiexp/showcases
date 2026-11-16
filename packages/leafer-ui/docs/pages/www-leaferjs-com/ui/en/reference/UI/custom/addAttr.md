<!-- source: https://www.leaferjs.com/ui/en/reference/UI/custom/addAttr.html -->

# addAttr 

Add a new element property (static method). Once added, the property can be tracked for changes and exported in JSON.

## Key Properties 

### addAttr ( attrName: `string`, defaultValue: `IValue`, typeFn?: IAttrDecorator ) 

Adds a new element property (global operation). `defaultValue` is the default value (supports returning a function), and `typeFn` is a data decorator (defaults to boundsType).

## Data Decorators 

Data processing methods that automatically generate setter/getter functions with related business logic for properties.

### boundsType 

Bounds type.

When the property changes, it triggers element re-layout and re-rendering.

### surfaceType 

Surface type.

When the property changes, it triggers re-rendering only, without layout updates.

### dataType 

Data type.

When the property changes, it does not trigger layout or rendering.

## Belongs To 

### UI Elements 

## Example 

### Add a custom float property to Text 

LeaferApp

ts

```
// #新增元素属性 [为文本新增一个 float 属性 (Leafer)]
import { Leafer, Text } from 'leafer-ui'

const leafer = new Leafer({ view: window })

Text.addAttr('float', 'left')  

// default float

const text = new Text({ text: 'Welcome to LeaferJS' })

leafer.add(text)

console.log((text as any).float) // left

// set float

const text2 = new Text({ float: 'right' } as any)

console.log((text2 as any).float) // right
```

ts

```
// #新增元素属性 [为文本新增一个 float 属性 (App)]
import { App, Text } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

Text.addAttr('float', 'left')  

// default float

const text = new Text({ text: 'Welcome to AppJS' })

app.tree.add(text)

console.log((text as any).float) // left

// set float

const text2 = new Text({ float: 'right' } as any)

console.log((text2 as any).float) // right
```

### Add a dynamic float property to Text 

LeaferApp

ts

```
// #新增元素属性 [为文本新增一个可变 float 属性 (Leafer)]
import { Leafer, Text } from 'leafer-ui'

const leafer = new Leafer({ view: window })

Text.addAttr('float', (text: Text) => { return text.width === 200 ? 'center' : 'left' })  

// default float

const text = new Text({ text: 'Welcome to LeaferJS' })

leafer.add(text)

console.log((text as any).float) // left

text.width = 200

console.log((text as any).float) // right

// set float

const text2 = new Text({ float: 'right' } as any)

console.log((text2 as any).float) // right
```

ts

```
// #新增元素属性 [为文本新增一个可变 float 属性 (App)]
import { App, Text } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

Text.addAttr('float', (text: Text) => { return text.width === 200 ? 'center' : 'left' })  

// default float

const text = new Text({ text: 'Welcome to AppJS' })

app.tree.add(text)

console.log((text as any).float) // left

text.width = 200

console.log((text as any).float) // right

// set float

const text2 = new Text({ float: 'right' } as any)

console.log((text2 as any).float) // right
```

### Add a dataType property to Text 

LeaferApp

ts

```
// #新增元素属性 [为文本新增一个 dataType 类型的属性 (Leafer)]
import { Leafer, Text, dataType } from 'leafer-ui'

const leafer = new Leafer({ view: window })

Text.addAttr('version', '2.3.4', dataType)  

// default version

const text = new Text({ text: 'Welcome to LeaferJS' })

leafer.add(text)

console.log((text as any).version) // 2.3.4

// set version

const text2 = new Text({ version: '2.3.4' } as any)

console.log((text2 as any).version) // 2.3.4
```

ts

```
// #新增元素属性 [为文本新增一个 dataType 类型的属性 (App)]
import { App, Text, dataType } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

Text.addAttr('version', '2.3.4', dataType)  

// default version

const text = new Text({ text: 'Welcome to AppJS' })

app.tree.add(text)

console.log((text as any).version) // 2.3.4

// set version

const text2 = new Text({ version: '2.3.4' } as any)

console.log((text2 as any).version) // 2.3.4
```
