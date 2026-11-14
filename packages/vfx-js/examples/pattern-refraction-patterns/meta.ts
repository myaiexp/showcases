// VFX-JS example: PatternRefractionEffect patterns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PatternRefractionEffect patterns',
  summary:
    'The same glass in three shapes: lenticular strips, waves and concentric circles. edgeWrap sets what is sampled where the refraction reaches past the picture (zero, clamp, repeat, mirror), and centerX and centerY move the middle of the pattern.',
  section: '@vfx-js/effects',
  tags: ['PatternRefractionEffect', 'pattern', 'lenticular', 'waves', 'circular', 'edgeWrap', 'centerX', 'centerY'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/pattern-refraction.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
