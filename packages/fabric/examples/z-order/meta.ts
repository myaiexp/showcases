// fabric example: Objects: z-order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Objects: z-order',
  summary:
    'bringObjectToFront, bringObjectForward, sendObjectBackwards, sendObjectToBack and moveObjectTo reorder the canvas stack, shown as a back-to-front list.',
  section: 'Objects',
  tags: ['bringObjectToFront', 'sendObjectToBack', 'bringObjectForward', 'sendObjectBackwards', 'moveObjectTo', 'getObjects'],
  docs: ['repo/src/content/docs/api/classes/Canvas.md', 'repo/src/content/docs/api/classes/StaticCanvas.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
