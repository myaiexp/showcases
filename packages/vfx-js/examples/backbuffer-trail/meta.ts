// VFX-JS example: the backbuffer feedback trail from Custom Shaders
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Backbuffer trail',
  summary:
    'With backbuffer: true a shader can read its own previous frame as uniform sampler2D backbuffer. The headline circles inside its overflow area while each frame keeps a faded, colour-shifted copy of the last one, leaving a trail. The backbuffer covers the overflow too, so it is read through viewport, not offset and resolution.',
  section: 'Custom Shaders',
  tags: ['backbuffer', 'feedback', 'viewport', 'overflow'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/skills/vfx-js/references/shader.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
