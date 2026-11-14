// playcanvas example: Text to splats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text to splats with GsplatText',
  summary:
    'GsplatText draws a string on a 2D canvas with CSS fonts and keeps one splat per visible pixel. text, fontSize, fontFamily, fillStyle, strokeStyle and strokeWidth are plain properties: change one and the splats rebuild on the next frame. The full view exposes each of them.',
  section: 'Gaussian Splatting',
  tags: ['GsplatText', 'text', 'fontSize', 'fontFamily', 'fillStyle', 'strokeStyle', 'strokeWidth', 'GSplatContainer'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/procedural-splats/text.md',
    'repo/docs/user-manual/gaussian-splatting/building/procedural-splats/index.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
