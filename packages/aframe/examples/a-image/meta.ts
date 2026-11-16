// aframe example: <a-image>: width and height that keep the aspect ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-image>: width and height that keep the aspect ratio',
  summary:
    '<a-image> is a plane with a flat, transparent material whose src is the picture. A 2:1 image set to width 3 and height 1.5 keeps its proportions, a square image fits the 1 by 1 default, and the same 2:1 image squeezed into 1 by 1 shows the distortion the docs warn about.',
  section: 'Primitives',
  tags: ['a-image', 'src', 'width', 'height', 'opacity', 'aspect ratio'],
  docs: ['repo/docs/primitives/a-image.md', 'repo/docs/primitives/a-text.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
