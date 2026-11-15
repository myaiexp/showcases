// zephyr3d example: Sampler states: filters and address modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sampler states: filters and address modes',
  summary:
    'An 8x8 checker on a tilted quad with texture coordinates up to 2.5. createSampler builds a sampler from magFilter, minFilter, mipFilter and the address mode, and setTexture binds it with the texture.',
  section: 'Device API',
  tags: ['createSampler', 'createTexture2D', 'update', 'magFilter', 'minFilter', 'mipFilter', 'addressU', 'mirrored-repeat', 'setTexture'],
  docs: ['repo/apps/doc/web/en/texture.md', 'repo/apps/doc/web/en/shader.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
