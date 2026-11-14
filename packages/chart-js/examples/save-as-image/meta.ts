// Chart.js example: Saving a chart as an image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Saving a chart as an image',
  summary:
    'toBase64Image() returns the chart as a data URL, here dropped into <img> thumbnails that double as download links. Pick PNG or JPEG and a quality; a solid background keeps JPEGs from going black.',
  section: 'Developers',
  tags: ['toBase64Image', 'export', 'image', 'canvas'],
  docs: ['repo/docs/developers/api.md', 'repo/docs/configuration/canvas-background.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
