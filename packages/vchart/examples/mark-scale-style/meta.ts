// vchart example: Mark styles from shared scales
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mark styles from shared scales',
  summary:
    'Style values such as size and shape bind to data through a field plus a scale id. Two series, a scatter and a line, read the same sizeScale and shapeScale declared in spec.scales, whose domains merge the fields of both data entries. The full view sets the size range.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['scales', 'point.style.size', 'point.style.shape', 'field', 'scale', 'domain'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Series/Mark.md', 'repo/docs/assets/option/en/common/scale.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
