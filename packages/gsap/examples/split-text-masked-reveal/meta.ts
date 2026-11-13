// gsap example: SplitText line masks, autoSplit and onSplit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Split text: masked line reveal',
  summary: 'Lines slide up from inside clipping masks. autoSplit re-splits when the box width changes and the animation returned from onSplit is re-created in sync.',
  section: 'SplitText',
  tags: ['SplitText', 'mask', 'autoSplit', 'onSplit', 'lines', 'masks'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/SplitText.md',
    'pages/gsap-com/docs/v3/Plugins/SplitText/masks.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
