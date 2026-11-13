<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/Evented/ -->

# Evented<EventType *extends* `EventTypeMap` = `EventTypeMap`>

Defined in: util/evented.ts:86

Methods mixed in to other classes for event capabilities.

## Extended by

## Type Parameters

| Type Parameter | Default type |
| --- | --- |
| `EventType` *extends* `EventTypeMap` | `EventTypeMap` |

## Methods

### fire()

#### Call Signature

> **fire**(`event`: `EventType`[`Extract`<keyof `EventType`, `string`>]): `this`

Defined in: util/evented.ts:156

Calls every listener registered for the event's type.

##### Parameters

| Parameter | Type |
| --- | --- |
| `event` | `EventType`[`Extract`<keyof `EventType`, `string`>] |

##### Returns

`this`

#### Call Signature

> **fire**(`type`: `Extract`<keyof `EventType`>, `properties?`: `object`): `this`

Defined in: util/evented.ts:162

Compatibility with the (type: string, properties: Object) signature from previous versions.
See https://github.com/mapbox/mapbox-gl-js/issues/6522,
https://github.com/mapbox/mapbox-gl-draw/issues/766

##### Parameters

| Parameter | Type |
| --- | --- |
| `type` | `Extract`<keyof `EventType`> |
| `properties?` | `object` |

##### Returns

`this`

---

### listens()

> **listens**(`type`: `Extract`<keyof `EventType`>): `boolean`

Defined in: util/evented.ts:206

Returns a true if this instance of Evented or any forwardeed instances of Evented have a listener for the specified type.

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `Extract`<keyof `EventType`> | The event type |

#### Returns

`boolean`

`true` if there is at least one registered listener for specified event type, `false` otherwise

---

### off()

> **off**<`T` *extends* `string`>(`type`: `T`, `listener`: (`event`: `EventType`[`T`]) => `void`): `this`

Defined in: util/evented.ts:117

Removes a previously registered event listener.

#### Type Parameters

| Type Parameter |
| --- |
| `T` *extends* `string` |

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to remove listeners for. |
| `listener` | (`event`: `EventType`[`T`]) => `void` | The listener function to remove. |

#### Returns

`this`

---

### on()

> **on**<`T` *extends* `string`>(`type`: `T`, `listener`: (`event`: `EventType`[`T`]) => `void`): `Subscription`

Defined in: util/evented.ts:100

Adds a listener to a specified event type.

#### Type Parameters

| Type Parameter |
| --- |
| `T` *extends* `string` |

#### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to add a listen for. |
| `listener` | (`event`: `EventType`[`T`]) => `void` | The function to be called when the event is fired. The listener function is called with the data object passed to `fire`, extended with `target` and `type` properties. |

#### Returns

`Subscription`

---

### once()

#### Call Signature

> **once**<`T` *extends* `string`>(`type`: `T`): `Promise`<`EventType`[`T`]>

Defined in: util/evented.ts:132

Adds a listener that will be called only once to a specified event type.

The listener will be called first time the event fires after the listener is registered.

##### Type Parameters

| Type Parameter |
| --- |
| `T` *extends* `string` |

##### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |

##### Returns

`Promise`<`EventType`[`T`]>

a promise that resolves with the event

#### Call Signature

> **once**<`T` *extends* `string`>(`type`: `T`, `listener`: (`event`: `EventType`[`T`]) => `void`): `this`

Defined in: util/evented.ts:142

Adds a listener that will be called only once to a specified event type.

The listener will be called first time the event fires after the listener is registered.

##### Type Parameters

| Type Parameter |
| --- |
| `T` *extends* `string` |

##### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |
| `listener` | (`event`: `EventType`[`T`]) => `void` | The function to be called when the event is fired the first time. |

##### Returns

`this`

`this` when a listener is provided

---

### setEventedParent()

> **setEventedParent**(`parent?`: `Evented`<`EventTypeMap`>, `data?`: `EventedParentData` | (() => `EventedParentData`)): `this`

Defined in: util/evented.ts:217

Bubble all events fired by this instance of Evented to this parent instance of Evented.

#### Parameters

| Parameter | Type |
| --- | --- |
| `parent?` | `Evented`<`EventTypeMap`> |
| `data?` | `EventedParentData` | (() => `EventedParentData`) |

#### Returns

`this`
