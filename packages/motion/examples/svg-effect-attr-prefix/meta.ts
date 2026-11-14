// motion example: Bar chart written as attributes or styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar chart written as attributes or styles',
  summary: 'A weekly sales chart whose bars grow and shrink as new numbers arrive. svgEffect writes each bar through its style by default; the attr prefix (attrHeight, attrY) writes real SVG attributes instead. A live peek at the first bar shows the markup change.',
  section: 'Effects',
  tags: ['svgEffect', 'attrHeight', 'attr prefix', 'transformValue', 'animate'],
  docs: ['pages/motion-dev/docs/svg-effect.md', 'pages/motion-dev/docs/transform-value.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
