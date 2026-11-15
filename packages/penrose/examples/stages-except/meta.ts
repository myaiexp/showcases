// penrose example: except: every stage but one
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'except: every stage but one',
  summary:
    'The points are `? except label`, so they move in `shape` and `overall` but never while labels are placed. The labels are `? in label`. A third `overall` stage then nudges the whole triangle toward the canvas centre while its labels stay locked.',
  section: 'Layout Stages',
  tags: ['layout', 'except', 'in', 'stage', 'overall'],
  docs: ['repo/packages/docs-site/blog/staged-layout.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
