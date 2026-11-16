<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/editInner/register.html -->

# Register Internal Editor 

The first step of customizing the internal editor is: **registering an internal editor**.

Internal editors are generally used to edit internal details such as text and paths, and are opened by double-clicking elements.

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

### 1. Register internal editor 

Register the internal editor via the `registerInnerEditor()` method.

Implementation: the editor tool's tag property is used as a key to store the internal editor class.

### 2. Define tag name 

Define a globally unique tag name.

When loading an internal editor, the system uses the tag property to locate and instantiate the corresponding internal editor class.

## Inheritance 

### InnerEditor 

## Example 

index.tsindex.js

ts

```
import { InnerEditor, registerInnerEditor } from '@leafer-in/editor'


@registerInnerEditor()  // 1. 注册内部编辑器
export class CustomEditor extends InnerEditor {

    public get tag() { return 'CustomEditor' } // 2. 定义全局唯一的 tag 名称

}
```

js

```
import { InnerEditor } from '@leafer-in/editor'


export  class CustomEditor extends InnerEditor {

     get tag() { return 'CustomEditor' } // 2. 定义全局唯一的 tag 名称

}

CustomEditor.registerInnerEditor() // 1. 注册内部编辑器
```

## Next Step 

### Custom Control Points 
