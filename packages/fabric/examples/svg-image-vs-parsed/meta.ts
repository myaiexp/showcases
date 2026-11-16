// fabric example: SVG: FabricImage from an SVG against parsed objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: FabricImage from an SVG against parsed objects',
  summary:
    'FabricImage.fromURL with an SVG data URL makes a raster object that blurs when scaled; loadSVGFromString plus groupSVGElements makes vector objects that stay sharp. A scale slider compares them.',
  section: 'SVG',
  tags: ['FabricImage', 'fromURL', 'loadSVGFromString', 'groupSVGElements'],
  docs: [
    'repo/src/content/docs/api/classes/FabricImage.md',
    'repo/src/content/docs/api/functions/loadSVGFromString.md',
    'repo/src/content/docs/api/namespaces/util/functions/groupSVGElements.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
