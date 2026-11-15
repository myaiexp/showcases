// d2 example: Style: border-radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Style: border-radius',
  summary:
    '`border-radius` (0 to 20) rounds a shape\'s corners and a very large value makes a pill. On connections it rounds the bends, which only shows in layout engines that route with corners, such as ELK.',
  section: 'Styles',
  tags: ['style', 'border-radius', 'elk'],
  docs: ['repo/docs/tour/style.md', 'repo/static/d2/styles-border-radius.d2', 'repo/static/d2/pill.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
