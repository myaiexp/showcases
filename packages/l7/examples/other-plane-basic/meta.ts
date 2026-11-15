// l7 example: PlaneGeometry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PlaneGeometry',
  summary:
    'GeometryLayer with shape(\'plane\') is a ground-hugging rectangle set by center, width and height (in degrees). It needs no source, takes a colour and opacity, and can be active on hover.',
  section: 'Other Layers',
  tags: ['GeometryLayer', 'shape(\'plane\')', 'center', 'width', 'height', 'color', 'opacity', 'active'],
  docs: [
    'repo/site/docs/api/other/plane.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
