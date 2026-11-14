// Tippy.js example: Stepping through tips with next and previous
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stepping through tips',
  summary:
    'A keyboard-shortcut cheat sheet that explains one key at a time. Next and Previous walk along the keys and wrap around at the ends, and the number buttons jump straight to a key.',
  section: 'Addons',
  tags: ['createSingleton', 'showNext()', 'showPrevious()', 'show(index)', 'hideOnClick'],
  docs: ['repo/website/src/pages/v6/addons.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
