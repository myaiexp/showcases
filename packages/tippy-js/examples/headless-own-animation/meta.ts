// Tippy.js example: headless tips with their own enter and exit animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Your own open and close animation',
  summary:
    'With Headless Tippy the animation is yours: the tip pops in with a bounce and drops out again. Because Tippy cannot know when your animation ends, you tell it to remove the tip once the exit has finished.',
  section: 'Headless Tippy',
  tags: ['tippy.js/headless', 'animation', 'render', 'onShow', 'onHide', 'unmount()'],
  docs: ['repo/website/src/pages/v6/headless-tippy.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
