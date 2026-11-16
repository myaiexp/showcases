// aframe example: a-assets.fileLoader and THREE.Cache
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'a-assets.fileLoader and THREE.Cache',
  summary:
    'a-asset-item fetches through a three.js FileLoader that is reachable as a-assets.fileLoader, and responses are kept in THREE.Cache so loaders that ask for the same URL again do not fetch twice. The board inspects both.',
  section: 'Core API',
  tags: ['fileLoader', 'THREE.Cache', 'a-assets', 'caching'],
  docs: ['repo/docs/core/asset-management-system.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
