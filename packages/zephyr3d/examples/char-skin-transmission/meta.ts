// zephyr3d example: Skin material: back-lit transmission on SSSMaterial
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Skin material: back-lit transmission on SSSMaterial',
  summary:
    'A head and two thin ears use SSSMaterial with a subsurfaceTexture whose blue channel holds thickness. A light behind the head shines through the ears as transmissionStrength rises. Screen-space diffusion needs WebGPU, so camera.SSS is set but only the transmission shows on WebGL2.',
  section: 'Character Rendering',
  tags: ['SSSMaterial', 'subsurfaceTexture', 'transmissionStrength', 'SSSProfile', 'camera.SSS', 'specularF0', 'roughness'],
  docs: ['repo/apps/doc/web/en/material-skin.md', 'repo/apps/doc/web/en/backend-support.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
