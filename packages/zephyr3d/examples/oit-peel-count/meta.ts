// zephyr3d example: Dual depth peeling: the peel count
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dual depth peeling: the peel count',
  summary:
    'DualDepthPeelingOIT strips the nearest and farthest remaining layer in each pass, so its accuracy is bounded by the iteration count given to its constructor. Raise it from 1 and the deep overlaps resolve. supportDevice() reports when the device would fall back to sorted blending.',
  section: 'Transparency',
  tags: ['DualDepthPeelingOIT', 'camera.oit', 'supportDevice', 'blendMode'],
  docs: ['repo/apps/doc/web/en/oit.md', 'repo/apps/doc/src/tut-77/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
