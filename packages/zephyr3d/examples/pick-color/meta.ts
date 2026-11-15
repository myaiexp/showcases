// zephyr3d example: Colour picking: pixel-exact pickAsync
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colour picking: pixel-exact pickAsync',
  summary:
    'camera.pickAsync(x, y) renders each object in a unique colour into a tiny target and reads the pixel back, so interlocking rings with overlapping bounds are told apart exactly. It resolves with target, distance and intersectedPoint; the hit ring glows yellow.',
  section: 'Scene Picking',
  tags: ['pickAsync', 'PickResult', 'intersectedPoint', 'emissiveColor', 'TorusShape'],
  docs: ['repo/apps/doc/web/en/picking.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
