// postprocessing example: Depth of field: resolution scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth of field: resolution scale',
  summary:
    "The resolutionScale option sets what fraction of the canvas size the bokeh blur is computed at; it can also be changed later through effect.resolution.scale. Low values are cheap and blocky, 1 is full quality.",
  section: 'Depth of Field',
  tags: ['DepthOfFieldEffect', 'resolutionScale', 'resolution.scale'],
  docs: ['repo/README.md', 'repo/src/effects/DepthOfFieldEffect.js', 'repo/src/core/Resolution.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
