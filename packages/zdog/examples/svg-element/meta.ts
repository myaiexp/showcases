// Zdog example: the same duck on a canvas and on an svg
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas and SVG elements',
  summary:
    'The same rubber duck, drawn twice: on a canvas on the left and on an svg on the right. They look alike, but the canvas is a grid of pixels while the svg is a list of path elements you can inspect. Illustration takes either one as its element option.',
  section: 'API: Illustration',
  tags: ['Illustration', 'element', 'canvas', 'svg'],
  docs: ['repo/modules/docs/api-illo.hbs', 'repo/content/extras.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
