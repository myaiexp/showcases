<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/StyleImageWebGLTarget/ -->

# StyleImageWebGLTarget

> **StyleImageWebGLTarget** = `object`

Defined in: style/style\_image.ts:97

Where a StyleImageWebGLData.renderWithWebGL callback writes its pixels.

## Properties

### texture

> **texture**: `WebGLTexture`

Defined in: style/style\_image.ts:103

The icon atlas to write into. MapLibre does not bind it for you, so start with
`gl.bindTexture(gl.TEXTURE_2D, texture)` or attach it to your own framebuffer.
