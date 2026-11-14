// VFX-JS example: the overlay option on three copies of a headline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'overlay: keep the element visible',
  summary:
    'By default VFX-JS hides the element (opacity 0) and only the shader output shows. overlay: true keeps the original visible under the effect, and a number sets its opacity. The "spring" preset scales the drawn copy, so the original shows where they differ.',
  section: 'How it Works',
  tags: ['overlay', 'opacity', 'spring'],
  docs: ['pages/amagi-dev/vfx-js/how-it-works.md', 'pages/amagi-dev/vfx-js/getting-started.md', 'repo/packages/vfx-js/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
