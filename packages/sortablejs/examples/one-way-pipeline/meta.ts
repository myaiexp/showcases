// Sortable.js example: stages with pull/put group arrays that only allow forward moves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hiring pipeline that only moves forward',
  summary:
    'Candidates go from Applied to Interview to Hired, and never backwards. Each column names which columns it will give to and accept from, and refuses the rest.',
  section: 'Groups',
  tags: ['group', 'pull: [names]', 'put: [names]', 'checkPull', 'checkPut'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
