// aframe example: Guide: textures through the asset management system
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Guide: textures through the asset management system',
  summary:
    'An <img id="boxTexture"> in <a-assets> is preloaded and used by two boxes with src="#boxTexture"; the second multiplies the texture by a colour.',
  section: 'Guides',
  tags: ['a-assets', 'img', 'src', 'selector', 'a-box'],
  docs: ['repo/docs/guides/building-a-basic-scene.md', 'repo/docs/core/asset-management-system.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
