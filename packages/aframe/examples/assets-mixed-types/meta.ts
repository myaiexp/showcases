// aframe example: a-assets with an image, model files, a mixin and a video
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'a-assets with an image, model files, a mixin and a video',
  summary:
    'The docs\' horse scene with offline stand-ins: an img on a plane, an obj and mtl pair in a-asset-items for obj-model, a giant mixin, and a video element that plays a canvas stream as a texture.',
  section: 'Core API',
  tags: ['a-assets', 'a-asset-item', 'a-mixin', 'video', 'obj-model', 'img'],
  docs: ['repo/docs/core/asset-management-system.md', 'repo/docs/core/mixins.md', 'repo/docs/components/obj-model.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
