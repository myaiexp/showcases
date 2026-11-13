<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/classes/AJAXError/index.md -->

# AJAXError
Defined in: [util/ajax.ts:91]()
An error thrown when a HTTP request results in an error response.
## Extends
- `Error`
## Constructors
### Constructor
> \*\*new AJAXError\*\*(`status`: `number`, `statusText`: `string`, `url`: `string`, `body`: `Blob`): `AJAXError`
Defined in: [util/ajax.ts:118]()
#### Parameters
| Parameter | Type | Description |
| --- | --- | --- |
| `status` | `number` | The response's HTTP status code. |
| `statusText` | `string` | The response's HTTP status text. |
| `url` | `string` | The request's URL. |
| `body` | `Blob` | The response's body. |
#### Returns
`AJAXError`
#### Overrides
`Error.constructor`
## Properties
### body
> \*\*body\*\*: `Blob`
Defined in: [util/ajax.ts:110]()
The response's body.
---
### status
> \*\*status\*\*: `number`
Defined in: [util/ajax.ts:95]()
The response's HTTP status code.
---
### statusText
> \*\*statusText\*\*: `string`
Defined in: [util/ajax.ts:100]()
The response's HTTP status text.
---
### url
> \*\*url\*\*: `string`
Defined in: [util/ajax.ts:105]()
The request's URL.
