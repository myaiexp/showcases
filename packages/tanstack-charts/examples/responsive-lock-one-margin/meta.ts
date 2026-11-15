// tanstack-charts example: Locking one margin side
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Locking one margin side',
  summary:
    'An explicit margin side locks only that side: left is fixed at 96 pixels while top, right and bottom stay automatic. The readout shows the locked side next to the measured ones. margin: 0 would lock all four.',
  section: 'Responsive Charts',
  tags: ['margin', 'scene.margin'],
  docs: ['repo/docs/guides/responsive-charts.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
