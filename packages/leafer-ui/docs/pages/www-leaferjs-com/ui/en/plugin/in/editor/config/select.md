<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/config/select.html -->

# Editor Configuration 

### Basic     Events     Styles     Button Groups     Cursor     Selection     Control     Enable     Internal Editor 

## 

Selection mode configuration. It is only effective when set during initialization or modified at runtime via app.editor.config.

At the same time, elements have an independent editor configuration property, which can override the main configuration in real time.

## Key Properties 

### editBox: `boolean` 

Whether to enable the edit box feature (used for editing elements). Enabled by default.

When disabled, the edit box will be hidden.

### editBoxType: `'box'` | `'stroke'` 

Which bounding box of the element to use as the edit box, default is 'box'.

'stroke' means using the stroke bounding box of the element as the editing frame.

### selector: `boolean` 

Whether to enable the selection selector. Enabled by default.

It allows selecting editable elements through interaction and supports displaying hover states.

### select: `'press'` | `'tap'` 

The trigger mode for selection. Default is press.

press means triggered on mouse down, tap means triggered on click.

### multipleSelect: `boolean` 

Whether to enable multi-selection. Enabled by default.

### boxSelect: `boolean` | `'hit'` | `'includes'` 

Whether box selection is enabled. Enabled by default.

Set to `'hit'` to select an element as long as the selection box intersects it. This is the default behavior.

Set to `'includes'` to select an element only when it is completely enclosed by the selection box.

### continuousSelect: `boolean` 

Whether a single click can continuously select multiple elements. Typically used for multi-selection on mobile devices. Disabled by default.

### skipNested: `boolean` 

Whether to skip nested child elements in the selection to avoid accidental selection. Defaults to `false`.

Enabling this option adds a small performance overhead for additional checks. The more nested elements are selected, the higher the checking cost.

### preventEditInner: `boolean` 

Whether to prevent opening the inner editor on double-click. Default is false.
