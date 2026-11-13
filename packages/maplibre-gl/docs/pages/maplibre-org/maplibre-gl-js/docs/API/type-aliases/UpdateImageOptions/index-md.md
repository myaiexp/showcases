<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/UpdateImageOptions/index.md -->

# UpdateImageOptions
> \*\*UpdateImageOptions\*\* = `object` & ({ `url`: `string`; } | { `image`: [`ImageSourceImage`](); })
Defined in: [source/image\\_source.ts:98]()
The options object for the [ImageSource.updateImage]() method.
Provide exactly one of `url` (to load an image over the network) or `image` (an already-decoded image to display directly, without a network request).
## Type Declaration
### coordinates?
> `optional` \*\*coordinates?\*\*: [`Coordinates`]()
The image coordinates
