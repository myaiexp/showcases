// VFX-JS example: a post effect whose uniform follows the pointer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Post effect driven by the pointer',
  summary:
    'The Custom Shaders page\'s post effect: a shader that mixes the whole canvas towards its inverse by amount, and amount is a function uniform that reads the pointer\'s x position (across the stage here, across the window in the docs). The docs invert with 1.0 - rgb; this one uses a - rgb, since output is premultiplied and the canvas is mostly transparent. The card moves a stand-in pointer.',
  section: 'Post effects',
  tags: ['postEffect', 'function uniform', 'invert', 'pointer'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/docs/POSTEFFECT_EXAMPLE.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
