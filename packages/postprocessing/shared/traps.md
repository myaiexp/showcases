# postprocessing traps

Found while building the gallery against postprocessing 6.39.6 and three 0.187. Read before
building an example, and add to it.

## Setup and the composer

- The manual's Getting Started and Custom Effects pages describe v7 (RenderPipeline, GeometryPass,
  ClearPass-first pipelines, `mainImage(..., in GData data)`), none of which exists in 6.39.6. Build
  on the README (EffectComposer + RenderPass + EffectPass) and the JSDoc in src/. A v6 effect shader
  is `void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)`, with a
  `const in float depth` third parameter when the effect has EffectAttribute.DEPTH (see the shaders
  in src/effects/glsl/).
- `EffectComposer.setSize()` resizes the renderer, the composer's buffers and every pass. Calling
  only `renderer.setSize()` leaves the passes rendering at the old size; the stage resizes every
  composer passed to `own()`.
- `composer.dispose()` disposes every pass, and an EffectPass disposes its effects, but nothing
  frees textures an example made itself (lookup textures, noise, canvas textures): dispose those
  in the example's own cleanup or hand them to `stage.onDispose`.
- `addPass` gives `renderToScreen` to the last pass at the time it is added, and only then.
  Disabling the last pass (`enabled = false`) leaves every remaining pass rendering into a
  buffer and nothing reaches the canvas: set `renderToScreen` on the new last pass yourself.
- The composer configures its buffers from `renderer.outputColorSpace` when it receives the
  renderer (8-bit buffers become sRGB textures). Changing the colour space later needs a new composer.
- EffectPass sorts its effects by `attributes`, highest first (CONVOLUTION, then DEPTH, then
  none); effects with equal attributes keep the order they were passed in.
- Some JSDoc'd members are missing from the 6.39.6 typings: SepiaEffect `weightsR/G/B`, the
  GammaCorrectionEffect `gamma`, and ScanlineEffect's `scrollSpeed` constructor option. Reach
  them through `effect.uniforms.get(name).value`, or assign `scrollSpeed` after construction.
- `LookupTexture.scaleUp(size)` transfers the source LUT's buffer to its worker (a Blob URL,
  no fetch), emptying the source; pass `false` as the second argument to keep it.
- LUT3DEffect defaults to BlendFunction.SRC, which ignores `blendMode.opacity`; use NORMAL for
  a strength slider. `.cube` data and `createNeutral` run red fastest; `.3dl` runs blue fastest.
- A RenderPass that is the last pass draws straight to the canvas, so composer `multisampling`
  does nothing; put a CopyPass (or any EffectPass) after it.
- To swap the last pass, `removePass` then `addPass`: that keeps `renderToScreen` on the last one.
- MipmapBlurPass has `needsSwap = false` and writes only its `.texture`; show it with a
  TextureEffect in a later EffectPass.
- SelectiveBloomEffect needs `luminanceThreshold: 0` for the Selection alone to decide what glows.
- JSDoc types that are wrong: SMAAWeightsMaterial `cornerDetection` is a boolean, and
  LuminanceMaterial `luminanceRange` takes a Vector2 or null (a range replaces the threshold).
  The typings omit BoxBlurPass/GaussianBlurPass `blurMaterial` and `iterations`, and the
  TiltShiftBlurPass class (exported at runtime): `shared/blur.ts` declares them.
- The README's renderer attributes (`depth: false`, `stencil: false`) are what the stage uses.
  Examples that need the stencil buffer (MaskPass) pass `renderer: { stencil: true }` and give the
  composer `stencilBuffer: true`.

## Docs claims that are wrong for 6.39.6

- RealisticBokehEffect `focus` is linear depth in [0, 1] (a fraction of near-to-far), not world
  units as the JSDoc says; with the shader's millimetre maths `fStop` needs roughly 10 to 100 to
  leave a visible sharp zone. BokehEffect `focus` and `dof` are fractions of near-to-far too, and
  have no accessors: set them through `effect.uniforms.get(name).value`.
- DepthOfFieldEffect has no `focusDistance` / `focusRange` properties: they live on
  `effect.cocMaterial`, in world units, although the material's JSDoc says "Range [0, 1]".
- ToneMappingEffect `averageLuminance` is documented for plain REINHARD, but only REINHARD2 reads it.
- GlitchEffect `ratio` works inverted and only in SPORADIC mode; CONSTANT modes ignore it. The
  glitch shader reads only the red and green channels of `perturbationMap`, so a NoiseTexture
  in RedFormat has no green: use RGBAFormat.
- OutlineEffect's pattern fills the selected objects' interior. The default `hiddenEdgeColor`
  (0x22090a) is nearly invisible: pick a bright one for X-ray.
- DepthEffect output depends on the camera's `near` and `far`; perspective depth stays near
  white unless `near` is raised.
- SSAO proximity is a depth difference: a sample counts only when its depth is within the
  threshold of the pixel's own. The distance threshold also scales the sampling radius.

## Typings that disagree with the JSDoc or runtime

- ChromaticAberrationEffect and LensDistortionEffect constructors require every option in the typings.
- GlitchEffect `chromaticAberrationOffset` is typed non-null: unlink with a throwaway `new Vector2()`.
- ToneMappingEffect `whitePoint`, `middleGrey`, `averageLuminance` are typed read-only: write
  `effect.uniforms.get(name)!.value` (`shared/tone.ts` `setTone()`).
