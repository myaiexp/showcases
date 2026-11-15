// postprocessing example: every ToneMappingMode on one over-bright scene
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tone mapping: modes',
  summary:
    'ToneMappingEffect.mode switches the operator that squeezes HDR light into the display range. The scene has a strong point light and very bright lamps: LINEAR clips them to flat white, REINHARD, REINHARD2, UNCHARTED2, CINEON, ACES_FILMIC, AGX and NEUTRAL each roll the highlights off differently, and REINHARD2_ADAPTIVE judges brightness from the frame itself.',
  section: 'Tone Mapping',
  tags: ['ToneMappingEffect', 'ToneMappingMode', 'mode', 'HalfFloatType'],
  docs: ['repo/README.md', 'repo/src/effects/ToneMappingEffect.js', 'repo/src/enums/ToneMappingMode.js', 'repo/src/effects/glsl/tone-mapping.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
