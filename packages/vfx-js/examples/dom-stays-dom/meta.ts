// VFX-JS example: the shader-drawn button that still receives clicks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The DOM stays DOM',
  summary:
    'VFX-JS only sets the element\'s opacity; the button keeps its place, so clicks, focus and screen readers still reach it. Its click handler changes the label and calls vfx.update(button), because text is captured once.',
  section: 'How it Works',
  tags: ['opacity', 'vfx.update', 'button', 'accessibility', 'rgbShift'],
  docs: ['pages/amagi-dev/vfx-js/how-it-works.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
