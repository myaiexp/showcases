// VFX-JS example: BloomEffect used as a whole-canvas post effect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An effect as the post effect',
  summary:
    'A post effect can be an effect object instead of GLSL: new VFX({ postEffect: { effect: new BloomEffect() } }) blooms everything VFX-JS draws, the night city and the rainbow headline together. Its params stay live, like on an element.',
  section: 'Post effects',
  tags: ['postEffect', 'effect', 'BloomEffect'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/skills/vfx-js/references/shader.md', 'repo/packages/effects/src/bloom.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
