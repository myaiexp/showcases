// cosmos-gl example: Data arrays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data arrays',
  summary:
    'cosmos.gl keeps a reference to the arrays you hand to its set methods instead of copying them. To change the data, edit the same array, pass it to setLinks again and call render: here one links array is rewired in place and the graph follows.',
  section: 'Configuration',
  tags: ['setLinks', 'render', 'Float32Array'],
  docs: ['repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
