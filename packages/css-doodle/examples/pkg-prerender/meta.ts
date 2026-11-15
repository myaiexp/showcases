// prerender(): static HTML for a doodle, and what still needs the runtime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'prerender() and what needs the runtime',
  summary:
    'prerender(code) from css-doodle/generator resolves to HTML: a <css-doodle> with a declarative shadow root holding its generated styles and grid, so it paints with no script. Its needs list says what only the runtime can draw: nothing for plain CSS, mouse for pointer values, shader for @pattern, update for click:update. Each result is shown in an iframe with scripts turned off, so what you see is the HTML painting on its own.',
  section: 'Package exports',
  tags: ['prerender()', 'needs', 'declarative shadow DOM', 'iframe srcdoc'],
  docs: ['pages/css-doodle-com/reference/js-api-prerender.md', 'pages/css-doodle-com/reference/js-api-modules.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
