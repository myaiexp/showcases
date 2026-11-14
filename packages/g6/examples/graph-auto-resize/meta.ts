// g6 example: Graph option autoResize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph option autoResize',
  summary:
    'With autoResize on, the canvas follows its container when the window fires resize. A slider narrows the container and a toggle turns the option off.',
  section: 'Graph',
  tags: ['autoResize', 'resize'],
  docs: [
    'repo/packages/site/docs/manual/graph/option.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
