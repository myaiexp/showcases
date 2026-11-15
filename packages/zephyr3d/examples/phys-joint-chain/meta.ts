// zephyr3d example: Ball joints: a chain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ball joints: a chain',
  summary:
    'A chain is a row of ball joints, each bead joined to the previous one at its own anchor and the first to the world. The full view changes the number of beads and swings the end.',
  section: 'Physics',
  tags: ['Joint', 'ball', 'anchor', 'connectedBody'],
  docs: ['repo/apps/doc/web/en/physics-joints.md', 'repo/apps/doc/src/tut-79/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
