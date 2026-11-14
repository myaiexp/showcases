// deck-gl example: DataFilterExtension fp64
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DataFilterExtension fp64',
  summary:
    'Raw Unix timestamps lose their seconds as 32-bit floats. With fp64 off the 100-second window passes the wrong number of dots; with fp64 on it is exact.',
  section: 'Extensions',
  tags: ['DataFilterExtension', 'fp64', 'filterRange', 'countItems'],
  docs: [
    'repo/docs/api-reference/extensions/data-filter-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
