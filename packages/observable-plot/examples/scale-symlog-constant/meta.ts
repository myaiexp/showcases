// observable-plot example: Scales: symlog constant
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: symlog constant',
  summary:
    'A bi-symmetric log scale across a domain that includes zero; the constant option sets how wide the linear region around zero is.',
  section: 'Scales',
  tags: ['symlog', 'constant', 'dot'],
  docs: ['repo/docs/features/scales.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
