// export(): the doodle as SVG markup and a PNG blob, or a download
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'export() to SVG and PNG',
  summary:
    'await doodle.export({ detail: true }) returns the doodle as SVG markup (its DOM and styles in a foreignObject) plus a rendered PNG blob, shown here as an image beside the live doodle after every render. In the full view a button calls export({ scale: 2, download: true, name }) to save a file.',
  section: 'Element API',
  tags: ['export()', 'PNG', 'SVG', 'scale', 'download'],
  docs: ['pages/css-doodle-com/reference/js-api-export.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
