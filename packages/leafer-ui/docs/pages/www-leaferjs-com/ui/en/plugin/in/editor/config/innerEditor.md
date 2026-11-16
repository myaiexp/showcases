<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/config/innerEditor.html -->

# Editor Configuration 

### Basic     Events     Styles     Button Groups     Cursor     Selection     Control     Enable     Internal Editor 

## 

Internal editor configuration can be modified in real time during application runtime via app.editor.config.

At the same time, elements have an independent editor configuration property, which can override the main configuration in real time.

## Key Properties 

### textEditor： `object` 

Custom configuration for the text editor.

ts

```
// Accessed internally via:
app.editor.mergeConfig.textEditor
```

### pathEditor： `object` 

Custom configuration for the path editor.

ts

```
// Accessed internally via:
app.editor.mergeConfig.pathEditor
```

### ...Editor 

You can extend custom configuration objects as needed.

ts

```
// Accessed internally via:
app.editor.mergeConfig.anyEditor
```
