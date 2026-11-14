// vchart example: Linear, radial and conical gradients
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Linear, radial and conical gradients',
  summary:
    'The same fill property takes a gradient object: linear for a bar, radial for scatter points, conical for pie sectors. Each type is a spec with its own gradient and stops; a selector in the full view flips between them and the card steps through.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['gradient: linear', 'gradient: radial', 'gradient: conical', 'stops', 'IGradientColor'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Series/Mark.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
