<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/EditPoint.html -->

# EditPoint 

Control point inside the edit box.

Inheritance

EditPoint  >  Box  >  UI

## Key Properties 

### direction: `Direction9` 

ts

```
enum Direction9 {
  topLeft,
  top,
  topRight,
  right,
  bottomRight,
  bottom,
  bottomLeft,
  left,
  center,
}
```

### pointType: `IEditPointType` 

ts

```
type IEditPointType =
  | 'move' // move button
  | 'rotate' // rotate button
  | 'resize' // resize button
  | 'resize-rotate' // resize + rotate button
  | 'button' // custom button
```

## Inherited 

### EditPoint  >  Box  >  UI 
