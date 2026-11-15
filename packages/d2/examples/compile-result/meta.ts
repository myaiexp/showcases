// d2 example: What compile returns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What compile returns',
  summary:
    '`d2.compile()` resolves to the laid-out diagram (every shape with its position and size, every connection with its route), the graph, and the render options with the source\'s d2-config merged in, so `sketch: true` set in the source comes back in `renderOptions`. The panel lists them; the card reads them out one by one.',
  section: 'D2.js API',
  tags: ['compile', 'render', 'renderOptions', 'diagram', 'd2-config'],
  docs: ['repo/d2js/js/README.md', 'repo/d2js/js/index.d.ts', 'repo/docs/tour/vars.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
