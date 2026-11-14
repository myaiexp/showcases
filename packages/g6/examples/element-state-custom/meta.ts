// g6 example: Element state: custom states
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Element state: custom states',
  summary:
    "error, success and warning are states of the example's own; node.state gives each a style, including a dashed border and an icon, and a pipeline moves through them.",
  section: 'Element',
  tags: ['node.state', 'error', 'success', 'warning', 'lineDash', 'iconText', 'setElementState'],
  docs: [
    'repo/packages/site/docs/manual/element/state.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
