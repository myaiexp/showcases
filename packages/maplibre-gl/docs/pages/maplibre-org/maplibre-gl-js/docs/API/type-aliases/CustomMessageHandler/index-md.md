<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/CustomMessageHandler/index.md -->

# CustomMessageHandler\
> \*\*CustomMessageHandler\*\*\<`TData`, `TResult`\> = (`mapId`: `string` | `number`, `params`: `TData`, `abortController?`: `AbortController`) =\> `Promise`\<`TResult`\>
Defined in: [util/global\\_dispatcher.ts:36]()
A handler for a message that is not one of the built-in [MessageType]()s, e.g. a message that is sent by a plugin.
## Type Parameters
| Type Parameter |
| --- |
| `TData` |
| `TResult` |
## Parameters
| Parameter | Type |
| --- | --- |
| `mapId` | `string` \| `number` |
| `params` | `TData` |
| `abortController?` | `AbortController` |
## Returns
`Promise`\<`TResult`\>
