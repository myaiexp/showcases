// l7 example: Image layer on an extent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image layer on an extent',
  summary:
    'An ImageLayer stretches one picture over a [minLng, minLat, maxLng, maxLat] extent. The picture here is drawn on a canvas, so its N arrow marks the top edge.',
  section: 'Image Layer',
  tags: ['ImageLayer', 'source', 'parser', "type: 'image'", 'extent'],
  docs: [
    'repo/site/docs/api/image_layer/imagelayer.en.md',
    'repo/site/docs/api/image_layer/source.en.md',
    'repo/site/docs/api/source/image.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
