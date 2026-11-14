// VFX-JS example: the Custom Shaders multipass glow (image, blur, composite)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Multipass: image, blur, glow',
  summary:
    'An array of passes as shader. The first pass keeps the element in a buffer named "image", the second blurs the previous pass into "blur", and the last reads both by name (uniform sampler2D image, blur) and adds a cyan-tinted blur on top: a glow. The glow shader is the one on the Custom Shaders page.',
  section: 'Multipass',
  tags: ['multipass', 'VFXPass', 'target', 'blur', 'glow'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/docs/MULTIPASS.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
