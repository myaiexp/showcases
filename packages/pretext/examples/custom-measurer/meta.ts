// pretext example: supply the measuring yourself with a global OffscreenCanvas class
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Measure without a browser canvas',
  summary:
    'Outside a browser Pretext has no canvas, so you define a global OffscreenCanvas whose measureText() answers. Here one cell per grapheme, defined in a worker before its first prepare(), wraps text into a terminal grid.',
  section: 'Caveats',
  tags: ['OffscreenCanvas', 'measureText', 'terminal', 'Worker', 'custom measurer'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
