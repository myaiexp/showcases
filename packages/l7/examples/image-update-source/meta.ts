// l7 example: Image layer with a changing picture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image layer with a changing picture',
  summary:
    'A fresh picture for the same extent every 0.7 s, here a drifting radar frame: each frame is a new ImageLayer that replaces the old one once it has initialised.',
  section: 'Image Layer',
  tags: ['ImageLayer', 'inited', 'parser', 'extent'],
  docs: ['repo/site/docs/api/image_layer/source.en.md', 'repo/site/docs/api/common/layer/layer_event.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
