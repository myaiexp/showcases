// vchart example: Bar: stackCornerRadius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: stackCornerRadius',
  summary:
    'stackCornerRadius rounds the corners of the whole stack instead of each segment, so only the outer ends curve. A slider sets the radius and the stack keeps its straight inner joins.',
  section: 'Bar',
  tags: ['stackCornerRadius', 'stack'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Bar.md',
    'repo/docs/assets/option/en/series/bar-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
