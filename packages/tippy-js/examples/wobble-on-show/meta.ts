// Tippy.js example: a tip that wobbles on appearing, via onMount and element.animate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A wobble when it appears',
  summary:
    'For attention-grabbing tips, play an extra animation once the tip is on screen. Hover the bell and its message shakes side to side, then settles.',
  section: 'Animations',
  tags: ['onMount', 'onHidden', 'element.animate()', 'instance.popper', 'CSS animations'],
  docs: ['repo/website/src/pages/v6/animations.mdx', 'repo/website/src/pages/index.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
