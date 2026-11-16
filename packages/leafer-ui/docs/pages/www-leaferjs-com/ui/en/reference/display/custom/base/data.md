<!-- source: https://www.leaferjs.com/ui/en/reference/display/custom/base/data.html -->

# Register Data 

The **2nd step** in creating a custom element is: **registering the data processing class**.

The element’s `ui.__` property is automatically created as an instance of the data processing class, which is used to compute and store multiple states of data attributes.

## Registration Steps 

### 1. Define data interfaces 

You need to define interfaces for both input data and computed data (can be ignored in JS).

**Naming conventions:**

Input data interface: `I + ElementName + InputData`, e.g. `IRectInputData`

Data processing interface: `I + ElementName + Data`, e.g. `IRectData`

### 2. Define the data processing class 

This class should extend the previously defined base data class.

**Naming convention:** `ElementName + Data`, e.g. `RectData`

### 3. Register the data processing class 

Make sure to register it **before other data attributes**. The data instance will be automatically created when the element is instantiated.

### 4. Define initial input data 

This is mainly used for TypeScript type checking and autocomplete when creating elements (can be ignored in JS).

## Understanding Data Structure 

### Data layering structure 

## Example 

index.tsindex.js

ts

```
// #自定义元素 [定义数据]
import { Rect, RectData, registerUI, dataProcessor } from '@leafer-ui/core' // 引入跨平台核心包
import { IRectInputData, IRectData } from '@leafer-ui/interface'


// 1. 定义数据接口

export interface ICustomInputData extends IRectInputData {
    // 输入数据接口，需定义为可选项，比如: width?: number | string
}

export interface ICustomData extends IRectData {
    // 数据处理（计算数据）接口, 需定义为可选项，比如: width?: number
}

// 2. 定义数据处理类
export class CustomData extends RectData implements ICustomData {
    // 元素数据类，负责元素的数据处理， 没有特殊处理逻辑的情况，定义一个空类就行
}


@registerUI()
export class Custom extends Rect {

    public get __tag() { return 'Custom' }

    // 3. 注册数据处理类，防止污染被继承元素的数据
    @dataProcessor(CustomData)
    declare public __: ICustomData


    // 4. 定义初始化输入数据
    constructor(data: ICustomInputData) {
        super(data)
        // ...
    }

}


// 使用自定义元素
import { Leafer } from 'leafer-ui'

const leafer = new Leafer({ view: window })
const custom = new Custom({ width: 100, height: 200, fill: 'blue', draggable: true })

leafer.add(custom)

console.log(custom.toJSON()) // 导出json {tag: 'Custom', width: 200, height: 50, fill: 'blue', draggable: true }
```

js

```
import { Rect, RectData } from '@leafer-ui/core' // 引入跨平台核心包


export class Custom extends Rect {
    get __tag() { return 'Custom' }
}

Custom.registerUI()

// 1. 定义数据处理类
export class CustomData extends RectData {
    // 元素数据类，负责元素的数据处理， 没有特殊处理逻辑的情况，定义一个空类就行
}

 // 2. 注册数据处理类，防止污染被继承元素的数据
 Custom.registerData(CustomData)


 // 使用自定义元素
 import { Leafer } from 'leafer-ui'
 
const leafer = new Leafer({ view: window })
const custom = new Custom({ width: 100, height: 200, fill: 'blue', draggable: true })

leafer.add(custom)

console.log(custom.__ instanceof CustomData) // true, 可以检查一下类型是否生效
console.log(custom.toJSON()) // 导出json {tag: 'Custom', width: 200, height: 50, fill: 'blue', draggable: true }
```

## Next Step 

### Add Attributes 