- OutlineEffect `patternTexture` is typed `Texture`; null needs a cast.
- RealisticBokehEffect `rings`/`samples` are typed boolean in the options: assign them as properties.
- SSAOEffect's `luminanceInfluence` setter is typed boolean (use its uniform) and `color` is typed
  non-null Color, though `null` is how the tint switches off.
- KawaseBlurMaterial `kernelSize` is missing; for god rays use the deprecated but typed
  `effect.kernelSize`.

## Recompiles and timing

- SSAO `radius`, `samples`, `rings` and RealisticBokehEffect `rings`, `samples`, `pentagon` are
  shader defines: each change recompiles, so cards step through values instead of sweeping them.
- GodRaysEffect reads its light source's depth from the composer's depth texture (the sun hides
  behind occluders because of the RenderPass's depth) and re-parents the light mesh each frame.
- DepthPickingPass resolves its promise inside `composer.render()`: unproject in the continuation,
  before the next frame moves the camera, and ignore depth above 0.9999 (background).
- RealisticBokehEffect and GammaCorrectionEffect (both deprecated) do not compile on three 0.187:
  their shaders call `linearToRelativeLuminance()` and `LinearToGamma()`, which three dropped.
  `shared/legacy-glsl.ts` subclasses prepend the helpers through `setFragmentShader`.
- An effect with `mainUv` (GlitchEffect, ShockWaveEffect, LensDistortion…) and a convolution
  effect (ChromaticAberration, SMAA, FXAA…) cannot share an EffectPass: the pass throws
  "Effects that transform UVs are incompatible with convolution effects". Use two passes.

## Passes, masks and blending

- A ClearMaskPass or MaskPass never renders to the canvas, and a CopyPass that is not last writes
  only its own target: end such chains with a CopyPass. A second MaskPass needs a ClearMaskPass
  between it and the first, since a MaskPass ignores state changes while the stencil is locked.
- MaskMaterial's shader has no colour-space conversion; drawn straight to the canvas it comes out
  dark. Your own ShaderMaterials in a ShaderPass end with `#include <colorspace_fragment>`.
- A Selection limits the RenderPass through the camera's layer mask, so lights outside it vanish:
  add the lights to the Selection. `ignoreBackground` or a ClearPass `overrideClearColor` also
  hides `scene.background`.
- `renderer.info.render` resets on every `renderer.render()`; read inside a LambdaPass it
  describes only the preceding pass. Set `info.autoReset = false` to count a whole frame.
- Typings: BlendFunction is typed as a plain numeric enum, but at runtime SKIP and DST are both
  9 and SET and SRC both 30 (compare with `Number()`); there is no GLOW. `SavePass` and
  `DepthSavePass` are type-only aliases (`new` fails the type-check: use CopyPass / DepthCopyPass).
  `ShaderPass.input` is missing (only the deprecated `setInput()`), and RenderPass
  `overrideMaterial` / `selection` reject null, which is how they clear: cast it.

## Custom effects (v6, read from EffectPass.js and effect.frag)

- EffectPass finds `mainImage` / `mainUv` with a plain regex over the whole shader, comments
  included: a comment mentioning `mainUv` makes a convolution effect throw. It also renames every
  uniform, function, varying and macro of each effect (`e0Strength`) by word-boundary regex.
- Incompatible merges throw from `recompile()` (which `addPass` calls), not a warning: two
  CONVOLUTION effects, or `mainUv` with convolution.
- Deleting a key from `effect.defines` never removes the macro (EffectMaterial only adds):
  switch by value (`#if MODE == 1`).
- Built-ins in 6.39.6: `resolution` and `texelSize` are vec2, and there are `cameraNear`,
  `cameraFar`, `aspect` and `time` (no `cameraParams`). `readDepth(uv)` and `getViewZ(depth)`
  exist. `PERSPECTIVE_CAMERA` comes from the camera given to the EffectPass constructor.
- An effect's `mainScene` / `mainCamera` setters run only from `composer.setMainScene()` /
  `setMainCamera()`, never from `addPass`. `inputColorSpace` is a protected setter.
- `WebGLExtension` is a WebGL 1 mechanism; derivatives are core in WebGL 2.

## Utilities

- `Timer.useFixedDelta` is broken in 6.39.6: `update()` stores `fixedDelta` (seconds) in the
  millisecond field, so `getDelta()` comes out 1000 times too small.
- Typings omit `EffectPass.timeScale` and GaussKernel's `weights`, `offsets`, `linearWeights`,
  `linearOffsets`, `steps`, `linearSteps` (`shared/kernel.ts` types them); `RawImageData.from()`
  takes an element, not the Image constructor its typing names.
- Setting `Resolution.scale` resets both preferred sizes to AUTO_SIZE; listen to its 'change' event.
- A Selection's default layer comes from a page-wide counter that wraps (with a console.warn)
  after about 30 selections, and OutlineEffect and SelectiveBloomEffect each take one: pass the
  layer explicitly. `exclusive` only affects objects added after it is set.
- `orthographicDepthToViewZ` and `viewZToOrthographicDepth` are declared in the typings but
  `@ignore` and never exported by the package entry: a named import fails at run time.
- MaskPass loses everything outside the mask in 6.39.6: after a masked pass the composer copies
  the unmasked pixels with its internal CopyPass, but `CopyPass.render` draws into the CopyPass's
  own render target, never the output buffer. Add `keepUnmasked()` (`shared/stencil.ts`, a
  non-swapping CopyMaterial ShaderPass) right before each MaskPass.
