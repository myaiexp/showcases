// tsl-textures example: selectPlanar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'selectPlanar',
  summary:
    'selectPlanar(pos, selAngles, selCenter, selWidth) weights each point 0 below a tilted layer, 1 above it and smoothly in between. Drawn as colour with contour lines; the tilt, centre and width are sliders.',
  section: 'Utilities',
  tags: ['selectPlanar', 'selection', 'selectorAngles', 'selectorWidth'],
  docs: ['repo/src/tsl-utils.js', 'repo/src/tsl-textures.js', 'repo/docs/rotator.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
