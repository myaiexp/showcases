<!-- source: https://www.leaferjs.com/ui/en/reference/display/Text.html -->

# Text Element 

Render text. Rendering is similar to HTML5 text display and supports multi-line text.

  

Inheritance

Text  >  UI

## Key Properties 

### width?: `number` 

Text box width. If not set or set to `undefined`, it uses auto width.

You can check whether it is auto width via isAutoWidth.

### height?: `number` 

Text box height. If not set or set to `undefined`, it uses auto height.

You can check whether it is auto height via isAutoHeight.

### text: `string` | `number` 

Text content.

## Placeholder Properties 

### placeholder: `string` 

Placeholder text shown when the text is empty.

### placeholderColor: `string` 

Color of the placeholder text.

## Style Properties 

### fontFamily: `string` 

Font family, same as CSS. Multiple fonts can be separated by commas.

Note: Font names containing spaces must be wrapped in quotes internally or remove spaces. The first character of the font name cannot be a number.

### fontSize: `number` 

Font size.

### fontWeight: `IFontWeightNumer` | `IFontWeightString` 

Font weight.

ts

```
type IFontWeightNumer = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

type IFontWeightString =
  | 'thin' // 100
  | 'extra-light' // 200
  | 'light' // 300
  | 'normal' // 400
  | 'medium' // 500
  | 'semi-bold' // 600
  | 'bold' // 700
  | 'extra-bold' // 800
  | 'black' // 900
```

### italic: `boolean` 

Whether the text is italic.

### textCase: `ITextCase` 

Text case format.

ts

```
type ITextCase =
  | 'title' // capitalize first letter of each word
  | 'upper' // uppercase all letters
  | 'lower' // lowercase all letters
  | 'none'
```

### textDecoration: `ITextDecoration` 

Underline or strikethrough.

ts

```
type ITextDecoration =
  | 'under' // underline
  | 'delete' // strikethrough
  | 'under-delete' // underline + strikethrough
  | 'none'
  | ITextDecorationData

interface ITextDecorationData {
  type: ITextDecorationType // underline / delete / under-delete
  color: IColor // decoration color
  offset?: number // underline offset (has min/max constraints to avoid layout issues)
}

// Usage
text.textDecoration = 'under' // underline

text.textDecoration = { type: 'under', color: 'red' } // red underline

text.textDecoration = { type: 'under', color: 'red', offset: -2 }
```

### letterSpacing: `number` | `IUnitData` 

Letter spacing. Supports percentage values. Default is 0.

ts

```
interface IUnitData {
  type: 'percent' | 'px'
  value: number
}

text.letterSpacing = {
  type: 'percent',
  value: 0.5, // 50%
}
```

### wordSpacing: `number` | `IUnitData` 

Word spacing. Supports percentage values. Default is 0.

ts

```
interface IUnitData {
  type: 'percent' ｜ 'px'
  value: number
}

text.wordSpacing = {
  type: 'percent',
  value: 0.5, // 50%
}
```

### lineHeight: `number` | `IUnitData` 

Line height. Supports percentage values. Default line height is 150%.

ts

```
text.lineHeight = {
  type: 'percent',
  value: 1.5, // 150%
}
```

### textWrap: `ITextWrap` 

Text wrapping rule. Default is `normal`.

ts

```
type ITextWrap =
  | 'normal' // wrap at allowed break points, do not break words
  | 'none' // no wrapping
  | 'break' // break words (like CSS break-all)
```

### textOverflow: `IOverflow` | `string` 

How to handle text overflow within fixed width/height. Supports custom ellipsis text.

ts

```
type IOverflow = 'show' | 'hide'

// custom ellipsis
text.textOverflow = '...'
```

## Paragraph Properties 

### paraIndent: `number` 

First-line indent in px.

TIP

In HTML5 text editing mode, `\n` should be replaced with `<p>` tags. Paragraph styles are applied on `<p>` elements.

### paraSpacing: `number` 

Paragraph spacing in px.

### textAlign: `ITextAlign` 

Text alignment. You can use `'both'` for full justification.

When no width/height is set, autoSizeAlign affects default alignment behavior.

ts

```
type ITextAlign =
  | 'left' // left align
  | 'center' // center align
  | 'right' // right align
  | 'justify' // justify text (last line not justified)
  | 'justify-letter' // justify by adjusting letter spacing
  | 'both' // force full justification for all lines
  | 'both-letter' // force justification using letter spacing
```

### verticalAlign: `IVerticalAlign` 

Vertical alignment.

ts

```
type IVerticalAlign =
  | 'top' // top align
  | 'middle' // vertical center
  | 'bottom' // bottom align
```

### autoSizeAlign: `boolean` 

Whether to align origin point when width/height is not set. Default is true (design-tool behavior).

Set to false for HTML-like behavior (ignore alignment rules).

### padding: `number` | `number[]` 

Inner padding of text.

ts

```
padding: [20, 10, 20, 10] // [top, right, bottom, left]
padding: [20, 10, 20] // [top, (right-left), bottom]
padding: [20, 10] // [ (top-bottom), (right-left)]
padding: 20 // all sides
```

## Background Box 

### boxStyle: `IBackgroundBoxStyle` 

Background style for text. Supports most visual properties of Rect.

ts

```
boxStyle: {
  fill: '#32cd79',
  stroke: 'black',
  cornerRadius: 6,
  shadow: {
    x: 10,
    y: -10,
    blur: 20,
    color: '#FF0000AA'
  }
}
```

## Editing Properties 

### resizeFontSize: `boolean` 

Whether auto-sized text resizes by changing font size. Default is false.

### textEditing: `boolean` 

Whether text is currently in editing mode (read-only). Not included in JSON export.

