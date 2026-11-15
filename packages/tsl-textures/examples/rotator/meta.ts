// tsl-textures example: Rotator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rotator',
  summary:
    'rotator() on positionNode and rotator.normal() on normalNode: vertices above a tilted selection layer turn by Euler angles around a pivot, those inside it turn partly, so a dense cube twists like soft material.',
  section: 'Shape textures',
  tags: ['rotator', 'positionNode', 'normalNode', 'selectorAngles', 'selectorWidth'],
  docs: ['repo/docs/rotator.md', 'repo/src/rotator.js', 'repo/index.html', 'repo/docs/grid.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
