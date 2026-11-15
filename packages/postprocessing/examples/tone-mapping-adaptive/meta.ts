// postprocessing example: adaptive Reinhard tone mapping that reacts to scene brightness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tone mapping: adaptive luminance',
  summary:
    'REINHARD2_ADAPTIVE measures the frame\'s average luminance every frame and eases toward it, like an eye adjusting. Turn the lights off and the picture is first nearly black, then the exposure rises; turn them on and it flashes bright, then settles. adaptationRate sets the speed, minLuminance caps how far a dark scene is boosted, and resolution is the size of the luminance texture.',
  section: 'Tone Mapping',
  tags: ['ToneMappingEffect', 'ToneMappingMode.REINHARD2_ADAPTIVE', 'adaptationRate', 'minLuminance', 'resolution', 'AdaptiveLuminanceMaterial', 'adaptiveLuminanceMaterial'],
  docs: ['repo/README.md', 
    'repo/src/effects/ToneMappingEffect.js',
    'repo/src/passes/AdaptiveLuminancePass.js',
    'repo/src/materials/AdaptiveLuminanceMaterial.js',
    'repo/src/passes/LuminancePass.js',
    'repo/src/enums/ToneMappingMode.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
