<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/interfaces/Actor/index.md -->

# Actor
Defined in: [util/actor.ts:59]()
An implementation of the [Actor design pattern]() that maintains the relationship between asynchronous tasks and the objects that spin them off - in this case, tasks like parsing parts of styles, owned by the styles
## Implements
- [`IActor`]()
## Methods
### sendAsync()
> \*\*sendAsync\*\*\<`T` \*extends\* [`MessageType`]()\>(`message`: [`ActorMessage`]()\<`T`\>, `abortController?`: `AbortController`): `Promise`\<[`RequestResponseMessageMap`]()\[`T`\]\[`1`\]\>
Defined in: [util/actor.ts:104]()
Sends a message from a main-thread map to a Worker or from a Worker back to a main-thread map instance.
#### Type Parameters
| Type Parameter |
| --- |
| `T` \*extends\* [`MessageType`]() |
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `message` | [`ActorMessage`]()\<`T`\> | the message to send |
| `abortController?` | `AbortController` | an optional AbortController to abort the request |
#### Returns
`Promise`\<[`RequestResponseMessageMap`]()\[`T`\]\[`1`\]\>
a promise that will be resolved with the response data
#### Implementation of
`IActor.sendAsync`
