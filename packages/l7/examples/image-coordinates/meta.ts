// l7 example: Image layer on four corner coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image layer on four corner coordinates',
  summary:
    'parser.coordinates pins a picture by its four corners, clockwise from the upper left, so it can sit tilted or skewed. The N arrow follows the tilt.',
  section: 'Image Layer',
  tags: ['ImageLayer', 'parser', 'coordinates', "type: 'image'"],
  docs: ['repo/site/docs/api/image_layer/source.en.md', 'repo/site/docs/api/source/image.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
