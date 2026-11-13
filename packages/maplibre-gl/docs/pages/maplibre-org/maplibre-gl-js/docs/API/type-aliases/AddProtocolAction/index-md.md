<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/AddProtocolAction/index.md -->

# AddProtocolAction
> \*\*AddProtocolAction\*\* = (`requestParameters`: [`RequestParameters`](), `abortController`: `AbortController`) =\> `Promise`\<[`GetResourceResponse`]()\<[`AddProtocolResponseData`]()\>\>
Defined in: [util/config.ts:20]()
This method type is used to register a protocol handler. Use the abort controller for aborting requests. Return a promise with the relevant resource response, see [AddProtocolResponseData]() for what `data` may hold.
## Parameters
| Parameter | Type |
| --- | --- |
| `requestParameters` | [`RequestParameters`]() |
| `abortController` | `AbortController` |
## Returns
`Promise`\<[`GetResourceResponse`]()\<[`AddProtocolResponseData`]()\>\>
