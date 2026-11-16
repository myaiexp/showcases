<!-- source: https://www.leaferjs.com/ui/en/reference/display/custom/base/attr.html -->

# Add Attributes 

The **3rd step** in creating a custom element is: **adding attributes**.

Attributes are divided into **normal attributes** and **data attributes**. Here we mainly focus on **data attributes** (attributes that can be exported to JSON).

## Steps to Add 

### 1. Add the attribute in the interface 

You need to add the attribute in both the input data interface and the data processing (computed data) interface (can be ignored in JS).

### 2. Add the attribute in the element 

After adding a data attribute, you also need to assign an attribute handler, otherwise it will not be included in JSON export.

## Attribute Handler 

Automatically generates setter/getter functions with related business logic for data attributes. Common types:

### boundsType 

Bounding box type.

When this property changes, it triggers **re-layout and re-rendering** of the element.

### surfaceType 

Surface type.

When this property changes, it triggers **re-rendering only**, without layout recalculation.

### dataType 

Data type.

When this property changes, it triggers **no layout or rendering update**.

## Normal Attributes 

#### createAttr ( defaultValue: `any` ) 

Creates a normal attribute. This data will **not be included in exported JSON**, and is only converted into getter/setter.

It can solve issues where class inheritance execution order causes overridden internal methods to fail when accessing properties.

tsjs

ts

```
import { createAttr } from '@leafer-ui/core' // import cross-platform core package

class Custom {
  @createAttr(true)
  public canUse: number // converted to getter/setter, default value is true
}
```

js

```
import { createAttr } from '@leafer-ui/core' // import cross-platform core package

class Custom {
  canUse = true
}

createAttr(true)(Custom.prototype, 'canUse') // converted to getter/setter, default value is true
```

## Special Handling 

### set logic handling 

You can define custom set logic for an element in the data processing class using `set + propertyName`.

If a data attribute has no special logic, you only need to create an empty data processing class, and everything will be handled automatically internally.

ts

```
// set handler for width
export class CustomData extends RectData {
  _width: number // private variable for computed data

  // Automatically becomes the setter for width and is removed internally, so do NOT call super.setWidth(value)
  setWidth(value: number): void {
    this._width = Math.ceil(value)
    // this.__leaf can be used to access the element instance
  }
}
```

### Naming rules for data processing variables 

1. Variables without underscore: computed getter/setter variables, auto-generated, cannot be manually set.
2. Single underscore variables: private computed data variables, auto-generated as needed, can be set.
3. Other variables MUST use double underscore `__` prefix, otherwise issues may occur.

ts

```
// other variable naming
export class CustomData extends RectData {
  __isAutoSize: number // non-data attribute, used for business logic
}
```

## Example 

index.tsindex.js

ts

```
// #自定义元素 [添加属性]
import { Rect, RectData, registerUI, dataProcessor, boundsType } from '@leafer-ui/core' // 引入跨平台核心包
import { IRectInputData, IRectData } from '@leafer-ui/interface'


// 1. 在数据接口中添加属性

export interface ICustomInputData extends IRectInputData {
    left?: number | string // 输入数据，必须为可选
}

export interface ICustomData extends IRectData {
    left?: number // 计算数据，必须为可选
}

export class CustomData extends RectData implements ICustomData {

}

@registerUI()
export class Custom extends Rect {

    public get __tag() { return 'Custom' }

    @dataProcessor(CustomData)
    declare public __: ICustomData

    // 2. 添加属性，并指定属性处理器
    @boundsType(0)
    declare public left: number | string

    constructor(data: ICustomInputData) {
        super(data)
        // ...
    }

}


// 使用自定义元素
import { Leafer } from 'leafer-ui'

const leafer = new Leafer({ view: window })
const custom = new Custom({ left: 50, width: 100, height: 200, fill: 'blue', draggable: true })

leafer.add(custom)

console.log(custom.toJSON()) // 导出json {tag: 'Custom',left: 50, width: 200, height: 50, fill: 'blue', draggable: true }
```

js

```
import { Rect, RectData, boundsType } from '@leafer-ui/core' // 引入跨平台核心包


export class Custom extends Rect {
    get __tag() { return 'Custom' }
}

export class CustomData extends RectData {

}

Custom.registerUI()
Custom.registerData(CustomData)

// 1. 添加属性，并指定属性处理器
Custom.addAttr('left', 0, boundsType) 


// 使用自定义元素
import { Leafer } from 'leafer-ui'

const leafer = new Leafer({ view: window })
const custom = new Custom({ left: 50, width: 100, height: 200, fill: 'blue', draggable: true })

leafer.add(custom)

console.log(custom.toJSON()) // 导出json {tag: 'Custom',left: 50, width: 200, height: 50, fill: 'blue', draggable: true }
```

## Next Step 

### Add Methods 
