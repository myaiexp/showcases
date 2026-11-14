// observable-plot example: Formats: formatIsoDate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Formats: formatIsoDate',
  summary:
    'Plot.formatIsoDate as the text of date labels: midnight UTC dates print as plain days, dates with a time keep the shortest exact form.',
  section: 'Formats',
  tags: ['formatIsoDate', 'text'],
  docs: ['repo/docs/features/formats.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
