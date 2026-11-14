// VFX-JS example: what the autoCrop option and uniform do for presets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'autoCrop',
  summary:
    'Presets read the texture through a helper that returns nothing outside the element while autoCrop is true, the default. The "spring" preset zooms out past the edges: cropped on the left, and on the right autoCrop: false lets the repeating texture show at the borders. Custom shaders get the same value as uniform bool autoCrop.',
  section: 'Custom Shaders',
  tags: ['autoCrop', 'wrap', 'spring', 'uniforms'],
  docs: ['repo/packages/vfx-js/src/types.ts', 'repo/packages/vfx-js/src/constants.ts', 'repo/skills/vfx-js/references/shader.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
