// VFX-JS example: a persistent multipass buffer used for a fading trail
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Persistent buffer trail',
  summary:
    'persistent: true keeps a pass\'s buffer across frames, and the pass reads its own last frame by its target name. The trail pass moves the headline around and keeps the brighter of the new frame and 95% of the old one; the display pass colours the trail by how faded it is. With overflow, buffers are read through toBuffer(uv).',
  section: 'Multipass',
  tags: ['multipass', 'persistent', 'feedback', 'toBuffer', 'overflow'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/docs/MULTIPASS.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
