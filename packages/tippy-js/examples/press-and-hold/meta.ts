// Tippy.js example: touch-screen hold and long-press tips, shown with a drawn finger
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Press and hold on touch screens',
  summary:
    'On a phone a tap means "click", so a tooltip has no moment to appear. These photo thumbnails show their caption only while a finger is held down, or only after a long press. The card draws the finger; on a touch screen it is the real thing.',
  section: 'Misc',
  tags: ['touch: hold', 'touch: [hold, 500]', 'show()', 'hide()'],
  docs: ['repo/website/src/pages/v6/misc.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
