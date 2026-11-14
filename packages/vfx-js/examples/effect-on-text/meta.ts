// VFX-JS example: Effect on text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Effect on text',
  summary:
    'A heading with a travelling wave through it. VFX-JS draws the text to an image once, hides the original and draws the image through SinewaveEffect; the heading stays real, selectable DOM. Editing the text calls vfx.update so it is captured again.',
  section: '@vfx-js/effects',
  tags: ['effect', 'text', 'SinewaveEffect', 'vfx.update', 'headline'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/sinewave.ts',
    'pages/amagi-dev/vfx-js/how-it-works.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
