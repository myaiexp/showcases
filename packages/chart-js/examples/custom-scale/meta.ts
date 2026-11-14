// Chart.js example: A custom axis type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom axis type',
  summary:
    'A square-root axis built by extending Scale: it sets the data limits, builds its ticks and maps values to pixels and back. Switch to linear to see how much room the small towns gain.',
  section: 'Developers',
  tags: ['Scale', 'custom axis', 'register', 'sqrt'],
  docs: ['repo/docs/developers/axes.md', 'repo/docs/axes/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
