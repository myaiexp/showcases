// tanstack-charts example: Stable keys across updates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stable keys across updates',
  summary:
    'A ranked bar chart where each row has a key. Shuffle the values and every bar slides to its new rank instead of being redrawn, because identity comes from the key.',
  section: 'Data and Channels',
  tags: ['key', 'id', 'svgAnimation', 'barX'],
  docs: ['repo/docs/concepts/data-and-channels.md', 'repo/docs/concepts/marks-and-layering.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
