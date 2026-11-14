// motion example: Signature line drawing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A signature that writes itself',
  summary: 'A handwritten signature draws stroke by stroke, then a small highlight glides along it. The line is an ordinary SVG path: pathLength grows the line from nothing to complete, pathOffset slides a short piece of it.',
  section: 'animate',
  tags: ['animate', 'SVG paths', 'pathLength', 'pathOffset', 'delay'],
  docs: ['pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
