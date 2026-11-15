// tanstack-charts example: Missing values break lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Missing values break lines',
  summary:
    'Temperature readings with null gaps. The line and area break where data is missing; the toggle replaces the nulls with zero to show the false dip that would cause.',
  section: 'Data and Channels',
  tags: ['lineY', 'areaY', 'null', 'missing values'],
  docs: ['repo/docs/concepts/data-and-channels.md', 'repo/docs/concepts/marks-and-layering.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
