// l7 example: Image layer autoFit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image layer autoFit',
  summary:
    'With autoFit: true the map starts on the whole world, then zooms to the picture\'s extent as soon as the layer has initialised.',
  section: 'Image Layer',
  tags: ['ImageLayer', 'autoFit', 'extent'],
  docs: ['repo/site/docs/api/image_layer/options.en.md', 'repo/site/docs/api/common/layer/options.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
