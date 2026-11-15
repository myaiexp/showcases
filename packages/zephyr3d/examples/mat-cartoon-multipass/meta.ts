// zephyr3d example: A two-pass cartoon material
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A two-pass cartoon material',
  summary:
    'Setting numPasses = 2 draws each mesh twice: pass 0 inflates the vertices along their normals and shows only back faces in the outline colour, pass 1 quantizes lambertLight into bands. updateRenderStates picks the culling per pass.',
  section: 'Custom Materials',
  tags: ['numPasses', 'updateRenderStates', 'cullMode', 'mixinLambert', 'lambertLight', 'applyMaterialMixins', 'pass'],
  docs: ['repo/apps/doc/web/en/user-material-multipass.md', 'repo/apps/doc/web/en/user-material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
