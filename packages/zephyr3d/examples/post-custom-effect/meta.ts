// zephyr3d example: A custom post effect on the compositor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom post effect on the compositor',
  summary:
    'A subclass of AbstractPostEffect, written with the device shader builder, is appended to camera.compositor and runs after the built-in effects: a tint, vignette and scanline pass, with an enabled switch and live uniforms.',
  section: 'Post-processing',
  tags: ['AbstractPostEffect', 'compositor', 'appendPostEffect', 'buildRenderProgram', 'enabled'],
  docs: ['repo/apps/doc/web/en/posteffect-intro.md', 'repo/apps/doc/web/en/shader.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
