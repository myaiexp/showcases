// AntV Infographic example: Data: the shared title and desc fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data: the shared title and desc fields',
  summary:
    'Title and desc come from BaseData, so they are available whatever the data kind. The steps show the pair, a title alone, and no title at all, on the same three-item list.',
  section: 'Data',
  tags: ['data', 'title', 'desc', 'BaseData', 'list-row-simple-horizontal-arrow'],
  docs: [
    'repo/site/src/content/learn/data.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
