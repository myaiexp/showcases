// playcanvas example: Engine colour chunks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Engine chunks: gammaPS, tonemappingPS and fogPS',
  summary:
    'A fragment shader that includes gammaPS, tonemappingPS and fogPS and calls addFog, toneMap and gammaCorrectOutput follows the camera and scene settings, like the built-in materials. A column of such spheres sits next to a column writing the same linear colour raw; the full view changes tone mapping, gamma and fog.',
  section: 'Graphics: Shaders',
  tags: ['gammaPS', 'tonemappingPS', 'fogPS', 'addFog', 'toneMap', 'gammaCorrectOutput', 'gammaCorrectInput', 'FOG_LINEAR'],
  docs: ['repo/docs/user-manual/graphics/shaders/index.md', 'repo/docs/user-manual/graphics/shaders/preprocessor.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