## Helper Properties 

### renderSpread: `number` 

Expands rendering bounds to avoid clipping caused by text measurement inaccuracies. Default is 0.

## Computed Properties (Read-only) 

### isOverflow: `boolean` 

Whether the text overflows its bounds. Available after layout is completed.

## Get Content Bounds 

Get actual bounding box of text content:

ts

```
const { x, y, width, height } = text.getBounds('content', 'inner')
```

## Inheritance 

### Text  >  UI 

## Examples 

### Create Text 

LeaferApp

ts

```
// #创建 Text [标准创建 (Leafer)]
import { Leafer, Text } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const text = new Text({
    fill: '#32cd79',
    text: 'Welcome to LeaferJS',
})

leafer.add(text)
```

ts

```
// #创建 Text [标准创建 (App)]
import { App, Text } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/text-editor' // 导入文本编辑插件 

const app = new App({ view: window, editor: {} })

const text = new Text({
    fill: '#32cd79',
    text: 'Welcome to LeaferJS',
    editable: true
})

app.tree.add(text)
```

### Text with Background Box 

LeaferApp

ts

```
// #创建 Text [带背景框样式 (Leafer)]
import { Leafer, Text } from 'leafer-ui'
import '@leafer-in/state' // 导入交互状态插件 
import '@leafer-in/animate' // 导入动画插件  

const leafer = new Leafer({ view: window })

const text = new Text({
    fill: 'black',
    text: 'Welcome to LeaferJS',
    padding: 10,
    boxStyle: { // 设置背景框样式
        fill: '#32cd79',
        stroke: 'black',
        cornerRadius: 6
    },
    hoverStyle: { // hover 样式
        boxStyle: {
            fill: '#FF4B4B',
            cornerRadius: 20
        }
    }
})

leafer.add(text)
```

ts

```
// #创建 Text [带背景框样式 (App)]
import { App, Text } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/text-editor' // 导入文本编辑插件 

const app = new App({ view: window, editor: {} })

const text = new Text({
    fill: 'black',
    text: 'Welcome to LeaferJS',
    padding: 10,
    boxStyle: { // 设置背景框样式
        fill: '#32cd79',
        stroke: 'black',
        cornerRadius: 6
    },
    editable: true
})

app.tree.add(text)
```

### Auto-Sizing Background Text 

Alternative implementation using Box, which auto-sizes to content when width/height is not set.

LeaferApp

ts

```
// #创建 Box [自适应文本 (Leafer)]
import { Leafer, Box } from 'leafer-ui'

const leafer = new Leafer({ view: window, fill: '#333' })

// Box 不设置宽高时，将自适应内容
const box = new Box({
    x: 100,
    y: 100,
    fill: '#FF4B4B',
    cornerRadius: 20,
    children: [{
        tag: 'Text',
        text: 'Welcome to LeaferJS',
        fill: 'black',
        padding: [10, 20],
        textAlign: 'left',
        verticalAlign: 'top'
    }]
})

leafer.add(box)
```

ts

```
// #创建 Box [自适应文本 (App)]
import { App, Box } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/text-editor' // 导入文本编辑插件 


const app = new App({ view: window, editor: {}, fill: '#333' })

// Box 不设置宽高时，将自适应内容
const box = new Box({
    x: 100,
    y: 100,
    fill: '#FF4B4B',
    cornerRadius: 20,
    textBox: true,
    hitChildren: false, // 阻止直接选择子元素（防止父子选择冲突，可双击进入组内选择子元素）
    editable: true,
    resizeChildren: true, // 同时 resize 文本
    children: [{
        tag: 'Text',
        text: 'Welcome to LeaferJS',
        fill: 'black',
        padding: [10, 20],
        textAlign: 'left',
        verticalAlign: 'top'
    }]
})

app.tree.add(box)
```

### Placeholder Text 

Show placeholder text when the text is empty.

LeaferApp

ts

```
// #创建 Text [占位符文本 (Leafer)]
import { Leafer, Text } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const text = new Text({
    fill: '#32cd79',
    placeholder: '请输入文本', // 占位符文本
    placeholderColor: 'rgba(120,120,120,0.5)',  // 占位符颜色
})

leafer.add(text)

setTimeout(() => {

    text.text = 'Welcome to LeaferJS'

}, 1000)
```

ts

```
// #创建 Text [占位符文本 (App)]
import { App, Text } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/text-editor' // 导入文本编辑插件 

const app = new App({ view: window, editor: {} })

const text = new Text({
    fill: '#32cd79',
    placeholder: '请输入文本', // 占位符文本
    placeholderColor: 'rgba(120,120,120,0.5)',  // 占位符颜色
    editable: true
})

app.tree.add(text)
```

### Count Animation 

When `text` is a number, it supports count animation. The example animates from 0 to 100.

ts

```
// #动画样式 [文本count动画 (Leafer)]
import { Leafer, Text } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const text = new Text({
    fill: '#32cd79',
    text: 0,
    animation: {
        style: { text: 100 },
        duration: 2
    }
})

leafer.add(text)
```

### Typewriter Animation 

ts

```
// #动画样式 [打字机动画 (Leafer)]
import { Leafer, Text } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const text = new Text({
    fill: '#32cd79',
    animation: {
        style: { text: 'Welcome to LeaferJS' },
        duration: 2,
    }
})

leafer.add(text)
```

### Delete Animation 

ts

```
// #动画样式 [删除文本动画 (Leafer)]
import { Leafer, Text } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const text = new Text({
    fill: '#32cd79',
    text: 'Welcome to LeaferJS',
    animation: {
        style: { text: '' },
        duration: 2,
    }
})

leafer.add(text)
```
