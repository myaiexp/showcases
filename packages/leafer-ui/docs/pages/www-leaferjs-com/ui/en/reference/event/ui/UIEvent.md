<!-- source: https://www.leaferjs.com/ui/en/reference/event/ui/UIEvent.html -->

# UIEvent 

Base class for all interaction events.

Inheritance

UIEvent  >  Event

## Key Properties 

### x: `number` 

X position in the world coordinate system.

### y: `number` 

Y position in the world coordinate system.

### path: `ILeafList` 

List of objects the event has passed through.

### throughPath?: `ILeafList` 

List of objects the event penetrates through, unaffected by layer hierarchy. Any collided object from top to bottom is included.

This property exists only when engine configuration enables through-path and a click event occurs.

It can also be obtained manually via the pick() method.

### altKey: `boolean` 

Whether the Alt key is pressed.

### ctrlKey: `boolean` 

Whether the Ctrl key is pressed.

### shiftKey: `boolean` 

Whether the Shift key is pressed.

### spaceKey: `boolean` 

Whether the Space key is pressed.

### buttons: `number` 

Indicates which mouse buttons are pressed when the event is triggered. If multiple buttons are pressed, the value is their sum:

* 0: No button or not initialized
* 1: Left mouse button
* 2: Right mouse button
* 4: Middle mouse button (wheel)
* 8: Fourth button (typically “browser back”)
* 16: Fifth button (typically “browser forward”)

### left: `boolean` 

Whether the left mouse button is pressed.

### middle: `boolean` 

Whether the middle mouse button (wheel) is pressed.

### right: `boolean` 

Whether the right mouse button is pressed.

### origin: `object` 

Native event object.

## Coordinate Conversion Methods 

Conversion methods for `x`, `y`.

### getPagePoint ( ): `IPointData` 

Get position in page coordinate system.

### getBoxPoint ( relative?: `UI`): `IPointData` 

Get position relative to the box coordinate system of a given element. Defaults to the current listener if `relative` is not provided.

### getInnerPoint ( relative?: `UI`): `IPointData` 

Get position relative to the inner coordinate system of a given element. Defaults to the current listener if `relative` is not provided.

### getLocalPoint ( relative?: `UI`): `IPointData` 

Get position relative to the local coordinate system of a given element. Defaults to the current listener if `relative` is not provided.

## Inherited Events 

### UIEvent  >  Event 
