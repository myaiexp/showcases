// postprocessing example: the order of effects inside one EffectPass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Effect order in a pass',
  summary:
    'An EffectPass applies its effects in the order they are passed, after sorting by attributes (convolution first, then depth); plain colour effects keep their order. A hue shift followed by sepia ends up plain sepia, while sepia followed by the same hue shift turns the whole image blue-green.',
  section: 'Usage',
  tags: ['EffectPass', 'HueSaturationEffect', 'SepiaEffect', 'EffectAttribute'],
  docs: ['repo/README.md', 
    'repo/src/passes/EffectPass.js',
    'repo/src/enums/EffectAttribute.js',
    'repo/src/effects/HueSaturationEffect.js',
    'repo/src/effects/SepiaEffect.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
