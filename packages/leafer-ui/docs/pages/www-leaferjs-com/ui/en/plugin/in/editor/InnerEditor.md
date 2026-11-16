<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/InnerEditor.html -->

# InnerEditor 

Internal editor.

It is generally used to edit internal details such as text and paths, and is opened via double-clicking elements. See custom inner editor.

## Key Properties 

### editTarget: `UI` 

The target element currently being edited.

### view: `IGroup` 

The view container of the inner editor.

### editConfig: `IEditorConfig` 

Temporary independent configuration for the inner editor (overrides the main editor config). It is only valid while the inner editor is open and will be restored after closing.

### eventIds?: `IEventListenerId[]` 

List of event listener IDs (optional), supports automatic cleanup. Listeners registered via on\_() can return an event ID and bind `this`.

## Read-only Properties 

### tag: `string` 

The unique tag name of the inner editor.

### editor: `Editor` 

The main editor instance.

### editBox: `EditBox` 

The edit box instance.

## Key Methods 

### Coordinate Conversion 

### getEditBoxPoint( editTargetPoint: `IPointData`, change?: `boolean` ): `IPointData` 

Returns the corresponding point in the edit box by converting a point from the current edit target's inner coordinate system. The `change` parameter specifies whether to modify the input point directly.

### getEditTargetPoint( editBoxPoint: `IPointData`, change?: `boolean` ): `IPointData` 

Returns the corresponding point in the current edit target's inner coordinate system by converting a point from the edit box coordinate system. The `change` parameter specifies whether to modify the input point directly.

### Lifecycle 

### onCreate() 

Called during creation.

This method is automatically invoked when the inner editor is instantiated.

### onLoad() 

Called when loaded.

When the user selects an element, the editor switches tools and this method is automatically called to load the inner editor.

### onUpdate() 

Called when updating.

This method is automatically invoked when the user interacts with the view or elements.

### onUnload() 

Called when unloading.

This method is automatically invoked when switching to another editor tool.

### onDestroy() 

Called when destroyed.

## Customization 

### Custom Inner Editor 
