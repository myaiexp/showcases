// observable-plot example: Image: portrait scatterplot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image: portrait scatterplot',
  summary:
    'US presidents as portraits at their inauguration date and net favorability. The image mark draws in input order; width sets the size and reverse flips which is on top. Portraits are drawn in code, not fetched.',
  section: 'Mark: Image',
  tags: ['image', 'src', 'width', 'reverse', 'ruleY'],
  docs: ['repo/docs/marks/image.md', 'repo/docs/transforms/sort.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
