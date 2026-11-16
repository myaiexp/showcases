// aframe example: a-assets: preloaded images referenced by id
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'a-assets: preloaded images referenced by id',
  summary:
    'Three painted images sit in <a-assets> as <img id=...> and entities point at them with src="#id", the checker texture twice. The board shows each image\'s size and that the asset system finished loading.',
  section: 'Core API',
  tags: ['a-assets', 'img', 'src', 'selector', 'repeat', 'asset management system'],
  docs: ['repo/docs/core/asset-management-system.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
