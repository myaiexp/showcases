// tanstack-charts example: z grouping versus colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'z grouping versus colour',
  summary:
    'Three regional lines drawn with z only, colour only, and both. With both, z decides which points connect and colour is an independent value, so three lines get two colours.',
  section: 'Data and Channels',
  tags: ['lineY', 'z', 'color'],
  docs: ['repo/docs/concepts/data-and-channels.md', 'repo/docs/concepts/marks-and-layering.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
