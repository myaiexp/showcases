// postprocessing example: tone mapping as the last effect, per the README
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tone mapping at the end',
  summary:
    'The README says to leave the renderer on NoToneMapping, use HalfFloat buffers and put a ToneMappingEffect at the end of the pipeline. A very strong point light pushes the scene far above 1: without the effect the lit side clips to white, with it (AGX, the default mode) the highlights roll off and keep their colour.',
  section: 'Usage',
  tags: ['ToneMappingEffect', 'NoToneMapping', 'HalfFloatType', 'BlendFunction.SRC', 'BlendFunction.DST', 'blendMode'],
  docs: ['repo/README.md', 'repo/src/effects/ToneMappingEffect.js', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
