// fabric example: Object caching: on or off with a frame-time readout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Object caching: on or off for a heavy group',
  summary:
    'The same spinning group of hundreds of circles in two canvases: objectCaching true paints it once and copies the bitmap each frame, false redraws every circle. A readout shows the renderAll() time of each.',
  section: 'Object caching',
  tags: ['objectCaching', 'Group', 'renderAll', 'rotate'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-object-caching.mdx',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
