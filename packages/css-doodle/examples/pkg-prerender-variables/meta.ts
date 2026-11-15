// prerender() options: seed, attributes and variables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'prerender() with attributes and variables',
  summary:
    'The docs\' second prerender() call: a doodle whose code is only a grid, rendered with seed \'cover\', a use attribute pointing at var(--rule), and variables supplying --rule, because at build time there is no page to read it from. Swapping the rule changes the picture while the seed keeps its picks; each result paints in an iframe with scripts off.',
  section: 'Package exports',
  tags: ['prerender()', 'seed', 'attributes', 'variables', 'use'],
  docs: ['pages/css-doodle-com/reference/js-api-prerender.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
