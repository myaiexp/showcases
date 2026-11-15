// postprocessing example: FXAAEffect options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FXAA options',
  summary:
    'A single FXAAEffect smoothing thin wires. Its two edge thresholds decide which contrast counts as an edge, subpixelQuality blends away isolated bright pixels, and samples caps the edge search. Turn it off to compare with the raw frame.',
  section: 'Antialiasing',
  tags: ['FXAAEffect', 'minEdgeThreshold', 'maxEdgeThreshold', 'subpixelQuality', 'samples', 'EffectPass'],
  docs: ['repo/src/effects/FXAAEffect.js', 'repo/src/passes/EffectPass.js', 'repo/src/core/EffectComposer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
