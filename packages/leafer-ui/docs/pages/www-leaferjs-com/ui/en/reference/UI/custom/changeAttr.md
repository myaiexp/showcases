<!-- source: https://www.leaferjs.com/ui/en/reference/UI/custom/changeAttr.html -->

# changeAttr 

Modify an element property (static method), typically used to change default values.

## Key Properties 

### changeAttr ( attrName: `string`, defaultValue: `IValue` ) 

Modifies the default value of an element property (global operation, supports returning a function).

## Belongs To 

### UI Elements 

## Example 

### Change the default fill color of Text to red 

All newly created Text elements will have a red fill color by default, without affecting other element types.

LeaferApp

ts

```
// #修改元素属性 [修改文本默认填充色为红色 (Leafer)]
import { Leafer, Text } from 'leafer-ui'

const leafer = new Leafer({ view: window })

Text.changeAttr('fill', 'red')  

const text = new Text({ text: 'Welcome to LeaferJS' })

leafer.add(text)
```

ts

```
// #修改元素属性 [修改文本默认填充色为红色 (App)]
import { App, Text } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

Text.changeAttr('fill', 'red')  

const text = new Text({ text: 'Welcome to AppJS' })

app.tree.add(text)
```

### Change the default fill color of Text to a dynamic color 

LeaferApp

ts

```
// #修改元素属性 [修改文本默认填充色为可变颜色 (Leafer)]
import { Leafer, Text } from 'leafer-ui'

const leafer = new Leafer({ view: window })

Text.changeAttr('fill', (text: Text) => { return text.width === 50 ? 'blue' : 'red' })  

const text = new Text({ text: 'Welcome to LeaferJS' })

leafer.add(text)

setTimeout(() => {

    text.width = 50

}, 1000)
```

ts

```
// #修改元素属性 [修改文本默认填充色为可变颜色 (App)]
import { App, Text } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

Text.changeAttr('fill', (text: Text) => { return text.width === 50 ? 'blue' : 'red' })  

const text = new Text({ text: 'Welcome to AppJS' })

app.tree.add(text)

setTimeout(() => {

    text.width = 50

}, 1000)
```
