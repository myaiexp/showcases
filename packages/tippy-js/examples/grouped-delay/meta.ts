// Tippy.js example: Wait once, then instant (grouped delay)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Wait once, then instant',
  summary:
    'Both toolbars hold their tips back for half a second so they do not flash. Separate tips make you wait again on every button; grouped into one singleton, you wait once and the next buttons show at once. A label shows how long the last tip took.',
  section: 'Addons',
  tags: ['createSingleton', 'delay', 'onTrigger', 'onShow'],
  docs: ['repo/website/src/pages/v6/addons.mdx', 'repo/website/src/pages/index.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
