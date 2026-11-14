// motion example: Store card that opens into a modal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Store card that opens into a modal',
  summary: 'Tap an app card and it grows into a detail sheet, the way the App Store does it. The card stays in the page while the modal appears, and because both carry the same data-layout-id, Motion crossfades and resizes one into the other. Closing is not a crossfade back (vanilla Motion cannot do that yet): the sheet simply fades away. Click the sheet or press Escape to close.',
  section: 'animateLayout',
  tags: ['animateLayout', 'data-layout-id', 'crossfade'],
  docs: ['pages/motion-dev/docs/layout-animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
