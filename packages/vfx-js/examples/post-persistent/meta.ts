// VFX-JS example: feedback over the whole canvas with a persistent post effect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Persistent post effect',
  summary:
    'With persistent: true a post effect gets its own previous output as uniform sampler2D backbuffer. Keeping the brighter of the new frame and a faded copy of the last one leaves ghost trails behind everything that moves; decay sets how fast they fade.',
  section: 'Post effects',
  tags: ['postEffect', 'persistent', 'backbuffer', 'feedback'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/skills/vfx-js/references/shader.md', 'repo/packages/vfx-js/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
