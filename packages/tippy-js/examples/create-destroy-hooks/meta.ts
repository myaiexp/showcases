// Tippy.js example: onCreate and onDestroy keep a live count of tooltips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Counting live tips',
  summary:
    'Add and remove tag chips, and a counter tracks how many tooltips exist right now. Each chip gets its own tip when it is made and gives it back when it is removed, and two hooks do the bookkeeping.',
  section: 'Props: lifecycle hooks',
  tags: ['onCreate', 'onDestroy', 'destroy()', 'instance.id'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/methods.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
