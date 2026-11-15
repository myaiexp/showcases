// penrose example: pElasticEnergy and the power p
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'pElasticEnergy and the power p',
  summary:
    '`pElasticEnergy` integrates curvature raised to `p`. With `p = 1` only the total turning counts, so corners cost the same as gentle bends and kinks survive; `p = 2` is the elastic energy, and `p = 4` punishes sharp bends so heavily that the bending spreads out smoothly.',
  section: 'Computation: Curve Measures',
  tags: ['pElasticEnergy', 'minimal', 'Polyline'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Curves.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
