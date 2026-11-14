// VFX-JS example: premultiplied alpha output, done wrong and right
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Premultiplied alpha',
  summary:
    'The canvas expects premultiplied alpha: a half-transparent pixel\'s colour must already be scaled by its alpha. Two headlines get the same orange glow; the left writes vec4(orange, a) and its faint edges come out too bright, the right writes vec4(orange * a, a) and fades smoothly.',
  section: 'Custom Shaders',
  tags: ['premultiplied alpha', 'transparency', 'overflow', 'custom shader'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/skills/vfx-js/references/shader.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
