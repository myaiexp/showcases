// VFX-JS example: the Getting Started effect, the glitch preset on an image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Your first effect',
  summary:
    'Make one VFX and pass an element to vfx.add with a preset name. The image keeps its place in the layout; VFX-JS hides it and draws it again through the "glitch" shader, with 100px of room to glitch outside its box.',
  section: 'Getting Started',
  tags: ['new VFX()', 'vfx.add', 'shader preset', 'glitch', 'overflow'],
  docs: ['pages/amagi-dev/vfx-js/getting-started.md', 'repo/packages/vfx-js/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
