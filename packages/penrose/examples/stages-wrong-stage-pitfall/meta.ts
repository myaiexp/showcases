// penrose example: A staging mistake: the label never moves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A staging mistake: the label never moves',
  summary:
    'The blog\'s own caveat. The Text centre is an unknown only `in circle`, but `contains(icon, text)` is enforced `in text`, where that centre is frozen, so nothing can satisfy it and the text stays wherever it was sampled. The second tab lists the centre `in text` and the label moves inside the circle.',
  section: 'Layout Stages',
  tags: ['layout', 'in', 'stage', 'contains', 'trap'],
  docs: ['repo/packages/docs-site/blog/staged-layout.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
