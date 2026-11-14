// observable-plot example: Scales: clamp to the domain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: clamp to the domain',
  summary:
    'With a fixed x domain, values outside it escape the plot; clamp true pins them to the nearest edge of the domain.',
  section: 'Scales',
  tags: ['clamp', 'domain', 'dot'],
  docs: ['repo/docs/features/scales.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
