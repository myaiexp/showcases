// cosmos-gl example: Sparse batch position writes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sparse batch position writes',
  summary:
    'A cloth of linked points hangs from a top row that the page moves with one setPointPositionsByIndices() call per frame, writing only those few positions into the running layout. With setPinnedPoints the row holds where it is put and the layout pulls the rows below along; without it the forces tug the row back.',
  section: 'Headless & shared device',
  tags: ['setPointPositionsByIndices', 'setPinnedPoints', 'setPointPosition'],
  docs: [
    'repo/docs/host-embedding/README.md',
    'repo/src/stories/api-reference.mdx',
    'repo/src/stories/configuration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
