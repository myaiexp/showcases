// playcanvas example: Updating a GSplatContainer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Updating a GSplatContainer each frame',
  summary:
    'A container can be refilled after creation: lock the dataColor texture, change it, unlock, and call update(numSplats, false) because the centers did not move. A colour wave runs outwards through a galaxy while numSplats grows from 0 to maxSplats, which draws only the first splats of a larger container.',
  section: 'Gaussian Splatting',
  tags: ['GSplatContainer.update', 'GSplatContainer.maxSplats', 'Texture.lock', 'centersUpdated', 'dataColor'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/procedural-splats/index.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/index.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
