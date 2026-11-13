// pretext example: resolve a rem or em font size to whole px before preparing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Resolve rem sizes to px',
  summary:
    'Pretext takes a canvas font string in px, not rem. When the root size changes, resolve the CSS size to px once, round it to whole pixels, and prepare again with that string; widths alone never need a new prepare().',
  section: 'Caveats',
  tags: ['rem', 'em', 'font size', 'getComputedStyle', 'prepare'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
