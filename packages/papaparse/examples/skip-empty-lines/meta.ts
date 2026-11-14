// Papa Parse example: skipEmptyLines false, true or 'greedy'
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blank lines in the middle',
  summary:
    'Exports often have empty lines, and lines with only spaces. By default each becomes a junk row. skipEmptyLines: true drops the truly empty ones; "greedy" also drops the ones that hold only whitespace.',
  section: 'Parse config',
  tags: ['skipEmptyLines', 'greedy'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
