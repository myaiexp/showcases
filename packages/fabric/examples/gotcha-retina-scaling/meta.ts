// fabric example: Gotchas: blurry canvas without retina scaling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gotchas: blurry canvas without retina scaling',
  summary:
    'Two canvases standing in for a 3× screen, magnified 3×: enableRetinaScaling true gives the canvas 3× the backing pixels and stays sharp, false stretches one pixel over nine and blurs. The default is true; the page devicePixelRatio decides the factor.',
  section: 'Gotchas',
  tags: ['enableRetinaScaling', 'getRetinaScaling', 'devicePixelRatio', 'Canvas'],
  docs: [
    'repo/src/content/docs/docs/Old docs/gotchas.md',
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
