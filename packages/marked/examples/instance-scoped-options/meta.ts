// marked example: Two instances, two behaviours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two instances, two behaviours',
  summary:
    'The same note rendered by two private Marked instances with different settings and by the plain global marked. One instance turns bold into a highlighter and keeps line breaks, the other underlines italics; the global one is untouched.',
  section: 'Marked instance',
  tags: ['new Marked', 'instance', 'renderer', 'breaks'],
  docs: ['repo/docs/USING_ADVANCED.md', 'repo/src/Instance.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
