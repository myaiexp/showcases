// AntV Infographic example: JSX primitive: Path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSX primitive: Path',
  summary:
    'Path draws any outline from a d string, with width and height telling the bounds code its size. Passing x and y adds a translate transform, which the second step uses to move a triangle; the third is a quadratic curve drawn with a stroke only.',
  section: 'JSX primitives',
  tags: ['Path', 'd', 'translate', 'width', 'height', 'renderSVG'],
  docs: [
    'repo/site/src/content/reference/primitive-nodes.en.md',
    'repo/site/src/content/reference/jsx.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
