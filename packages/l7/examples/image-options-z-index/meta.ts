// l7 example: Image layer zIndex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image layer zIndex',
  summary:
    'Two overlapping pictures: the layer with the larger zIndex draws on top. updateLayerConfig({ zIndex }) swaps them at run time.',
  section: 'Image Layer',
  tags: ['ImageLayer', 'zIndex', 'updateLayerConfig'],
  docs: ['repo/site/docs/api/image_layer/options.en.md', 'repo/site/docs/api/common/layer/options.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
