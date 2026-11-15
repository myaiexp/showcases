// postprocessing example: ToneMappingEffect averageLuminance for REINHARD2
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tone mapping: average luminance',
  summary:
    'REINHARD2 divides each pixel by an assumed average scene luminance: a low averageLuminance brightens the picture (as if the scene were dim), a high one darkens it. Despite the constructor JSDoc naming plain Reinhard, only REINHARD2 reads the value; switch to REINHARD and the slider stops mattering.',
  section: 'Tone Mapping',
  tags: ['ToneMappingEffect', 'averageLuminance', 'ToneMappingMode.REINHARD2', 'ToneMappingMode.REINHARD'],
  docs: ['repo/README.md', 'repo/src/effects/ToneMappingEffect.js', 'repo/src/effects/glsl/tone-mapping.frag', 'repo/src/enums/ToneMappingMode.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
