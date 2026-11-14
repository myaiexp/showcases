// VFX-JS example: a multipass post effect with a named buffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Multipass post effect',
  summary:
    'postEffect also takes an array of passes, the same shape as a multipass shader. The first pass keeps the canvas as "scene" (later passes get the previous pass as src), the second blurs it sideways into "a", and the last reads both by name and lays a pulsing streak over the scene.',
  section: 'Post effects',
  tags: ['postEffect', 'multipass', 'VFXPass', 'target'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/skills/vfx-js/references/shader.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
