// VFX-JS example: vfx.update(el) after a text element's content changes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Update text after it changes',
  summary:
    'Text and other elements are captured once, when added. A counter changes its textContent every tick: with vfx.update(el) the shader shows the new number, without it the texture keeps showing the old one while the hidden element counts on.',
  section: 'Getting Started',
  tags: ['vfx.update', 'text', 'capture', 'rainbow'],
  docs: ['pages/amagi-dev/vfx-js/getting-started.md', 'pages/amagi-dev/vfx-js/how-it-works.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
