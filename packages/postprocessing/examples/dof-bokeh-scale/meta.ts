// postprocessing example: Depth of field: bokeh scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth of field: bokeh scale',
  summary:
    "bokehScale multiplies the size of the blur kernel. The focus plane stays where it is while the out-of-focus columns and balls smear into larger and larger discs.",
  section: 'Depth of Field',
  tags: ['DepthOfFieldEffect', 'bokehScale'],
  docs: ['repo/README.md', 'repo/src/effects/DepthOfFieldEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
