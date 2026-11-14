// Chart.js example: Canvas background colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas background colour',
  summary:
    'A chart canvas is transparent, so an exported image shows grey text on nothing. A small plugin that fills the canvas behind everything gives the picture a background; export it and compare.',
  section: 'Configuration',
  tags: ['plugin', 'canvas', 'background', 'toBase64Image'],
  docs: ['repo/docs/configuration/canvas-background.md', 'repo/docs/developers/api.md', 'repo/docs/general/colors.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
