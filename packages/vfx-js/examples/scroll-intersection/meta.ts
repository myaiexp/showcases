// VFX-JS example: the How it Works scroll shader with the intersection option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll and visibility',
  summary:
    'The intersection uniform says how much of the element is in view (colour fills in from the left as it rises), and enterProgress / leaveProgress fade it in and out over intersection.duration once it crosses intersection.threshold. The shader is the one from How it Works; the card treats its own box as the viewport.',
  section: 'How it Works',
  tags: ['intersection', 'enterProgress', 'leaveProgress', 'threshold', 'duration', 'scroll'],
  docs: ['pages/amagi-dev/vfx-js/how-it-works.md', 'repo/packages/vfx-js/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
