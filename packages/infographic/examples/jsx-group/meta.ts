// AntV Infographic example: JSX primitive: Group, translate and transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSX primitive: Group, translate and transform',
  summary:
    'Group is a g element. Its x and y become translate(x, y), a transform string is applied instead, and opacity and other attributes cascade to its children; width and height only feed the bounds. The steps move, rotate and fade the same three-rectangle badge.',
  section: 'JSX primitives',
  tags: ['Group', 'translate', 'transform', 'opacity', 'renderSVG'],
  docs: [
    'repo/site/src/content/reference/primitive-nodes.en.md',
    'repo/site/src/content/reference/jsx.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
