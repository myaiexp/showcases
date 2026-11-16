<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/editOuter/register.html -->

# Register Edit Tool 

The first step of customizing an edit tool is: **registering an edit tool**.

Edit tools are generally used to control the size and shape of elements, and are automatically loaded when an element is selected.

## Notes 

In a TypeScript environment, you need to enable decorator support in the `tsconfig.json` configuration file:

tsconfig.json

json

```
{
  "compilerOptions": {
    "experimentalDecorators": true // enable decorator support
  }
}
```

## Registration Steps 

### 1. Register edit tool 

Register the edit tool via the `registerEditTool()` method.

Implementation: the edit tool's tag property is used as a key to store the edit tool class.

### 2. Define tag name 

Define a globally unique tag name.

When loading an edit tool, the system uses the tag property to locate and instantiate the corresponding edit tool class.

## Inheritance 

### EditTool 

## Example 

index.tsindex.js

ts

```
import { EditTool, registerEditTool } from '@leafer-in/editor'


@registerEditTool()  // 1. 注册编辑工具
export class CustomEditTool extends EditTool {

    public get tag() { return 'CustomEditTool' } // 2. 定义全局唯一的 tag 名称

}
```

js

```
import { EditTool, Editor } from '@leafer-in/editor'


export class CustomEditTool extends EditTool {

     get tag() { return 'CustomEditTool' } // 2. 定义全局唯一的 tag 名称

}

CustomEditTool.registerEditTool() // 1. 注册编辑工具
```

## Next Step 

### Custom Control Points 
