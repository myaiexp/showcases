<!-- source: https://www.leaferjs.com/ui/en/reference/event/ui/Key.html -->

# KeyEvent 

Keyboard event.

Keyboard events can only be listened to on the Leafer engine.

Inheritance

KeyEvent  >  UIEvent  >  Event

## Event Names 

### KeyEvent.DOWN 

Key down event. Triggered continuously when holding the key.

`key.down`

### KeyEvent.HOLD new 

Key hold event. Triggered only once during a long press.

`key.hold`

### KeyEvent.UP 

Key up event.

`key.up`

## Key Properties 

### key: `string` 

Value of the physical key.

### code: `string` 

Physical key code, can distinguish between keys like `ShiftLeft` and `ShiftRight`.

## Key Methods 

### Keyboard.isHoldSpaceKey(): `boolean` 

Whether the Space key is being held down.

### Keyboard.isHold(code: `string`): `boolean` 

Whether a specific physical key is being held down.

## Inherited Events 

### KeyEvent  >  UIEvent  >  Event 
