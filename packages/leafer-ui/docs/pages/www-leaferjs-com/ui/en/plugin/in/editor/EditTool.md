<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/EditTool.html -->

# EditTool 

Default edit tool.

It is generally used to edit the size and shape of elements. It is automatically loaded when an element is selected. See Custom Edit Tool.

## Key Properties 

### view: `IGroup` 

The view container of the edit tool.

### editConfig: `IEditorConfig` 

Temporary independent editor configuration for the edit tool (overrides the main editor config). It is only valid while the edit tool is open and will be restored after closing.

### eventIds?: `IEventListenerId`[] 

Optional list of event listener IDs. Supports automatic cleanup. Events registered via on\_() return an event ID and can bind `this`.

## Readonly Properties 

### tag: `string` 

Unique tag name of the edit tool.

### editor: `Editor` 

The editor instance. Available only after the tool is loaded.

### editBox: `EditBox` 

The edit box instance. Available only after the tool is loaded.

### editTarget: `UI` 

Current element being edited. Automatically set before `onLoad()` is called, and automatically reset to `null` after `onUnload()`.

## Key Methods 

### Element operations 

### onMove(event: `EditorMoveEvent`) 

Execute element move.

### onScale(event: `EditorScaleEvent`) 

Execute element scaling (resize).

### onRotate(event: `EditorRotateEvent`) 

Execute element rotation.

### onSkew(event: `EditorSkewEvent`) 

Execute element skewing.

### Lifecycle 

### onCreate() 

Called when the tool is created.

Automatically invoked when the edit tool instance is created.

### onLoad() 

Called when the tool is loaded.

Triggered when the user selects an element and the edit tool is switched in.

### onUpdate() 

Called when the tool updates.

Triggered when the user interacts with the view or elements.

### onUnload() 

Called when the tool is unloaded.

Triggered when switching to another edit tool.

### onDestroy() 

Called when the tool is destroyed.

## Static Methods 

### registerEditTool ( aliasName?: `string`, changeTag?: `boolean` ) 

Registers an alternative alias for an edit tool.

The `changeTag` parameter specifies whether to also update the edit tool's tag name. Defaults to `false`.

## Customization 

### Custom Edit Tool 

## Inheritance 

### InnerEditor 
