<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/RequestParameters/ -->

# RequestParameters

> **RequestParameters** = `object`

Defined in: util/ajax.ts:32

A `RequestParameters` object to be returned from Map.options.transformRequest callbacks.

## Example

```
// use transformRequest to modify requests that begin with `http://myHost`
transformRequest: function(url, resourceType) {
 if (resourceType === 'Source' && url.indexOf('http://myHost') > -1) {
   return {
     url: url.replace('http', 'https'),
     headers: { 'my-custom-header': true },
     credentials: 'include'  // Include cookies for cross-origin requests
   }
  }
}
```

## Properties

### body?

> `optional` **body?**: `string`

Defined in: util/ajax.ts:48

Request body.

---

### cache?

> `optional` **cache?**: `RequestCache`

Defined in: util/ajax.ts:64

Parameters supported only by browser fetch API. Property of the Request interface contains the cache mode of the request. It controls how the request will interact with the browser's HTTP cache. (https://developer.mozilla.org/en-US/docs/Web/API/Request/cache)

---

### collectResourceTiming?

> `optional` **collectResourceTiming?**: `boolean`

Defined in: util/ajax.ts:60

If `true`, Resource Timing API information will be collected for these transformed requests and returned in a resourceTiming property of relevant data events.

---

### credentials?

> `optional` **credentials?**: `"same-origin"` | `"include"`

Defined in: util/ajax.ts:56

`'same-origin'|'include'` Use 'include' to send cookies with cross-origin requests.

---

### headers?

> `optional` **headers?**: `any`

Defined in: util/ajax.ts:40

The headers to be sent with the request.

---

### method?

> `optional` **method?**: `"GET"` | `"POST"` | `"PUT"`

Defined in: util/ajax.ts:44

Request method `'GET' | 'POST' | 'PUT'`.

---

### referrerPolicy?

> `optional` **referrerPolicy?**: `ReferrerPolicy`

Defined in: util/ajax.ts:68

The referrer policy to use for the request. Controls how much referrer information is sent. (https://developer.mozilla.org/en-US/docs/Web/API/Request/referrerPolicy)

---

### type?

> `optional` **type?**: `"string"` | `"json"` | `"arrayBuffer"` | `"image"`

Defined in: util/ajax.ts:52

Response body type to be returned.

---

### url

> **url**: `string`

Defined in: util/ajax.ts:36

The URL to be requested.
