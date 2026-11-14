// static and function uniforms, from the Custom Shaders page
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom uniforms',
  summary:
    'Pass your own values in uniforms: [1, 0.4, 0.8] arrives as a vec3 tint, and a function is called every frame, here turning window.scrollY into a horizontal slide. The full view slides with the page scroll; the card has no scroll, so its function reads a slow sine.',
  section: 'Custom Shaders',
  tags: ['uniforms', 'function uniform', 'vec3', 'scroll'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/skills/vfx-js/references/shader.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
