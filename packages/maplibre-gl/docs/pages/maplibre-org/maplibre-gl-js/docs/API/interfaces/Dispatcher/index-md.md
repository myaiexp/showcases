<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/interfaces/Dispatcher/index.md -->

# Dispatcher
Defined in: [util/dispatcher.ts:11]()
Responsible for sending messages from a [Source]() to an associated worker source (usually with the same name).
## Extends
- [`Evented`]()\<[`ErrorEventType`]()\>
## Methods
### broadcast()
> \*\*broadcast\*\*\<`T` \*extends\* [`MessageType`]()\>(`type`: `T`, `data`: [`RequestResponseMessageMap`]()\[`T`\]\[`0`\]): `Promise`\<[`RequestResponseMessageMap`]()\[`T`\]\[`1`\]\[\]\>
Defined in: [util/dispatcher.ts:44]()
Broadcast a message to all Workers.
#### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* [`MessageType`]() |
#### Parameters
| Parameter | Type |
| --- | --- |
| `type` | `T` |
| `data` | [`RequestResponseMessageMap`]()\[`T`\]\[`0`\] |
#### Returns
`Promise`\<[`RequestResponseMessageMap`]()\[`T`\]\[`1`\]\[\]\>
---
### fire()
#### Call Signature
> \*\*fire\*\*(`event`: [`ErrorEvent`]()): `this`
Defined in: [util/evented.ts:156]()
Calls every listener registered for the event's type.
##### Parameters
| Parameter | Type |
| --- | --- |
| `event` | [`ErrorEvent`]() |
##### Returns
`this`
##### Inherited from
[`Evented`]().[`fire`]()
#### Call Signature
> \*\*fire\*\*(`type`: `"error"`, `properties?`: `object`): `this`
Defined in: [util/evented.ts:162]()
Compatibility with the (type: string, properties: Object) signature from previous versions. See https://github.com/mapbox/mapbox-gl-js/issues/6522, https://github.com/mapbox/mapbox-gl-draw/issues/766
##### Parameters
| Parameter | Type |
| --- | --- |
| `type` | `"error"` |
| `properties?` | `object` |
##### Returns
`this`
##### Inherited from
[`Evented`]().[`fire`]()
---
### getActor()
> \*\*getActor\*\*(): `Promise`\<[`Actor`]()\>
Defined in: [util/dispatcher.ts:53]()
Acquires an actor to dispatch messages to. The actors are distributed in round-robin fashion.
#### Returns
`Promise`\<[`Actor`]()\>
An actor object backed by a web worker for processing messages.
---
### listens()
> \*\*listens\*\*(`type`: `"error"`): `boolean`
Defined in: [util/evented.ts:206]()
Returns a true if this instance of Evented or any forwardeed instances of Evented have a listener for the specified type.
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `"error"` | The event type |
#### Returns
`boolean`
`true` if there is at least one registered listener for specified event type, `false` otherwise
#### Inherited from
[`Evented`]().[`listens`]()
---
### off()
> \*\*off\*\*\<`T` \*extends\* `"error"`\>(`type`: `T`, `listener`: (`event`: [`ErrorEventType`]()\[`T`\]) =\> `void`): `this`
Defined in: [util/evented.ts:117]()
Removes a previously registered event listener.
#### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* `"error"` |
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to remove listeners for. |
| `listener` | (`event`: [`ErrorEventType`]()\[`T`\]) =\> `void` | The listener function to remove. |
#### Returns
`this`
#### Inherited from
[`Evented`]().[`off`]()
---
### on()
> \*\*on\*\*\<`T` \*extends\* `"error"`\>(`type`: `T`, `listener`: (`event`: [`ErrorEventType`]()\[`T`\]) =\> `void`): [`Subscription`]()
Defined in: [util/evented.ts:100]()
Adds a listener to a specified event type.
#### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* `"error"` |
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to add a listen for. |
| `listener` | (`event`: [`ErrorEventType`]()\[`T`\]) =\> `void` | The function to be called when the event is fired. The listener function is called with the data object passed to `fire`, extended with `target` and `type` properties. |
#### Returns
[`Subscription`]()
#### Inherited from
[`Evented`]().[`on`]()
---
### once()
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* `"error"`\>(`type`: `T`): `Promise`\<[`ErrorEventType`]()\[`T`\]\>
Defined in: [util/evented.ts:132]()
Adds a listener that will be called only once to a specified event type.
The listener will be called first time the event fires after the listener is registered.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* `"error"` |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |
##### Returns
`Promise`\<[`ErrorEventType`]()\[`T`\]\>
a promise that resolves with the event
##### Inherited from
[`Evented`]().[`once`]()
#### Call Signature
> \*\*once\*\*\<`T` \*extends\* `"error"`\>(`type`: `T`, `listener`: (`event`: [`ErrorEventType`]()\[`T`\]) =\> `void`): `this`
Defined in: [util/evented.ts:142]()
Adds a listener that will be called only once to a specified event type.
The listener will be called first time the event fires after the listener is registered.
##### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* `"error"` |
##### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `type` | `T` | The event type to listen for. |
| `listener` | (`event`: [`ErrorEventType`]()\[`T`\]) =\> `void` | The function to be called when the event is fired the first time. |
##### Returns
`this`
`this` when a listener is provided
##### Inherited from
[`Evented`]().[`once`]()
---
### setEventedParent()
> \*\*setEventedParent\*\*(`parent?`: [`Evented`]()\<[`EventTypeMap`]()\>, `data?`: [`EventedParentData`]() | (() =\> [`EventedParentData`]())): `this`
Defined in: [util/evented.ts:217]()
Bubble all events fired by this instance of Evented to this parent instance of Evented.
#### Parameters
| Parameter | Type |
| --- | --- |
| `parent?` | [`Evented`]()\<[`EventTypeMap`]()\> |
| `data?` | [`EventedParentData`]() \| (() =\> [`EventedParentData`]()) |
#### Returns
`this`
#### Inherited from
[`Evented`]().[`setEventedParent`]()
