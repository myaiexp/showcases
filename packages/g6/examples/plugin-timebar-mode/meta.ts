// g6 example: Timebar: modify or visibility, nodes or edges
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timebar: modify or visibility, nodes or edges',
  summary: 'mode switches between removing filtered elements from the data (modify) and hiding them (visibility); elementTypes adds edges, which then need their own timestamps.',
  section: 'Plugin',
  tags: ['timebar', 'mode', 'elementTypes', 'getTime'],
  docs: ['repo/packages/site/docs/manual/plugin/Timebar.en.md', 'repo/packages/site/common/api/plugins/timebar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
