// marked example: Extensions in the constructor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensions in the constructor',
  summary:
    'Tick which extension packs go into new Marked(...): chat line breaks, a highlighter for bold, and arrows on links. The constructor call under the page updates and so does the result, because every argument is applied in order.',
  section: 'Marked instance',
  tags: ['new Marked', 'constructor', 'renderer', 'breaks'],
  docs: ['repo/docs/USING_ADVANCED.md', 'repo/src/Instance.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
