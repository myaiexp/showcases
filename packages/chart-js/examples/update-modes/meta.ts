// Chart.js example: Update modes: animated, instant, reset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Update modes: animated, instant, reset',
  summary:
    "The same new figures applied with update(), update('none'), update('active'), a per-dataset mode function, and reset() followed by update(). Each call animates differently, which is the point of the mode argument.",
  section: 'Developers',
  tags: ['update', 'reset', 'animation', 'transitions'],
  docs: ['repo/docs/developers/api.md', 'repo/docs/developers/updates.md', 'repo/docs/configuration/animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
